<?php

namespace App\Http\Controllers;

use App\Models\Assunto;
use App\Models\Materia;
use App\Models\Area;
use App\Models\Orgao;
use App\Models\Banca;
use App\Models\Cargo;

class CatalogoController extends Controller
{
    public function index()
    {
        return response()->json([
            'assuntos' => Assunto::all(),
            'materias' => Materia::all(),
            'areas' => Area::all(),
            'orgaos' => Orgao::all(),
            'bancas' => Banca::all(),
            'cargos' => Cargo::all()
        ]);
    }
}