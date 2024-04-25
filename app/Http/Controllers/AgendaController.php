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

    public function list()
    {
        $committees = Committee::all();
        return response()->json($committees);
    }

    public function addCommitee(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|string|date',
            'time' => 'required|string',
            'title' => 'required|string|max:255',
            'members' => 'required|array|min:1',
        ]);

        $committee = Committee::create([
            'date' => $validated['date'],
            'title' => $validated['title'],
            'time_start' => $validated['time'],
        ]);

        $committee->members()->sync($validated['members']);

        return redirect()->route('file.list')->with('info', 'Événement ajouté avec succès, Veuillez selectioner de 6 a 12 dossier pour confirmer la commitee crée. Si pas de dossier selectioner pendant 3j, la commitée crée sera supprimer');
    }
}
