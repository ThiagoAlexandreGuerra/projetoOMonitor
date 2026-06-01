<?php

namespace App\Entity;

use Cycle\Annotated\Annotation\Column;
use Cycle\Annotated\Annotation\Entity;
use Cycle\Annotated\Annotation\Relation\BelongsTo;

#[Entity(table: 'resolucoes')]
class Resolucao
{
    #[Column(type: 'primary')]
    public ?int $id = null;

    #[BelongsTo(target: Usuario::class)]
    public Usuario $usuario;

    #[BelongsTo(target: Questao::class)]
    public Questao $questao;

    #[Column(type: 'string', length: 1)]
    public string $resposta_usuario;

    #[Column(type: 'boolean')]
    public bool $correta;

    #[Column(type: 'integer', nullable: true)]
    public ?int $tempo_resolucao_segundos = null;
}
