<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttributesReclamationTable extends Migration
{
    public function up()
    {
        Schema::create('attributes_reclamation', function (Blueprint $table) {
            $table->id();
            $table->string('attribute');
            $table->string('reason');
            $table->string('report')->nullable()->default(null);
            $table->string('description_report')->nullable()->default(null);
            $table->foreignId('reclamation_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('attributes_reclamation');
    }
}
