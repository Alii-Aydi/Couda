<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFiscalFileCommitteeTable extends Migration
{
    public function up()
    {
        Schema::create('committee_fiscal_file', function (Blueprint $table) {
            $table->foreignId('committee_id')->constrained()->onDelete('cascade');
            $table->foreignId('fiscal_file_id')->constrained()->onDelete('cascade');
            $table->primary(['fiscal_file_id', 'committee_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('fiscal_file_committee');
    }
}
