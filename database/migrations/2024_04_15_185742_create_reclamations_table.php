<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReclamationsTable extends Migration
{
    public function up()
    {
        Schema::create('reclamations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fiscal_file_id')->constrained(); // Foreign key to fiscalfiles table
            $table->unsignedBigInteger('created_by');
            $table->string('contact_destination'); // Assuming it's an email
            $table->timestamp('expiration_date')->default(now()->addDays(3));
            $table->string('token')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reclamations');
    }
}
