<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReclamationRequest;
use App\Interfaces\FiscalFileServiceInterface;
use App\Models\Contact;
use App\Models\Reclamation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ReclamationController extends Controller
{
    protected $fiscalFileService;

    public function __construct(FiscalFileServiceInterface $fiscalFileService)
    {
        $this->fiscalFileService = $fiscalFileService;
    }

    public function create($id)
    {
        $file = $this->fiscalFileService->findOne($id);
        $contacts = Contact::all();
        return Inertia::render('Admin/FiscalFiles/MakeReclamation', ["file" => $file, "contacts" => $contacts]);
    }
    public function store(Request $request)
    {
        $reasons = $request->input('reasons');
        $newReports = $request->input('newReports');

        if (empty($reasons) && empty($newReports)) {
            // Flash a message indicating that the reclamation is empty
            return redirect()->back()->with('error', 'La récupération est vide. Veuillez fournir des raisons ou des rapports.');
        }

        $reclamation = Reclamation::create([
            'fiscal_file_id' => $request->input('id'),
            'created_by' => auth()->id(),
            'contact_destination' => $request->input('contact'),
        ]);


        foreach ($reasons as $attribute => $reason) {
            $reclamation->attributesReclamations()->create([
                'attribute' => $attribute,
                'reason' => $reason,
            ]);
        }

        foreach ($newReports as $newReport) {
            $reclamation->reportsReclamations()->create([
                'name' => $newReport['name'],
                'description' => $newReport['description'],
            ]);
        }

        return redirect('/dashboard/fiscalFiles/' . $request->input('id'))->with(['success' => 'Reclamation stored successfully'], 201);
    }

    public function showForm($id)
    {
        $reclamation = Reclamation::with(['attributesReclamations', 'reportsReclamations'])->findOrFail($id);
        return Inertia::render('Admin/FiscalFiles/ReclamationForm', ['reclamation' => $reclamation]);
    }

    public function submitReclamation(ReclamationRequest $request, Reclamation $reclamation)
    {
        $validated = $request->validated();

        Log::alert($validated);
    }
}
