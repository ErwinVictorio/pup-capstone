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
        Schema::create('accreditations', function (Blueprint $table) {
            $table->id();
            $table->string('title', 150);
            $table->string('status', 20)->default('pending');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->timestamps();
        });

        Schema::create('accreditation_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('accreditation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('assigned_user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamp('assigned_at')->useCurrent();
            $table->timestamps();

            $table->unique(['accreditation_id', 'assigned_user_id'], 'accred_assign_unique');
        });

        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('accreditation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('uploaded_by')->constrained('users')->cascadeOnDelete();
            $table->string('file_name', 150);
            $table->string('file_path', 255);
            $table->timestamp('upload_date')->useCurrent();
            $table->timestamps();
        });

        Schema::create('document_evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('document_id')->constrained()->cascadeOnDelete();
            $table->foreignId('evaluated_by')->constrained('users')->cascadeOnDelete();
            $table->string('status', 20)->default('pending');
            $table->integer('score')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamp('evaluated_at')->nullable();
            $table->timestamps();
        });

        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('message');
            $table->string('status', 20)->default('unread');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('document_evaluations');
        Schema::dropIfExists('documents');
        Schema::dropIfExists('accreditation_assignments');
        Schema::dropIfExists('accreditations');
    }
};
