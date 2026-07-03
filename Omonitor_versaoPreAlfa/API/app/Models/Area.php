<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $table = 'areas';

    protected $fillable = [
        'nome',
        'materia_id'
    ];

    public function materia()
    {
        return $this->belongsTo(Materia::class);
    }

    public function assuntos()
    {
        return $this->hasMany(Assunto::class);
    }
}