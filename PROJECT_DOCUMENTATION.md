# PUP Quality Assurance Center Website

## Overview

This project is a Laravel 12 and React/Inertia application for the Polytechnic University of the Philippines Quality Assurance Center. It supports public QAC pages, account registration/login, and an admin dashboard for accreditation-related workflows.

## Technology Stack

- Backend: Laravel 12, PHP 8.2+
- Frontend: React, Inertia.js, Vite
- Styling/UI: Tailwind CSS, shadcn-style components, lucide-react icons
- Database: MySQL/MariaDB for local development
- Testing: Pest/PHPUnit

## Main Features

- Public QAC website pages
- Login and registration
- Registration domain whitelist
- Admin dashboard
- Accreditation assignment page
- Document evaluation page
- Events page
- ERD-based database migrations and Eloquent relationships

## Public Routes

| Method | URL | Page |
| --- | --- | --- |
| GET | `/` | Public home page |
| GET | `/about` | About QAC page |
| GET | `/government-recognitions` | Government recognitions page |
| GET | `/accreditations` | Accreditations page |
| GET | `/login` | Login page |
| GET | `/register` | Register page |

## Auth Routes

| Method | URL | Purpose |
| --- | --- | --- |
| POST | `/login` | Login user |
| POST | `/register` | Register user |
| POST | `/logout` | Logout user |

## Protected Admin Routes

These routes require an authenticated user.

| Method | URL | Page |
| --- | --- | --- |
| GET | `/dashboard` | Admin dashboard |
| GET | `/admin/accreditation-assignment` | Accreditation assignment |
| GET | `/admin/document-evaluation` | Document evaluation |
| GET | `/admin/events` | Events management |
| GET | `/admin/profile` | User profile page |
| POST | `/admin/profile/avatar` | Upload/update avatar |
| PUT | `/admin/profile/password` | Update password |

## Registration Rule

Only approved email domains can register.
The `users.username` value is the user's approved PUP email address and is used for login.

Configuration file:

```text
config/qac.php
```

Current allowed domains:

```php
'pup.edu.ph',
'iskolarngbayan.pup.edu.ph',
```

To add another allowed domain, edit:

```php
'registration_email_domains' => [
    'pup.edu.ph',
    'iskolarngbayan.pup.edu.ph',
    'example.edu.ph',
],
```

## Database Tables

The database schema follows the provided ERD.

### Users

Migration:

```text
database/migrations/0001_01_01_000000_create_users_table.php
```

Main fields:

- `id`
- `username` - stores the approved PUP email used for login
- `name`
- `email`
- `password`
- `role`
- `status`
- `avatar_path`

### Faculty

Migration:

```text
database/migrations/2026_06_17_000002_create_qac_reference_tables.php
```

Fields:

- `id`
- `user_id`
- `name`
- `email`
- `phone_number`
- `academic_program`

Relationship:

- `faculty.user_id` belongs to `users.id`

### QAC Personnel

Fields:

- `id`
- `user_id`
- `name`
- `email`
- `is_admin`

Relationship:

- `qac_personnel.user_id` belongs to `users.id`

### Accreditors

Fields:

- `id`
- `user_id`
- `name`
- `email`
- `phone_number`
- `specialization`

Relationship:

- `accreditors.user_id` belongs to `users.id`

### Reports

Fields:

- `id`
- `report_type`
- `generated_by`
- `generated_date`
- `report_path`

Relationship:

- `reports.generated_by` belongs to `users.id`

### System Events

Fields:

- `id`
- `title`
- `description`
- `event_date`
- `created_by`

Relationship:

- `system_events.created_by` belongs to `users.id`

### Accreditations

Migration:

```text
database/migrations/2026_06_17_000003_create_qac_accreditation_tables.php
```

Fields:

- `id`
- `title`
- `status`
- `start_date`
- `end_date`

### Accreditation Assignments

Fields:

- `id`
- `accreditation_id`
- `assigned_user_id`
- `assigned_at`

Relationships:

- `accreditation_assignments.accreditation_id` belongs to `accreditations.id`
- `accreditation_assignments.assigned_user_id` belongs to `users.id`

### Documents

Fields:

- `id`
- `accreditation_id`
- `uploaded_by`
- `file_name`
- `file_path`
- `upload_date`

Relationships:

- `documents.accreditation_id` belongs to `accreditations.id`
- `documents.uploaded_by` belongs to `users.id`

### Document Evaluations

Fields:

- `id`
- `document_id`
- `evaluated_by`
- `status`
- `score`
- `remarks`
- `evaluated_at`

Relationships:

- `document_evaluations.document_id` belongs to `documents.id`
- `document_evaluations.evaluated_by` belongs to `users.id`

### Notifications

Fields:

- `id`
- `user_id`
- `message`
- `status`

Relationship:

- `notifications.user_id` belongs to `users.id`

## Eloquent Models

Main models:

- `App\Models\User`
- `App\Models\Faculty`
- `App\Models\QacPersonnel`
- `App\Models\Accreditor`
- `App\Models\Accreditation`
- `App\Models\AccreditationAssignment`
- `App\Models\Document`
- `App\Models\DocumentEvaluation`
- `App\Models\Notification`
- `App\Models\Report`
- `App\Models\SystemEvent`

## Key Relationships

- `User hasOne Faculty`
- `User hasOne QacPersonnel`
- `User hasOne Accreditor`
- `User hasMany AccreditationAssignment`
- `User hasMany Document`
- `User hasMany DocumentEvaluation`
- `User hasMany Notification`
- `User hasMany Report`
- `User hasMany SystemEvent`
- `Accreditation hasMany AccreditationAssignment`
- `Accreditation hasMany Document`
- `Document hasMany DocumentEvaluation`
- `Document belongsTo Accreditation`
- `Document belongsTo User` as uploader
- `DocumentEvaluation belongsTo Document`
- `DocumentEvaluation belongsTo User` as evaluator

## Setup

Install PHP dependencies:

```bash
composer install
```

Install frontend dependencies:

```bash
npm install
```

Copy environment file:

```bash
copy .env.example .env
```

Generate app key:

```bash
php artisan key:generate
```

Run migrations and seeders:

```bash
php artisan migrate:fresh --seed
```

Start the Laravel server:

```bash
php artisan serve
```

Start Vite:

```bash
npm run dev
```

## Default Seed Accounts

After running seeders, these accounts are available:

| Role | Username / Login Email | Email | Password |
| --- | --- | --- | --- |
| QAC Personnel | `qac.admin@pup.edu.ph` | `qac.admin@pup.edu.ph` | `password` |
| Faculty | `bsit.faculty@pup.edu.ph` | `bsit.faculty@pup.edu.ph` | `password` |
| Accreditor | `pedro.delacruz@pup.edu.ph` | `pedro.delacruz@pup.edu.ph` | `password` |

## Useful Commands

Run tests:

```bash
php artisan test
```

Show routes:

```bash
php artisan route:list
```

Format PHP files:

```bash
vendor/bin/pint
```

Build frontend assets:

```bash
npm run build
```

## Notes

- Use `migrate:fresh --seed` only on a local or disposable database because it deletes existing tables and data.
- Public pages are available without login.
- Admin pages require authentication.
- Registration is restricted to configured email domains in `config/qac.php`.
- Profile avatars are stored on the `public` disk under `storage/app/public/avatars`.
- Run `php artisan storage:link` if uploaded avatars do not appear in the browser.
