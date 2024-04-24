<?php

namespace App\Http\Controllers;

use App\Models\Committee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AgendaController extends Controller
{
    public function show()
    {
        return Inertia::render('Admin/Agenda/AgendaCalander');
    }

    public function addCommitee(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|string|date',
            'time' => 'required|string',
            'title' => 'required|string|max:255',
            'members' => 'required|array|min:1',
            'members.*' => 'required|integer',
        ]);

        $committee = Committee::create([
            'date' => $validated['date'],
            'title' => $validated['title'],
            'time_start' => $validated['time'],
        ]);

        $committee->members()->sync($validated['members']);

        return redirect()->back()->with('success', 'Événement ajouté avec succès');
    }
}
