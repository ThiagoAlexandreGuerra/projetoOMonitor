<?php

namespace App\Entity;

use Cycle\Annotated\Annotation\Column;
use Cycle\Annotated\Annotation\Entity;
use Cycle\Annotated\Annotation\Relation\BelongsTo;
use Cycle\Annotated\Annotation\Relation\HasMany;

#[Entity(table: 'cronogramas')]
class Cronograma
{
    #[Column(type: 'primary')]
    public ?int $id = null;

    #[BelongsTo(target: Usuario::class)]
    public Usuario $usuario;

    #[Column(type: 'string', length: 100)]
    public string $nome;

    #[Column(type: 'boolean', default: true)]
    public bool $ativo = true;

    #[HasMany(target: ItemCronograma::class)]
    public array $itens = [];
}
