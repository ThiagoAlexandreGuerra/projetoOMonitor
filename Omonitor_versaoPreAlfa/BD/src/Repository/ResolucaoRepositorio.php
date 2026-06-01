<?php

namespace App\Repository;

use App\Entity\Questao;
use App\Entity\Resolucao;
use App\Entity\Usuario;
use Cycle\ORM\EntityManager;
use Cycle\ORM\ORMInterface;
use Cycle\ORM\Select\Repository;

class ResolucaoRepositorio
{
    private EntityManager $entityManager;

    public function __construct(private ORMInterface $orm)
    {
        $this->entityManager = new EntityManager($this->orm);
    }

    public function salvar(Resolucao $resolucao): Resolucao
    {
        $this->entityManager->persist($resolucao)->run();
        return $resolucao;
    }

    public function remover(Resolucao $resolucao): void
    {
        $this->entityManager->delete($resolucao)->run();
    }

    public function buscarPorId(int $id): ?Resolucao
    {
        return $this->repositorio()->findByPK($id);
    }

    /**
     * @return Resolucao[]
     */
    public function buscarPorUsuario(Usuario $usuario): array
    {
        return $this->repositorio()
            ->select()
            ->where(['usuario_id' => $usuario->id])
            ->fetchAll();
    }

    /**
     * @return Resolucao[]
     */
    public function buscarPorQuestao(Questao $questao): array
    {
        return $this->repositorio()
            ->select()
            ->where(['questao_id' => $questao->id])
            ->fetchAll();
    }

    /**
     * @return Resolucao[]
     */
    public function buscarCorretasPorUsuario(Usuario $usuario): array
    {
        return $this->repositorio()
            ->select()
            ->where(['usuario_id' => $usuario->id, 'correta' => true])
            ->fetchAll();
    }

    /**
     * @return Repository<Resolucao>
     */
    private function repositorio(): Repository
    {
        /** @var Repository<Resolucao> $repositorio */
        $repositorio = $this->orm->getRepository(Resolucao::class);
        return $repositorio;
    }
}
