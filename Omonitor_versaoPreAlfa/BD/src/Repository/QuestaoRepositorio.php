<?php

namespace App\Repository;

use App\Entity\Assunto;
use App\Entity\Questao;
use Cycle\ORM\EntityManager;
use Cycle\ORM\ORMInterface;
use Cycle\ORM\Select\Repository;

class QuestaoRepositorio
{
    private EntityManager $entityManager;

    public function __construct(private ORMInterface $orm)
    {
        $this->entityManager = new EntityManager($this->orm);
    }

    public function salvar(Questao $questao): Questao
    {
        $this->entityManager->persist($questao)->run();
        return $questao;
    }

    public function remover(Questao $questao): void
    {
        $this->entityManager->delete($questao)->run();
    }

    public function buscarPorId(int $id): ?Questao
    {
        return $this->repositorio()->findByPK($id);
    }

    /**
     * @return Questao[]
     */
    public function buscarPorAssunto(Assunto $assunto): array
    {
        return $this->repositorio()
            ->select()
            ->where(['assunto_id' => $assunto->id])
            ->fetchAll();
    }

    /**
     * @return Questao[]
     */
    public function buscarPorBanca(string $banca): array
    {
        return $this->repositorio()
            ->select()
            ->where(['banca' => $banca])
            ->fetchAll();
    }

    /**
     * @return Questao[]
     */
    public function buscarPorFaixaDificuldade(float $min, float $max): array
    {
        $questoes = $this->repositorio()
            ->select()
            ->fetchAll();

        return array_values(array_filter(
            $questoes,
            static fn (Questao $questao): bool =>
                $questao->dificuldade !== null
                && $questao->dificuldade >= $min
                && $questao->dificuldade <= $max
        ));
    }

    /**
     * @return Repository<Questao>
     */
    private function repositorio(): Repository
    {
        /** @var Repository<Questao> $repositorio */
        $repositorio = $this->orm->getRepository(Questao::class);
        return $repositorio;
    }
}
