<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestaoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'comando' => $this->comando,

            'alternativas' => [
                [
                    'texto' => $this->alternativa_a,
                    'letra' => 'A'
                ],
                [
                    'texto' => $this->alternativa_b,
                    'letra' => 'B'
                ],
                [
                    'texto' => $this->alternativa_c,
                    'letra' => 'C'
                ],
                [
                    'texto' => $this->alternativa_d,
                    'letra' => 'D'
                ],
                [
                    'texto' => $this->alternativa_e,
                    'letra' => 'E'
                ]
            ],

            'gabarito' => strtoupper($this->gabarito),

            'resolucao' => $this->resolucao,

            'assunto' => $this->assunto,

            'prova' => $this->prova,

            'revisao' => RevisaoResource::make($this->whenLoaded('revisao')),
        ];
    }
}