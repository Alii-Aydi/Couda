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
            $table->text('conclusion')->nullable()->default(null);
            $table->timestamps();
        });

        Schema::create('proces_verbaux_signatures', function (Blueprint $table) {
            $table->foreignId('proces_verbaux_id')->constrained('proces_verbaux')->onDelete('cascade');
            $table->foreignId('signature_id')->constrained('signatures')->onDelete('cascade');
            $table->primary(['proces_verbaux_id', 'signature_id']);
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
