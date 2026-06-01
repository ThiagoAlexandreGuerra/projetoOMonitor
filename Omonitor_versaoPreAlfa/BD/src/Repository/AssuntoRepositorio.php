<?php

namespace App\Repository;

use App\Entity\Assunto;
use App\Entity\Disciplina;
use Cycle\ORM\EntityManager;
use Cycle\ORM\ORMInterface;
use Cycle\ORM\Select\Repository;

class AssuntoRepositorio
{
    private EntityManager $entityManager;

    public function __construct(private ORMInterface $orm)
    {
        $this->entityManager = new EntityManager($this->orm);
    }

    public function salvar(Assunto $assunto): Assunto
    {
        $this->entityManager->persist($assunto)->run();
        return $assunto;
    }

    public function remover(Assunto $assunto): void
    {
        $this->entityManager->delete($assunto)->run();
    }

    public function buscarPorId(int $id): ?Assunto
    {
        return $this->repositorio()->findByPK($id);
    }

    /**
     * @return Assunto[]
     */
    public function buscarPorDisciplina(Disciplina $disciplina): array
    {
        return $this->repositorio()
            ->select()
            ->where(['disciplina_id' => $disciplina->id])
            ->orderBy('nome')
            ->fetchAll();
    }

    public function buscarPorNomeEDisciplina(string $nome, Disciplina $disciplina): ?Assunto
    {
        return $this->repositorio()
            ->select()
            ->where(['nome' => $nome, 'disciplina_id' => $disciplina->id])
            ->fetchOne();
    }

    /**
     * @return Repository<Assunto>
     */
    private function repositorio(): Repository
    {
        /** @var Repository<Assunto> $repositorio */
        $repositorio = $this->orm->getRepository(Assunto::class);
        return $repositorio;
    }
}
