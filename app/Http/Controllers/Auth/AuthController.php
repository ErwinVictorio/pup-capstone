<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Accreditor;
use App\Models\Faculty;
use App\Models\QacPersonnel;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function login(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function storeLogin(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'username' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $remember = $request->boolean('remember');

        if (! Auth::attempt($credentials, $remember)) {
            return back()->withErrors([
                'username' => 'The provided credentials do not match our records.',
            ])->onlyInput('username');
        }

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard'));
    }

    public function register(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function storeRegister(Request $request): RedirectResponse
    {
        $allowedDomains = config('qac.registration_email_domains', []);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => [
                'required',
                'email',
                'max:100',
                'unique:users,email',
                'unique:users,username',
                function (string $attribute, mixed $value, \Closure $fail) use ($allowedDomains): void {
                    $domain = strtolower(str($value)->afterLast('@')->toString());

                    if (! in_array($domain, $allowedDomains, true)) {
                        $fail('Only approved PUP email domains can register.');
                    }
                },
            ],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', Rule::in(['faculty', 'qac', 'accreditor'])],
            'phone_number' => ['nullable', 'string', 'max:15'],
            'academic_program' => ['nullable', 'string', 'max:100'],
            'specialization' => ['nullable', 'string', 'max:100'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'username' => strtolower($validated['email']),
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'status' => 'active',
        ]);

        match ($validated['role']) {
            'faculty' => Faculty::create([
                'user_id' => $user->id,
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone_number' => $validated['phone_number'] ?? null,
                'academic_program' => $validated['academic_program'] ?? null,
            ]),
            'accreditor' => Accreditor::create([
                'user_id' => $user->id,
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone_number' => $validated['phone_number'] ?? null,
                'specialization' => $validated['specialization'] ?? null,
            ]),
            default => QacPersonnel::create([
                'user_id' => $user->id,
                'name' => $validated['name'],
                'email' => $validated['email'],
                'is_admin' => false,
            ]),
        };

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('dashboard');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}
