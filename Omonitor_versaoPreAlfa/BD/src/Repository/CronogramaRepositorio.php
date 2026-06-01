<?php

namespace App\Repository;

use App\Entity\Cronograma;
use App\Entity\Usuario;
use Cycle\ORM\EntityManager;
use Cycle\ORM\ORMInterface;
use Cycle\ORM\Select\Repository;

class CronogramaRepositorio
{
    private EntityManager $entityManager;

    public function __construct(private ORMInterface $orm)
    {
        $this->entityManager = new EntityManager($this->orm);
    }

    public function salvar(Cronograma $cronograma): Cronograma
    {
        $this->entityManager->persist($cronograma)->run();
        return $cronograma;
    }

    public function remover(Cronograma $cronograma): void
    {
        $this->entityManager->delete($cronograma)->run();
    }

    public function buscarPorId(int $id): ?Cronograma
    {
        return $this->repositorio()->findByPK($id);
    }

    /**
     * @return Cronograma[]
     */
    public function buscarPorUsuario(Usuario $usuario): array
    {
        return $this->repositorio()
            ->select()
            ->where(['usuario_id' => $usuario->id])
            ->fetchAll();
    }

    /**
     * @return Cronograma[]
     */
    public function buscarAtivosPorUsuario(Usuario $usuario): array
    {
        return $this->repositorio()
            ->select()
            ->where(['usuario_id' => $usuario->id, 'ativo' => true])
            ->fetchAll();
    }

    /**
     * @return Repository<Cronograma>
     */
    private function repositorio(): Repository
    {
        /** @var Repository<Cronograma> $repositorio */
        $repositorio = $this->orm->getRepository(Cronograma::class);
        return $repositorio;
    }
}
