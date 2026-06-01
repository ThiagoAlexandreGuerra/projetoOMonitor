<?php

namespace App\Entity;

use Cycle\Annotated\Annotation\Column;
use Cycle\Annotated\Annotation\Entity;
use Cycle\Annotated\Annotation\Relation\HasMany;

#[Entity(table: 'disciplinas')]
class Disciplina
{
    #[Column(type: 'primary')]
    public ?int $id = null;

    #[Column(type: 'string', length: 100)]
    public string $nome;

    #[Column(type: 'string', length: 100, nullable: true)]
    public ?string $area = null;

    #[HasMany(target: Assunto::class)]
    public array $assuntos = [];

    #[HasMany(target: ItemCronograma::class)]
    public array $cronograma_itens = [];

    #[HasMany(target: SessaoEstudo::class)]
    public array $sessoes_estudo = [];
}
