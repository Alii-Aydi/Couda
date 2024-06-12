<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResReclamationsAndRelatedTables extends Migration
{
    public function up()
    {
        Schema::create('res_reclamations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('reclamation_id');
            $table->unsignedBigInteger('fiscal_file_id');
            $table->string('sender_contact');
            $table->timestamps();

            $table->foreign('reclamation_id')->references('id')->on('reclamations')->onDelete('cascade');
            $table->foreign('fiscal_file_id')->references('id')->on('fiscal_files')->onDelete('cascade');
        });

        Schema::create('att_res', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('res_reclamation_id');
            $table->string('attribute');
            $table->string('value');
            $table->timestamps();

            $table->foreign('res_reclamation_id')->references('id')->on('res_reclamations')->onDelete('cascade');
        });

        Schema::create('repo_res', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('res_reclamation_id');
            $table->string('report_name');
            $table->string('file_path');
            $table->timestamps();

            $table->foreign('res_reclamation_id')->references('id')->on('res_reclamations')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('repo_res');
        Schema::dropIfExists('att_res');
        Schema::dropIfExists('res_reclamations');
    }
}
