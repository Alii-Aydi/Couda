<?php

namespace App\Http\Controllers;

use App\Interfaces\FiscalFileServiceInterface;
use App\Models\Committee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AgendaController extends Controller
{
    protected $fiscalFileService;

    public function __construct(FiscalFileServiceInterface $fiscalFileService)
    {
        $this->fiscalFileService = $fiscalFileService;
    }


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

        return redirect()->route('file.list')->with([
            'info' => 'Événement ajouté avec succès, Veuillez selectioner de 6 a 12 dossier pour confirmer la commitee crée. Si pas de dossier selectioner pendant 3j, la commitée crée sera supprimer',
            'selected' => true,
        ]);
    }

    public function attachFiscalFileToCommitee($commiteeID, $fiscalFileId)
    {
        $fiscalFile = $this->fiscalFileService->findOne($fiscalFileId);
        $commitee = Committee::findOrFail($commiteeID);

        $commitee->fiscalFiles()->attach($fiscalFileId);
        $fiscalFile->update(['status' => 'selected']);
        $commitee->update(['status' => 'confirmed']);

        $message = 'Dossiers selectionees';
        Session::flash('success', $message);

        return redirect()->route('makepv', ['id' => $commiteeID])->with(['success' => $message]);
    }

    public function showMakePV($commiteeId)
    {
        $committee = Committee::with('members', 'fiscalFiles.reports')->findOrFail($commiteeId);

        Log::alert($committee);

        return Inertia::render('Admin/ProcesVerbal/CreatePV', [
            'committee' => $committee,
        ]);
    }

    public function storePV($commiteeId, Request $request)
    {
        $committee = Committee::findOrFail($commiteeId);

        return response()->json('ok');
    }
}
