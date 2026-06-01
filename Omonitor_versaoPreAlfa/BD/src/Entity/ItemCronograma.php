<?php

namespace App\Entity;

use Cycle\Annotated\Annotation\Column;
use Cycle\Annotated\Annotation\Entity;
use Cycle\Annotated\Annotation\Relation\BelongsTo;

#[Entity(table: 'cronograma_itens')]
class ItemCronograma
{
    #[Column(type: 'primary')]
    public ?int $id = null;

    #[BelongsTo(target: Cronograma::class)]
    public Cronograma $cronograma;

    #[BelongsTo(target: Disciplina::class)]
    public Disciplina $disciplina;

    #[Column(type: 'integer')]
    public int $dia_semana;

    #[Column(type: 'integer')]
    public int $tempo_planejado_minutos;
}
