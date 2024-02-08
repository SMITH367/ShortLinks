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

        Schema::create('u_r_l_models', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('user');
            $table->foreign('user')->references('email')->on('users');
            $table->unsignedBigInteger('id_url');
            $table->foreign('id_url')->references('id')->on('short_urls');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('u_r_l_models');
    }
};
