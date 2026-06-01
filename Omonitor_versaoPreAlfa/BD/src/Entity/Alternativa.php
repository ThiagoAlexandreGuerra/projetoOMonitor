<?php

namespace App\Entity;

use Cycle\Annotated\Annotation\Column;
use Cycle\Annotated\Annotation\Entity;
use Cycle\Annotated\Annotation\Relation\BelongsTo;

#[Entity(table: 'alternativas')]
class Alternativa
{
    #[Column(type: 'primary')]
    public ?int $id = null;

    #[BelongsTo(target: Questao::class)]
    public Questao $questao;

    #[Column(type: 'string', length: 1)]
    public string $letra;

    #[Column(type: 'text')]
    public string $texto;
}
