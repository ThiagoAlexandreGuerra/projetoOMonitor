<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;


class Questao extends Model
{
    protected $table = 'questoes';

    protected $fillable = [
        'comando',
        'alternativa_a',
        'alternativa_b',
        'alternativa_c',
        'alternativa_d',
        'alternativa_e',
        'gabarito',
        'resolucao',
        'assunto_id',
        'prova_id'
    ];

    public function assunto()
    {
        return $this->belongsTo(Assunto::class);
    }

    public function prova()
    {
        return $this->belongsTo(Prova::class);
    }
    
    public function revisao(): HasOne
    {
        return $this->hasOne(Revisao::class);
    }
}
