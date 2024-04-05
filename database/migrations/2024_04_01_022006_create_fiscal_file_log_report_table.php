<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFiscalFileLogReportTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fiscal_file_log_report', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fiscal_file_log_id')->constrained('fiscal_files_logs')->onDelete('cascade');
            $table->foreignId('report_id')->constrained()->onDelete('cascade');
            // Add any additional columns you may need in the pivot table
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
        Schema::dropIfExists('fiscal_file_log_report');
    }
}
