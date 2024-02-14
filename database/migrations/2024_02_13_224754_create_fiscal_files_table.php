<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFiscalFilesTable extends Migration
{
    public function up()
    {
        Schema::create('fiscal_files', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('cin_or_fiscal_number');
            $table->date('taxation_date');
            $table->string('tax_center');
            $table->decimal('tax_amount', 8, 2);
            $table->string('theme');
            $table->string('issuing_organism');
            $table->date('delivery_date_to_admin');
            $table->date('receipt_date');
            $table->string('report');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('fiscal_files');
    }
}
