<?php

declare(strict_types=1);

require_once __DIR__ . '/../bootstrap.php';

use App\Entity\Alternativa;
use App\Entity\Assunto;
use App\Entity\Cronograma;
use App\Entity\Disciplina;
use App\Entity\ItemCronograma;
use App\Entity\Questao;
use App\Entity\Resolucao;
use App\Entity\SessaoEstudo;
use App\Entity\Usuario;
use App\Repository\AlternativaRepositorio;
use App\Repository\AssuntoRepositorio;
use App\Repository\CronogramaRepositorio;
use App\Repository\DisciplinaRepositorio;
use App\Repository\ItemCronogramaRepositorio;
use App\Repository\QuestaoRepositorio;
use App\Repository\ResolucaoRepositorio;
use App\Repository\SessaoEstudoRepositorio;
use App\Repository\UsuarioRepositorio;
use Cycle\Annotated;
use Cycle\Annotated\Locator\TokenizerEmbeddingLocator;
use Cycle\Annotated\Locator\TokenizerEntityLocator;
use Cycle\Database;
use Cycle\Database\Config;
use Cycle\ORM;
use Cycle\ORM\ORMInterface;
use Cycle\Schema;
use Spiral\Tokenizer;

function assertTrue(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

function criarOrmTemporario(string $dbPath): ORMInterface
{
    $dbal = new Database\DatabaseManager(new Config\DatabaseConfig([
        'databases' => [
            'default' => [
                'driver' => 'runtime',
            ],
        ],
        'connections' => [
            'runtime' => new Config\SQLiteDriverConfig(
                connection: new Config\SQLite\FileConnectionConfig(
                    database: $dbPath
                ),
                queryCache: true,
            ),
        ],
    ]));

    $classLocator = (new Tokenizer\Tokenizer(new Tokenizer\Config\TokenizerConfig([
        'directories' => [
            __DIR__ . '/../src',
        ],
    ])))->classLocator();

    $schema = (new Schema\Compiler())->compile(new Schema\Registry($dbal), [
        new Schema\Generator\ResetTables(),
        new Annotated\Embeddings(new TokenizerEmbeddingLocator($classLocator)),
        new Annotated\Entities(new TokenizerEntityLocator($classLocator)),
        new Annotated\TableInheritance(),
        new Annotated\MergeColumns(),
        new Schema\Generator\GenerateRelations(),
        new Schema\Generator\GenerateModifiers(),
        new Schema\Generator\ValidateEntities(),
        new Schema\Generator\RenderTables(),
        new Annotated\MergeIndexes(),
        new Schema\Generator\RenderRelations(),
        new Schema\Generator\RenderModifiers(),
        new Schema\Generator\ForeignKeys(),
        new Schema\Generator\GenerateTypecast(),
        new Schema\Generator\SyncTables(),
    ]);

    return new ORM\ORM(
        new ORM\Factory($dbal),
        new ORM\Schema($schema)
    );
}

function comOrmIsolado(callable $callback): void
{
    $dbPath = sys_get_temp_dir() . '/projeto_concurso_test_' . bin2hex(random_bytes(8)) . '.sqlite';
    $orm = criarOrmTemporario($dbPath);

    try {
        $callback($orm);
    } finally {
        @unlink($dbPath);
        @unlink($dbPath . '-journal');
        @unlink($dbPath . '-shm');
        @unlink($dbPath . '-wal');
    }
}

function novoUsuario(string $username, string $email): Usuario
{
    $usuario = new Usuario();
    $usuario->username = $username;
    $usuario->email = $email;
    $usuario->senha_hash = password_hash('teste123', PASSWORD_BCRYPT);
    $usuario->nome_completo = strtoupper($username);
    return $usuario;
}

function novaDisciplina(string $nome, ?string $area = null): Disciplina
{
    $disciplina = new Disciplina();
    $disciplina->nome = $nome;
    $disciplina->area = $area;
    return $disciplina;
}

function testUsuarioRepositorioCrud(): void
{
    comOrmIsolado(function (ORMInterface $orm): void {
        $repo = new UsuarioRepositorio($orm);
        $usuario = novoUsuario('ana', 'ana@example.com');

        $repo->salvar($usuario);
        assertTrue($usuario->id !== null, 'Usuario deveria ter ID apos salvar.');

        $lido = $repo->buscarPorId((int)$usuario->id);
        assertTrue($lido !== null, 'Usuario deveria ser encontrado por ID.');
        assertTrue($lido->atualizado_em !== null, 'atualizado_em deveria ser preenchido.');

        $usuario->nome_completo = 'ANA ATUALIZADA';
        $repo->salvar($usuario);
        assertTrue($repo->buscarPorId((int)$usuario->id)?->nome_completo === 'ANA ATUALIZADA', 'Atualizacao falhou.');

        assertTrue($repo->buscarPorEmail('ana@example.com')?->id === $usuario->id, 'buscarPorEmail falhou.');
        assertTrue(count($repo->buscarTodos()) === 1, 'buscarTodos deveria retornar 1.');

        $repo->remover($usuario);
        assertTrue($repo->buscarPorId((int)$usuario->id) === null, 'Usuario deveria ter sido removido.');
    });
}

function testDisciplinaEAssuntoRepositorios(): void
{
    comOrmIsolado(function (ORMInterface $orm): void {
        $repoDisciplina = new DisciplinaRepositorio($orm);
        $repoAssunto = new AssuntoRepositorio($orm);

        $discA = novaDisciplina('Direito Administrativo', 'Direito');
        $discB = novaDisciplina('Raciocinio Logico', 'Exatas');
        $repoDisciplina->salvar($discA);
        $repoDisciplina->salvar($discB);

        $assunto = new Assunto();
        $assunto->disciplina = $discA;
        $assunto->nome = 'Atos Administrativos';
        $repoAssunto->salvar($assunto);

        assertTrue($repoDisciplina->buscarPorNome('Direito Administrativo')?->id === $discA->id, 'buscarPorNome falhou.');
        assertTrue(count($repoDisciplina->buscarPorArea('Direito')) === 1, 'buscarPorArea deveria retornar 1.');
        assertTrue(count($repoDisciplina->buscarTodas()) === 2, 'buscarTodas deveria retornar 2.');
        assertTrue(count($repoAssunto->buscarPorDisciplina($discA)) === 1, 'buscarPorDisciplina deveria retornar 1.');
        assertTrue($repoAssunto->buscarPorNomeEDisciplina('Atos Administrativos', $discA)?->id === $assunto->id, 'buscarPorNomeEDisciplina falhou.');
    });
}

function testQuestaoEAlternativaRepositorios(): void
{
    comOrmIsolado(function (ORMInterface $orm): void {
        $repoDisciplina = new DisciplinaRepositorio($orm);
        $repoAssunto = new AssuntoRepositorio($orm);
        $repoQuestao = new QuestaoRepositorio($orm);
        $repoAlternativa = new AlternativaRepositorio($orm);

        $disciplina = novaDisciplina('Português', 'Linguagens');
        $repoDisciplina->salvar($disciplina);

        $assunto = new Assunto();
        $assunto->disciplina = $disciplina;
        $assunto->nome = 'Concordância';
        $repoAssunto->salvar($assunto);

        $questao = new Questao();
        $questao->assunto = $assunto;
        $questao->enunciado = 'Qual alternativa está correta?';
        $questao->tipo = 'multipla_escolha';
        $questao->resposta_correta = 'A';
        $questao->banca = 'FGV';
        $questao->dificuldade = 0.75;
        $repoQuestao->salvar($questao);

        $alternativaA = new Alternativa();
        $alternativaA->questao = $questao;
        $alternativaA->letra = 'A';
        $alternativaA->texto = 'Texto A';
        $repoAlternativa->salvar($alternativaA);

        $alternativaB = new Alternativa();
        $alternativaB->questao = $questao;
        $alternativaB->letra = 'B';
        $alternativaB->texto = 'Texto B';
        $repoAlternativa->salvar($alternativaB);

        assertTrue(count($repoQuestao->buscarPorAssunto($assunto)) === 1, 'buscarPorAssunto deveria retornar 1.');
        assertTrue(count($repoQuestao->buscarPorBanca('FGV')) === 1, 'buscarPorBanca deveria retornar 1.');
        assertTrue(count($repoQuestao->buscarPorFaixaDificuldade(0.0, 1.0)) === 1, 'buscarPorFaixaDificuldade deveria retornar 1.');
        assertTrue(count($repoAlternativa->buscarPorQuestao($questao)) === 2, 'buscarPorQuestao deveria retornar 2.');
        assertTrue($repoAlternativa->buscarPorLetraEQuestao('A', $questao)?->id === $alternativaA->id, 'buscarPorLetraEQuestao falhou.');
    });
}

function testCronogramaEItemCronogramaRepositorios(): void
{
    comOrmIsolado(function (ORMInterface $orm): void {
        $repoUsuario = new UsuarioRepositorio($orm);
        $repoDisciplina = new DisciplinaRepositorio($orm);
        $repoCronograma = new CronogramaRepositorio($orm);
        $repoItem = new ItemCronogramaRepositorio($orm);

        $usuario = novoUsuario('joao', 'joao@teste.com');
        $repoUsuario->salvar($usuario);

        $disciplina = novaDisciplina('Matematica', 'Exatas');
        $repoDisciplina->salvar($disciplina);

        $cronograma = new Cronograma();
        $cronograma->usuario = $usuario;
        $cronograma->nome = 'Ciclo Semanal';
        $cronograma->ativo = true;
        $repoCronograma->salvar($cronograma);

        $item = new ItemCronograma();
        $item->cronograma = $cronograma;
        $item->disciplina = $disciplina;
        $item->dia_semana = 2;
        $item->tempo_planejado_minutos = 90;
        $repoItem->salvar($item);

        assertTrue(count($repoCronograma->buscarPorUsuario($usuario)) === 1, 'buscarPorUsuario em cronograma deveria retornar 1.');
        assertTrue(count($repoCronograma->buscarAtivosPorUsuario($usuario)) === 1, 'buscarAtivosPorUsuario deveria retornar 1.');
        assertTrue(count($repoItem->buscarPorCronograma($cronograma)) === 1, 'buscarPorCronograma deveria retornar 1.');
        assertTrue(count($repoItem->buscarPorDisciplina($disciplina)) === 1, 'buscarPorDisciplina em item deveria retornar 1.');
    });
}

function testResolucaoESessaoEstudoRepositorios(): void
{
    comOrmIsolado(function (ORMInterface $orm): void {
        $repoUsuario = new UsuarioRepositorio($orm);
        $repoDisciplina = new DisciplinaRepositorio($orm);
        $repoAssunto = new AssuntoRepositorio($orm);
        $repoQuestao = new QuestaoRepositorio($orm);
        $repoResolucao = new ResolucaoRepositorio($orm);
        $repoSessao = new SessaoEstudoRepositorio($orm);

        $usuario = novoUsuario('maria', 'maria@teste.com');
        $repoUsuario->salvar($usuario);

        $disciplina = novaDisciplina('Informatica', 'Tecnologia');
        $repoDisciplina->salvar($disciplina);

        $assunto = new Assunto();
        $assunto->disciplina = $disciplina;
        $assunto->nome = 'Redes';
        $repoAssunto->salvar($assunto);

        $questao = new Questao();
        $questao->assunto = $assunto;
        $questao->enunciado = 'TCP/IP';
        $questao->tipo = 'multipla_escolha';
        $questao->resposta_correta = 'C';
        $questao->banca = 'CESPE';
        $questao->dificuldade = 0.60;
        $repoQuestao->salvar($questao);

        $resolucaoCorreta = new Resolucao();
        $resolucaoCorreta->usuario = $usuario;
        $resolucaoCorreta->questao = $questao;
        $resolucaoCorreta->resposta_usuario = 'C';
        $resolucaoCorreta->correta = true;
        $repoResolucao->salvar($resolucaoCorreta);

        $resolucaoErrada = new Resolucao();
        $resolucaoErrada->usuario = $usuario;
        $resolucaoErrada->questao = $questao;
        $resolucaoErrada->resposta_usuario = 'A';
        $resolucaoErrada->correta = false;
        $repoResolucao->salvar($resolucaoErrada);

        $sessao = new SessaoEstudo();
        $sessao->usuario = $usuario;
        $sessao->disciplina = $disciplina;
        $sessao->inicio = new DateTimeImmutable('2026-06-01 10:00:00');
        $sessao->fim = new DateTimeImmutable('2026-06-01 11:00:00');
        $sessao->duracao_minutos = 60;
        $repoSessao->salvar($sessao);

        assertTrue(count($repoResolucao->buscarPorUsuario($usuario)) === 2, 'buscarPorUsuario em resolucao deveria retornar 2.');
        assertTrue(count($repoResolucao->buscarPorQuestao($questao)) === 2, 'buscarPorQuestao deveria retornar 2.');
        assertTrue(count($repoResolucao->buscarCorretasPorUsuario($usuario)) === 1, 'buscarCorretasPorUsuario deveria retornar 1.');
        assertTrue(count($repoSessao->buscarPorUsuario($usuario)) === 1, 'buscarPorUsuario em sessao deveria retornar 1.');
        assertTrue(count($repoSessao->buscarPorDisciplina($disciplina)) === 1, 'buscarPorDisciplina em sessao deveria retornar 1.');
        assertTrue(
            count($repoSessao->buscarPorPeriodo(
                new DateTimeImmutable('2020-01-01 00:00:00'),
                new DateTimeImmutable('2030-12-31 23:59:59')
            )) === 1,
            'buscarPorPeriodo deveria retornar 1.'
        );
    });
}

$tests = [
    'testUsuarioRepositorioCrud',
    'testDisciplinaEAssuntoRepositorios',
    'testQuestaoEAlternativaRepositorios',
    'testCronogramaEItemCronogramaRepositorios',
    'testResolucaoESessaoEstudoRepositorios',
];

$falhas = [];
foreach ($tests as $test) {
    try {
        $test();
        echo "[OK] {$test}\n";
    } catch (Throwable $e) {
        $falhas[] = "[ERRO] {$test}: {$e->getMessage()}";
    }
}

if ($falhas !== []) {
    foreach ($falhas as $falha) {
        echo $falha . "\n";
    }
    exit(1);
}

echo "Todos os testes da suite de repositorios passaram.\n";
