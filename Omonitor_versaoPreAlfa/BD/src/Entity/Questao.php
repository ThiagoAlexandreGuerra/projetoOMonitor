<?php

namespace App\Entity;

use Cycle\Annotated\Annotation\Column;
use Cycle\Annotated\Annotation\Entity;
use Cycle\Annotated\Annotation\Relation\BelongsTo;
use Cycle\Annotated\Annotation\Relation\HasMany;

#[Entity(table: 'questoes')]
class Questao
{
    #[Column(type: 'primary')]
    public ?int $id = null;

    #[Column(type: 'text')]
    public string $enunciado;

    #[Column(type: 'text', nullable: true)]
    public ?string $explicacao_gabarito = null;

    #[Column(type: 'string', length: 20)]
    public string $tipo;

    #[Column(type: 'string', length: 1)]
    public string $resposta_correta;

    #[Column(type: 'string', length: 150, nullable: true)]
    public ?string $banca = null;

    #[Column(type: 'string', length: 150, nullable: true)]
    public ?string $concurso = null;

    #[BelongsTo(target: Assunto::class)]
    public Assunto $assunto;

    #[Column(type: 'decimal', precision: 3, scale: 2, nullable: true)]
    public ?float $dificuldade = null;

    #[HasMany(target: Alternativa::class)]
    public array $alternativas = [];

    #[HasMany(target: Resolucao::class)]
    public array $resolucoes = [];
}
