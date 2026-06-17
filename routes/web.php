<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Public/Home')->name('home');
Route::inertia('/about', 'Public/About')->name('about');
Route::inertia('/government-recognitions', 'Public/GovernmentRecognitions')->name('government-recognitions');
Route::inertia('/accreditations', 'Public/Accreditations')->name('accreditations');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'storeLogin'])->name('login.store');
    Route::get('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/register', [AuthController::class, 'storeRegister'])->name('register.store');
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

Route::middleware('auth')->group(function () {
    Route::inertia('/dashboard', 'Admin/Dashboard')->name('dashboard');
    Route::inertia('/admin/accreditation-assignment', 'Admin/AccreditationAssignment')->name('admin.accreditation-assignment');
    Route::inertia('/admin/document-evaluation', 'Admin/DocumentEvaluation')->name('admin.document-evaluation');
    Route::inertia('/admin/events', 'Admin/Events')->name('admin.events');
    Route::get('/admin/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::post('/admin/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar');
    Route::put('/admin/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');
});
