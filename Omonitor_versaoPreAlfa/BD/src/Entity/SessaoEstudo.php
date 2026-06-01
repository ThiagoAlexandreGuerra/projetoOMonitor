<?php

namespace App\Entity;

use Cycle\Annotated\Annotation\Column;
use Cycle\Annotated\Annotation\Entity;
use Cycle\Annotated\Annotation\Relation\BelongsTo;

#[Entity(table: 'sessoes_estudo')]
class SessaoEstudo
{
    #[Column(type: 'primary')]
    public ?int $id = null;

    #[BelongsTo(target: Usuario::class)]
    public Usuario $usuario;

    #[BelongsTo(target: Disciplina::class)]
    public Disciplina $disciplina;

    #[Column(type: 'datetime')]
    public \DateTimeImmutable $inicio;

    #[Column(type: 'datetime', nullable: true)]
    public ?\DateTimeImmutable $fim = null;

    #[Column(type: 'integer')]
    public int $duracao_minutos;
}
