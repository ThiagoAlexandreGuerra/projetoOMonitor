<?php

namespace App\Repository;

use App\Entity\Disciplina;
use App\Entity\SessaoEstudo;
use App\Entity\Usuario;
use Cycle\ORM\EntityManager;
use Cycle\ORM\ORMInterface;
use Cycle\ORM\Select\Repository;

class SessaoEstudoRepositorio
{
    private EntityManager $entityManager;

    public function __construct(private ORMInterface $orm)
    {
        $this->entityManager = new EntityManager($this->orm);
    }

    public function salvar(SessaoEstudo $sessao): SessaoEstudo
    {
        $this->entityManager->persist($sessao)->run();
        return $sessao;
    }

    public function remover(SessaoEstudo $sessao): void
    {
        $this->entityManager->delete($sessao)->run();
    }

    public function buscarPorId(int $id): ?SessaoEstudo
    {
        return $this->repositorio()->findByPK($id);
    }

    /**
     * @return SessaoEstudo[]
     */
    public function buscarPorUsuario(Usuario $usuario): array
    {
        return $this->repositorio()
            ->select()
            ->where(['usuario_id' => $usuario->id])
            ->fetchAll();
    }

    /**
     * @return SessaoEstudo[]
     */
    public function buscarPorDisciplina(Disciplina $disciplina): array
    {
        return $this->repositorio()
            ->select()
            ->where(['disciplina_id' => $disciplina->id])
            ->fetchAll();
    }

    /**
     * @return SessaoEstudo[]
     */
    public function buscarPorPeriodo(\DateTimeImmutable $inicio, \DateTimeImmutable $fim): array
    {
        $sessoes = $this->repositorio()
            ->select()
            ->fetchAll();

        return array_values(array_filter(
            $sessoes,
            static fn (SessaoEstudo $sessao): bool =>
                $sessao->inicio >= $inicio
                && $sessao->inicio <= $fim
        ));
    }

    /**
     * @return Repository<SessaoEstudo>
     */
    private function repositorio(): Repository
    {
        /** @var Repository<SessaoEstudo> $repositorio */
        $repositorio = $this->orm->getRepository(SessaoEstudo::class);
        return $repositorio;
    }
}
