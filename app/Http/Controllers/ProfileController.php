<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function show(Request $request): Response
    {
        return Inertia::render('Admin/Profile', [
            'profile' => [
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'username' => $request->user()->username,
                'role' => $request->user()->role,
                'status' => $request->user()->status,
                'avatar_url' => $request->user()->avatar_path
                    ? Storage::disk('public')->url($request->user()->avatar_path)
                    : null,
            ],
        ]);
    }

    public function updateAvatar(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $user = $request->user();

        if ($user->avatar_path) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        $user->forceFill([
            'avatar_path' => $validated['avatar']->store('avatars', 'public'),
        ])->save();

        return back()->with('success', 'Avatar updated successfully.');
    }

    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::min(8)],
        ]);

        $request->user()->forceFill([
            'password' => Hash::make($validated['password']),
        ])->save();

        return back()->with('success', 'Password updated successfully.');
    }
}
