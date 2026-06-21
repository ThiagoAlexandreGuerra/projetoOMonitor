<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Orgao extends Model
{
    protected $table = 'orgaos';

    protected $fillable = [
        'nome'
    ];

    public function provas (){
        return $this->hasMany(Prova::class);
    }
}
