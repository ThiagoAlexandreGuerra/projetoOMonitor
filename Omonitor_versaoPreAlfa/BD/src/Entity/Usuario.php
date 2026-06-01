<?php

namespace App\Entity;

use Cycle\Annotated\Annotation\Column;
use Cycle\Annotated\Annotation\Entity;
use Cycle\Annotated\Annotation\Relation\HasMany;
use Cycle\Annotated\Annotation\Table\Index;

#[Entity(table: 'usuarios')]
#[Index(columns: ['username'], unique: true, name: 'usuarios_unique_username')]
#[Index(columns: ['email'], unique: true, name: 'usuarios_unique_email')]
class Usuario
{
    #[Column(type: 'primary')]
    public ?int $id = null;

    #[Column(type: 'string', length: 50)]
    public string $username;

    #[Column(type: 'string', length: 255)]
    public string $email;

    #[Column(type: 'string', length: 255)]
    public string $senha_hash;

    #[Column(type: 'string', length: 150)]
    public string $nome_completo;

    #[Column(type: 'text', nullable: true)]
    public ?string $foto_perfil = null;

    #[Column(type: 'boolean', default: true)]
    public bool $ativo = true;

    #[Column(type: 'datetime')]
    public \DateTimeImmutable $criado_em;

    #[Column(type: 'datetime', nullable: true)]
    public ?\DateTimeImmutable $atualizado_em = null;

    #[HasMany(target: Cronograma::class)]
    public array $cronogramas = [];

    #[HasMany(target: Resolucao::class)]
    public array $resolucoes = [];

    #[HasMany(target: SessaoEstudo::class)]
    public array $sessoes_estudo = [];

    public function __construct()
    {
        $this->criado_em = new \DateTimeImmutable();
    }
}
