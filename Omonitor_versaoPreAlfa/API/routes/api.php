<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuestaoController;

Route::get('/questoes', [QuestaoController::class, 'index']);