<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Revisao extends Model
{
    protected $table= 'revisoes';

    protected $fillable = [
        'questao_id',
        'conteudo'
    ];

    public function questao(){
        return $this->BelongsTo(Questao::class);
    }
}
