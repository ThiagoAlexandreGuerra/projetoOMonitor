<?php

namespace App\Http\Controllers;

use App\Models\Questao;
use App\Http\Resources\QuestaoResource;
 
class QuestaoController extends Controller
{
    public function index()
{
    return QuestaoResource::collection(
        Questao::with([
            'assunto.area.materia',
            'prova.banca',
            'prova.orgao',
            'prova.cargo',
            'revisao'
        ])->get()
    );
}
}