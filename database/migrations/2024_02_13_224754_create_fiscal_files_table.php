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
            $table->string('name')->nullable();
            $table->string('cin_or_fiscal_number')->nullable();
            $table->date('taxation_date')->nullable();
            $table->string('tax_center')->nullable();
            $table->decimal('tax_amount', 8, 2)->nullable();
            $table->string('theme')->nullable();
            $table->string('issuing_organism')->nullable();
            $table->date('delivery_date_to_admin')->nullable();
            $table->date('receipt_date')->nullable();
            $table->string('report')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reports');
        Schema::dropIfExists('fiscal_file_logs');
        Schema::dropIfExists('fiscal_files');
    }
}
