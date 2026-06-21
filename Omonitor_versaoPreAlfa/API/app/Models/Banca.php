<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Banca extends Model
{
    protected $table = 'bancas';

    protected $fillable = [
        'nome'
    ];

    public function provas (){
        return $this->hasMany(Prova::class);
    }

}
