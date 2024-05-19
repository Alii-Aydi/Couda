<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Signature;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Log;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */

    public function create(): Response
    {
        $roles = Role::all(); // Fetch all roles from the database

        return Inertia::render('Auth/Register', [
            'roles' => $roles // Pass roles to the view
        ]);
    }


    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => [
                'required',
                'string',
                Rule::in(['admin', 'member', 'secretary', 'dossier manager']),
            ],
            'profile_pic' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'cin' => 'required|string|max:255',
            'signature' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'cin' => $request->cin,
        ]);
        $user->assignRole($request->role);

        if ($request->hasFile('profile_pic')) {
            $profilePic = $request->file('profile_pic');
            $cin = str_replace(' ', '_', $user->cin);
            $profilePicPath = Storage::put('private/users/' . $cin, $profilePic);
            $user->profile_pic = $profilePicPath;
            $user->save();
        }

        if ($request->hasFile('signature')) {

            $signatureFile = $request->file('signature');
            $signaturePath = Storage::put('private/signatures/' . $user->id, $signatureFile);

            $user->signature_path = $signaturePath;
            $user->save();
        }


        event(new Registered($user));

        return redirect()->route('setting.users')->with('success', 'User created successfully');
    }
}
