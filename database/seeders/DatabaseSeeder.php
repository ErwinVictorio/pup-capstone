<?php

namespace Database\Seeders;

use App\Models\Accreditation;
use App\Models\AccreditationAssignment;
use App\Models\Accreditor;
use App\Models\Document;
use App\Models\DocumentEvaluation;
use App\Models\Faculty;
use App\Models\Notification;
use App\Models\QacPersonnel;
use App\Models\Report;
use App\Models\SystemEvent;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $qacUser = User::updateOrCreate(
            ['username' => 'qac.admin@pup.edu.ph'],
            [
                'name' => 'QAC Administrator',
                'email' => 'qac.admin@pup.edu.ph',
                'password' => Hash::make('password'),
                'role' => 'qac',
                'status' => 'active',
            ],
        );

        QacPersonnel::updateOrCreate(
            ['user_id' => $qacUser->id],
            [
                'name' => 'QAC Administrator',
                'email' => 'qac.admin@pup.edu.ph',
                'is_admin' => true,
            ],
        );

        $facultyUser = User::updateOrCreate(
            ['username' => 'bsit.faculty@pup.edu.ph'],
            [
                'name' => 'BSIT Faculty',
                'email' => 'bsit.faculty@pup.edu.ph',
                'password' => Hash::make('password'),
                'role' => 'faculty',
                'status' => 'active',
            ],
        );

        Faculty::updateOrCreate(
            ['user_id' => $facultyUser->id],
            [
                'name' => 'BSIT Faculty',
                'email' => 'bsit.faculty@pup.edu.ph',
                'phone_number' => '09171234567',
                'academic_program' => 'Bachelor of Science in Information Technology',
            ],
        );

        $accreditorUser = User::updateOrCreate(
            ['username' => 'pedro.delacruz@pup.edu.ph'],
            [
                'name' => 'Dela Cruz, Pedro Juan B.',
                'email' => 'pedro.delacruz@pup.edu.ph',
                'password' => Hash::make('password'),
                'role' => 'accreditor',
                'status' => 'active',
            ],
        );

        Accreditor::updateOrCreate(
            ['user_id' => $accreditorUser->id],
            [
                'name' => 'Dela Cruz, Pedro Juan B.',
                'email' => 'pedro.delacruz@pup.edu.ph',
                'phone_number' => '09176543210',
                'specialization' => 'Information Technology Accreditation',
            ],
        );

        $accreditation = Accreditation::updateOrCreate(
            ['title' => 'BSIT Level IV Accreditation'],
            [
                'status' => 'pending',
                'start_date' => now()->toDateString(),
                'end_date' => now()->addMonths(3)->toDateString(),
            ],
        );

        AccreditationAssignment::updateOrCreate(
            [
                'accreditation_id' => $accreditation->id,
                'assigned_user_id' => $accreditorUser->id,
            ],
            ['assigned_at' => now()],
        );

        $document = Document::updateOrCreate(
            [
                'accreditation_id' => $accreditation->id,
                'file_name' => 'AREA 1.pdf',
            ],
            [
                'uploaded_by' => $facultyUser->id,
                'file_path' => 'documents/accreditations/area-1.pdf',
                'upload_date' => now(),
            ],
        );

        DocumentEvaluation::updateOrCreate(
            [
                'document_id' => $document->id,
                'evaluated_by' => $accreditorUser->id,
            ],
            [
                'status' => 'reviewed',
                'score' => 95,
                'remarks' => 'Document is complete and ready for PSV.',
                'evaluated_at' => now(),
            ],
        );

        Notification::updateOrCreate(
            [
                'user_id' => $facultyUser->id,
                'message' => 'Your AREA 1 document has been evaluated.',
            ],
            ['status' => 'unread'],
        );

        Report::updateOrCreate(
            [
                'report_type' => 'document_evaluation',
                'generated_by' => $qacUser->id,
            ],
            [
                'generated_date' => now(),
                'report_path' => 'reports/document-evaluation-summary.pdf',
            ],
        );

        SystemEvent::updateOrCreate(
            ['title' => 'Accreditation Visit Evaluation'],
            [
                'description' => 'Scheduled accreditation evaluation activity for submitted program documents.',
                'event_date' => now()->addMonth(),
                'created_by' => $qacUser->id,
            ],
        );
    }
}
