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
            $table->unsignedBigInteger('fiscal_file_id')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->string('name')->nullable();
            $table->string('cin_or_fiscal_number')->nullable();
            $table->date('taxation_date')->nullable();
            $table->string('tax_center')->nullable();
            $table->decimal('tax_amount', 8, 2)->nullable();
            $table->string('theme')->nullable();
            $table->string('issuing_organism')->nullable();
            $table->date('delivery_date_to_admin')->nullable();
            $table->date('receipt_date')->nullable();
            $table->string('status')->nullable();
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
