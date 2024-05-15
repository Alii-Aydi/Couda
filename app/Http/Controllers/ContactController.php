<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return response()->json(['contacts' => $contacts]);
    }

    public function create()
    {
        return Inertia::render('Admin/Settings/Contacts/AddContact');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone1' => [
                'required',
                'string',
                'max:20',
                'regex:/^(\+\d{1,3})?[\s.-]?\(?\d{2,4}\)?[\s.-]?\d{2,4}[\s.-]?\d{2,4}$/',
            ],
            'phone2' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^(\+\d{1,3})?[\s.-]?\(?\d{2,4}\)?[\s.-]?\d{2,4}[\s.-]?\d{2,4}$/',
            ],
            'location' => 'required|string|max:255',
        ]);

        $contact = Contact::create($validatedData);

        // Redirect the user to the index page with a success message
        return redirect()->route('setting.infra')->with('success', 'Contact ajouter avec success.');
    }

    public function destroy(Contact $contact)
    {
        try {
            $i = $contact->delete();
            Log::alert($i);
            return response()->json(['message' => 'Contact deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete contact'], 500);
        }
    }

    public function edit(Contact $contact)
    {
        return Inertia::render('Admin/Settings/Contacts/Edit', [
            'contact' => $contact->only('id', 'name', 'email', 'phone1', 'phone2', 'location'),
        ]);
    }

    public function update(Request $request, Contact $contact)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone1' => 'required|string|max:20',
            'phone2' => 'nullable|string|max:20',
            'location' => 'required|string|max:255',
        ]);

        $contact->update($validatedData);

        // Redirect the user to the index page with a success message
        return redirect()->route('setting.infra')->with('success', 'Mis a jour contact avec succée');
    }
}
