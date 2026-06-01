<?php

namespace App\Entity;

use Cycle\Annotated\Annotation\Column;
use Cycle\Annotated\Annotation\Entity;
use Cycle\Annotated\Annotation\Relation\BelongsTo;
use Cycle\Annotated\Annotation\Relation\HasMany;

#[Entity(table: 'assuntos')]
class Assunto
{
    #[Column(type: 'primary')]
    public ?int $id = null;

    #[BelongsTo(target: Disciplina::class)]
    public Disciplina $disciplina;

    #[Column(type: 'string', length: 150)]
    public string $nome;

    #[HasMany(target: Questao::class)]
    public array $questoes = [];
}
