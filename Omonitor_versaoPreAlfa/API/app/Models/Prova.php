<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prova extends Model
{
    protected $table = 'provas';

    protected $fillable = [
        'nome',
        'ano',
        'orgao_id',
        'banca_id',
        'cargo_id'
    ];

    public function questoes()
    {
        return $this->hasMany(Questao::class);
    }

    public function orgao()
    {
        return $this->belongsTo(Orgao::class);
    }

    public function banca()
    {
        return $this->belongsTo(Banca::class);
    }

    public function cargo()
    {
        return $this->belongsTo(Cargo::class);
    }
}