<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProcesVerbauxTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proces_verbaux', function (Blueprint $table) {
            $table->id();
            $table->string('presedent');
            $table->text('ouverture');
            $table->text('cloture');
            $table->string('pdf')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('proces_verbaux_signatures');
        Schema::dropIfExists('proces_verbaux');
    }
}
