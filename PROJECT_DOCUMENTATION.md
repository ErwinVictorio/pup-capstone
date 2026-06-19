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

## Frontend Layouts and Components Guide

Main React files are inside:

```text
resources/js
```

Pages are grouped by feature:

```text
resources/js/pages/Public
resources/js/pages/Admin
resources/js/pages/Auth
```

Reusable components are grouped here:

```text
resources/js/components
resources/js/components/layouts
resources/js/components/admin
resources/js/components/ui
```

### Header and Footer Location

Public website header and footer are both located in:

```text
resources/js/components/layouts/PublicLayout.jsx
```

Inside `PublicLayout.jsx`:

- The public navigation/header is the `<header>` near the top of the component.
- The mobile menu is the `<AnimatePresence>` / `<motion.nav>` block after the header.
- The public footer is the `<footer>` near the bottom of the component.
- The public navigation links are controlled by the `links` array:

```jsx
const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about", dropdown: true },
    { label: "Gov. Recognitions", href: "/government-recognitions" },
    { label: "Accreditations", href: "/accreditations" },
];
```

Kapag gusto mong magdagdag ng bagong link sa public header, mag-add lang ng item sa `links` array. Example:

```jsx
{ label: "Contact", href: "/contact" }
```

Kapag gusto mong palitan ang email, contact number, government links, or copyright text sa footer, edit mo ang `<footer>` section sa same file.

Admin header/sidebar are located in:

```text
resources/js/components/layouts/AdminLayout.jsx
```

Inside `AdminLayout.jsx`:

- The admin top header is the fixed `<header>`.
- The desktop sidebar is the fixed `<aside>`.
- The mobile sidebar/menu is inside the `<AnimatePresence>` block.
- The admin sidebar links are controlled by the `navItems` array:

```jsx
const navItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Accreditation Assignment", href: "/admin/accreditation-assignment", icon: ClipboardList },
    { title: "Document Evaluation", href: "/admin/document-evaluation", icon: PenLine },
    { title: "Events", href: "/admin/events", icon: CalendarDays },
    { title: "Profile", href: "/admin/profile", icon: UserCog },
];
```

Kapag gusto mong magdagdag ng admin sidebar page, add ka ng item sa `navItems`, then make sure may matching Laravel route and page component.

### Public Pages

Public pages use `PublicLayout`, kaya automatic na kasama ang public header and footer.

Public page files:

```text
resources/js/pages/Public/Home.jsx
resources/js/pages/Public/About.jsx
resources/js/pages/Public/GovernmentRecognitions.jsx
resources/js/pages/Public/Accreditations.jsx
```

Basic public page pattern:

```jsx
import PublicLayout, { HeroBanner } from "../../components/layouts/PublicLayout";

export default function SamplePublicPage() {
    return (
        <PublicLayout title="Page Title">
            <HeroBanner title="Page Heading" />

            <section className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
                Page content here
            </section>
        </PublicLayout>
    );
}
```

Use `HeroBanner` kapag kailangan ng malaking banner sa taas ng public page.

```jsx
<HeroBanner title="About QAC" />
```

Optional custom image:

```jsx
<HeroBanner title="Accreditations" image="/qac-assets/landing-page.png" />
```

### Admin Pages

Admin pages use `AdminLayout`, kaya automatic na kasama ang admin top header, sidebar, mobile menu, profile link, notification button, and logout button.

Admin page files:

```text
resources/js/pages/Admin/Dashboard.jsx
resources/js/pages/Admin/AccreditationAssignment.jsx
resources/js/pages/Admin/DocumentEvaluation.jsx
resources/js/pages/Admin/Events.jsx
resources/js/pages/Admin/Profile.jsx
```

Basic admin page pattern:

```jsx
import AdminLayout from "../../components/layouts/AdminLayout";

export default function SampleAdminPage() {
    return (
        <AdminLayout title="Admin Page Title">
            <div className="mx-auto max-w-[1084px] space-y-6 lg:mt-6">
                Page content here
            </div>
        </AdminLayout>
    );
}
```

Use `SummaryCard` for dashboard/stat cards:

```jsx
import { FileCheck2 } from "lucide-react";
import SummaryCard from "../../components/layouts/SummaryCard";

<SummaryCard
    icon={FileCheck2}
    value="89%"
    label="Document Completion"
    trend="+6%"
    footer="Current cycle"
/>
```

Available `SummaryCard` props:

- `icon` - lucide icon component
- `label` - card label
- `value` - main value/count
- `tone` - color style: `maroon`, `gold`, `green`, `blue`, or `white`
- `trend` - small trend text
- `trendDirection` - `up` or `down`
- `description` - optional description text
- `footer` - optional footer text

### Auth Pages

Auth pages are located here:

```text
resources/js/pages/Auth/Login.jsx
resources/js/pages/Auth/Register.jsx
```

Login and register currently use their own layout instead of `PublicLayout` or `AdminLayout`. They directly import shared UI components like `Button`, `Card`, `Input`, and `Label`.

Example:

```jsx
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
```

### Shared Components

Common reusable components:

| Component | File | Purpose |
| --- | --- | --- |
| `QacLogo` | `resources/js/components/QacLogo.jsx` | PUP QAC logo used in public/admin/auth pages |
| `Reveal` | `resources/js/components/Motion.jsx` | Fade-up animation when section enters viewport |
| `Stagger` | `resources/js/components/Motion.jsx` | Parent wrapper for staggered child animations |
| `StaggerItem` | `resources/js/components/Motion.jsx` | Child item used inside `Stagger` |
| `PublicLayout` | `resources/js/components/layouts/PublicLayout.jsx` | Public page layout with header and footer |
| `HeroBanner` | `resources/js/components/layouts/PublicLayout.jsx` | Public page hero banner |
| `AdminLayout` | `resources/js/components/layouts/AdminLayout.jsx` | Admin page layout with header/sidebar |
| `SummaryCard` | `resources/js/components/layouts/SummaryCard.jsx` | Dashboard/stat card |
| `AdminModal` | `resources/js/components/admin/AdminModal.jsx` | Reusable admin modal |
| `UploadDropzone` | `resources/js/components/admin/UploadDropzone.jsx` | Drag-and-drop file input |

Use `QacLogo` like this:

```jsx
import QacLogo from "../../components/QacLogo";

<QacLogo />
<QacLogo light />
<QacLogo compact light />
```

Use motion helpers like this:

```jsx
import { Reveal, Stagger, StaggerItem } from "../../components/Motion";

<Reveal as="section" className="px-6 py-12">
    <h1>Animated section</h1>
</Reveal>

<Stagger className="grid gap-5 sm:grid-cols-2">
    <StaggerItem>First item</StaggerItem>
    <StaggerItem>Second item</StaggerItem>
</Stagger>
```

Use `AdminModal` like this:

```jsx
import { useState } from "react";
import AdminModal from "../../components/admin/AdminModal";

const [open, setOpen] = useState(false);

<AdminModal
    open={open}
    title="Modal Title"
    description="Optional modal description"
    onClose={() => setOpen(false)}
    footer={<button type="button">Save</button>}
>
    Modal content here
</AdminModal>
```

Use `UploadDropzone` like this:

```jsx
import UploadDropzone from "../../components/admin/UploadDropzone";

<UploadDropzone
    accept=".pdf,.doc,.docx"
    onFileChange={(file) => {
        console.log(file);
    }}
/>
```

### UI Components

shadcn-style UI components are stored in:

```text
resources/js/components/ui
```

Current UI components include:

```text
button.jsx
card.jsx
input.jsx
label.jsx
sonner.jsx
```

Import examples:

```jsx
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
```

Use these components kapag gumagawa ng forms, cards, buttons, and other repeated UI patterns.

### Adding a New Page

Steps para mag-add ng bagong page:

1. Create the React page inside the correct folder.

Public page:

```text
resources/js/pages/Public/Contact.jsx
```

Admin page:

```text
resources/js/pages/Admin/Reports.jsx
```

2. Wrap the page with the correct layout.

Use `PublicLayout` for public pages:

```jsx
import PublicLayout from "../../components/layouts/PublicLayout";
```

Use `AdminLayout` for admin pages:

```jsx
import AdminLayout from "../../components/layouts/AdminLayout";
```

3. Add or update the Laravel route in:

```text
routes/web.php
```

4. If the page should appear in navigation, update:

Public nav:

```text
resources/js/components/layouts/PublicLayout.jsx
```

Admin nav:

```text
resources/js/components/layouts/AdminLayout.jsx
```

5. Reuse existing components first before creating a new component.

For public pages, usually use:

```jsx
PublicLayout
HeroBanner
Reveal
Stagger
StaggerItem
QacLogo
```

For admin pages, usually use:

```jsx
AdminLayout
SummaryCard
AdminModal
UploadDropzone
Reveal
Stagger
StaggerItem
```

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
