<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RevisaoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'conteudo' => $this->conteudo,

            'questao_id' => $this->questao_id,

            'data_criacao' => $this->created_at,
        ];
    }
}
