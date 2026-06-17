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
        Schema::create('faculty', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name', 100);
            $table->string('email', 100);
            $table->string('phone_number', 15)->nullable();
            $table->string('academic_program', 100)->nullable();
            $table->timestamps();
        });

        Schema::create('qac_personnel', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name', 100);
            $table->string('email', 100);
            $table->boolean('is_admin')->default(false);
            $table->timestamps();
        });

        Schema::create('accreditors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name', 100);
            $table->string('email', 100);
            $table->string('phone_number', 15)->nullable();
            $table->string('specialization', 100)->nullable();
            $table->timestamps();
        });

        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('report_type', 50);
            $table->foreignId('generated_by')->constrained('users')->cascadeOnDelete();
            $table->timestamp('generated_date')->useCurrent();
            $table->string('report_path', 255);
            $table->timestamps();
        });

        Schema::create('system_events', function (Blueprint $table) {
            $table->id();
            $table->string('title', 150);
            $table->text('description')->nullable();
            $table->dateTime('event_date');
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('system_events');
        Schema::dropIfExists('reports');
        Schema::dropIfExists('accreditors');
        Schema::dropIfExists('qac_personnel');
        Schema::dropIfExists('faculty');
    }
};
