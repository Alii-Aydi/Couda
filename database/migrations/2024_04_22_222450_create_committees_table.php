<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommitteesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('committees', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date');
            $table->string('status')->default('not-confirmed');
            $table->string('title');
            $table->time('time_start');
            $table->time('time_end')->nullable()->default(null);
            // Add foreign key to the parent event
            $table->foreignId('proces_verbaux_id')->nullable()->default(null)->constrained('proces_verbaux')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('committee_user', function (Blueprint $table) {
            $table->foreignId('committee_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->primary(['committee_id', 'user_id']);
            $table->string('presence')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('committee_user');
        Schema::dropIfExists('fiscal_file_committee');
        Schema::dropIfExists('committees');
    }
}
