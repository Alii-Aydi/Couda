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
        Schema::create('sous_proces_verbaux', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('proces_verbaux_id'); // Add this line to create the column
            $table->text('decision');
            $table->string('path_to_spv');
            $table->unsignedBigInteger('fiscal_file_id');
            $table->foreign('fiscal_file_id')->references('id')->on('fiscal_files')->onDelete('cascade');
            $table->timestamps();

            // Foreign key constraint to parent pv
            $table->foreign('proces_verbaux_id')->references('id')->on('proces_verbaux')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sous_proces_verbaux');
    }
};
