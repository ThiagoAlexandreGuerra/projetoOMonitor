<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questoes', function (Blueprint $table) {
            $table->id();
            $table->text('comando');
            $table->text('alternativa_a');
            $table->text('alternativa_b');
            $table->text('alternativa_c');
            $table->text('alternativa_d');
            $table->text('alternativa_e');
            $table->char('gabarito',1);
            $table->text('resolucao');
            $table->enum('dificuldade', [
                            'facil',
                            'medio',
                            'dificil'
                        ])->default('medio');
            $table->foreignId('assunto_id')
                            ->constrained()
                            ->cascadeOnDelete();
            $table->foreignId('prova_id')
                            ->constrained()
                            ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questoes');
    }
};
