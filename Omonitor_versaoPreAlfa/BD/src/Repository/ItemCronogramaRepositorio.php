<?php

namespace App\Repository;

use App\Entity\Cronograma;
use App\Entity\Disciplina;
use App\Entity\ItemCronograma;
use Cycle\ORM\EntityManager;
use Cycle\ORM\ORMInterface;
use Cycle\ORM\Select\Repository;

class ItemCronogramaRepositorio
{
    private EntityManager $entityManager;

    public function __construct(private ORMInterface $orm)
    {
        $this->entityManager = new EntityManager($this->orm);
    }

    public function salvar(ItemCronograma $item): ItemCronograma
    {
        $this->entityManager->persist($item)->run();
        return $item;
    }

    public function remover(ItemCronograma $item): void
    {
        $this->entityManager->delete($item)->run();
    }

    public function buscarPorId(int $id): ?ItemCronograma
    {
        return $this->repositorio()->findByPK($id);
    }

    /**
     * @return ItemCronograma[]
     */
    public function buscarPorCronograma(Cronograma $cronograma): array
    {
        return $this->repositorio()
            ->select()
            ->where(['cronograma_id' => $cronograma->id])
            ->orderBy('dia_semana')
            ->fetchAll();
    }

    /**
     * @return ItemCronograma[]
     */
    public function buscarPorDisciplina(Disciplina $disciplina): array
    {
        return $this->repositorio()
            ->select()
            ->where(['disciplina_id' => $disciplina->id])
            ->fetchAll();
    }

    /**
     * @return Repository<ItemCronograma>
     */
    private function repositorio(): Repository
    {
        /** @var Repository<ItemCronograma> $repositorio */
        $repositorio = $this->orm->getRepository(ItemCronograma::class);
        return $repositorio;
    }
}
