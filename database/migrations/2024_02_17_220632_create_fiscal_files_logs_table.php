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
        Schema::create('fiscal_files_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('fiscal_file_id');
            $table->unsignedBigInteger('updated_by');
            $table->string('name');
            $table->string('cin_or_fiscal_number');
            $table->date('taxation_date');
            $table->string('tax_center');
            $table->decimal('tax_amount', 8, 2);
            $table->string('theme')->nullable();
            $table->string('issuing_organism');
            $table->date('delivery_date_to_admin');
            $table->date('receipt_date');
            $table->string('status');
            $table->timestamps();

            $table->foreign('fiscal_file_id')->references('id')->on('fiscal_files')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fiscal_files_logs');
    }
};
