<?php

namespace App\Repository;

use App\Entity\Disciplina;
use Cycle\ORM\EntityManager;
use Cycle\ORM\ORMInterface;
use Cycle\ORM\Select\Repository;

class DisciplinaRepositorio
{
    private EntityManager $entityManager;

    public function __construct(private ORMInterface $orm)
    {
        $this->entityManager = new EntityManager($this->orm);
    }

    public function salvar(Disciplina $disciplina): Disciplina
    {
        $this->entityManager->persist($disciplina)->run();
        return $disciplina;
    }

    public function remover(Disciplina $disciplina): void
    {
        $this->entityManager->delete($disciplina)->run();
    }

    public function buscarPorId(int $id): ?Disciplina
    {
        return $this->repositorio()->findByPK($id);
    }

    public function buscarPorNome(string $nome): ?Disciplina
    {
        return $this->repositorio()
            ->select()
            ->where(['nome' => $nome])
            ->fetchOne();
    }

    /**
     * @return Disciplina[]
     */
    public function buscarPorArea(string $area): array
    {
        return $this->repositorio()
            ->select()
            ->where(['area' => $area])
            ->fetchAll();
    }

    /**
     * @return Disciplina[]
     */
    public function buscarTodas(): array
    {
        return $this->repositorio()
            ->select()
            ->orderBy('nome')
            ->fetchAll();
    }

    /**
     * @return Repository<Disciplina>
     */
    private function repositorio(): Repository
    {
        /** @var Repository<Disciplina> $repositorio */
        $repositorio = $this->orm->getRepository(Disciplina::class);
        return $repositorio;
    }
}
