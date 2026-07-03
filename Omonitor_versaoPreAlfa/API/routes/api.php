<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuestaoController;

Route::get('/questoes', [QuestaoController::class, 'index']);

use App\Http\Controllers\CatalogoController;

Route::get('/catalogo', [CatalogoController::class, 'index']);