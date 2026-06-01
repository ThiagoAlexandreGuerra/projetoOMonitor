<?php

namespace App\Repository;

use App\Entity\Alternativa;
use App\Entity\Questao;
use Cycle\ORM\EntityManager;
use Cycle\ORM\ORMInterface;
use Cycle\ORM\Select\Repository;

class AlternativaRepositorio
{
    private EntityManager $entityManager;

    public function __construct(private ORMInterface $orm)
    {
        $this->entityManager = new EntityManager($this->orm);
    }

    public function salvar(Alternativa $alternativa): Alternativa
    {
        $this->entityManager->persist($alternativa)->run();
        return $alternativa;
    }

    public function remover(Alternativa $alternativa): void
    {
        $this->entityManager->delete($alternativa)->run();
    }

    public function buscarPorId(int $id): ?Alternativa
    {
        return $this->repositorio()->findByPK($id);
    }

    /**
     * @return Alternativa[]
     */
    public function buscarPorQuestao(Questao $questao): array
    {
        return $this->repositorio()
            ->select()
            ->where(['questao_id' => $questao->id])
            ->orderBy('letra')
            ->fetchAll();
    }

    public function buscarPorLetraEQuestao(string $letra, Questao $questao): ?Alternativa
    {
        return $this->repositorio()
            ->select()
            ->where(['questao_id' => $questao->id, 'letra' => $letra])
            ->fetchOne();
    }

    /**
     * @return Repository<Alternativa>
     */
    private function repositorio(): Repository
    {
        /** @var Repository<Alternativa> $repositorio */
        $repositorio = $this->orm->getRepository(Alternativa::class);
        return $repositorio;
    }
}
