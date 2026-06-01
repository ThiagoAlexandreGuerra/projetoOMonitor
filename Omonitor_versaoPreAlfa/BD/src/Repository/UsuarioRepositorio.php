<?php

namespace App\Repository;

use App\Entity\Usuario;
use Cycle\ORM\EntityManager;
use Cycle\ORM\ORMInterface;
use Cycle\ORM\Select\Repository;

class UsuarioRepositorio
{
    private EntityManager $entityManager;

    public function __construct(private ORMInterface $orm)
    {
        $this->entityManager = new EntityManager($this->orm);
    }

    public function salvar(Usuario $usuario): Usuario
    {
        $usuario->atualizado_em = new \DateTimeImmutable();
        $this->entityManager->persist($usuario)->run();

        return $usuario;
    }

    public function remover(Usuario $usuario): void
    {
        $this->entityManager->delete($usuario)->run();
    }

    public function buscarPorId(int $id): ?Usuario
    {
        return $this->repositorio()->findByPK($id);
    }

    public function buscarPorEmail(string $email): ?Usuario
    {
        return $this->repositorio()
            ->select()
            ->where(['email' => $email])
            ->fetchOne();
    }

    /**
     * @return Usuario[]
     */
    public function buscarTodos(): array
    {
        return $this->repositorio()->select()->fetchAll();
    }

    /**
     * @return Repository<Usuario>
     */
    private function repositorio(): Repository
    {
        /** @var Repository<Usuario> $repositorio */
        $repositorio = $this->orm->getRepository(Usuario::class);
        return $repositorio;
    }
}
