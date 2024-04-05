<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveReportColumnFromFiscalFilesTable extends Migration
{
    public function up()
    {
        Schema::table('fiscal_files', function (Blueprint $table) {
            $table->dropColumn('report');
        });
    }

    public function down()
    {
        Schema::table('fiscal_files', function (Blueprint $table) {
            $table->string('report')->after('receipt_date'); // Add back the 'report' column if needed
        });
    }
}
