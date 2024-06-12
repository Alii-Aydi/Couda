<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReclamationRequest;
use App\Interfaces\FiscalFileServiceInterface;
use App\Interfaces\StorageServiceInterface;
use App\Mail\ReclamationLink;
use App\Models\AttRes;
use App\Models\Contact;
use App\Models\Reclamation;
use App\Models\RepoRes;
use App\Models\ResReclamation;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ReclamationController extends Controller
{
    protected $fiscalFileService;
    protected $storageService;

    public function __construct(FiscalFileServiceInterface $fiscalFileService, StorageServiceInterface $storageService)
    {
        $this->fiscalFileService = $fiscalFileService;
        $this->storageService = $storageService;
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

        $token = Str::random(60);

        $reclamation = Reclamation::create([
            'fiscal_file_id' => $request->input('id'),
            'created_by' => auth()->id(),
            'contact_destination' => $request->input('contact'),
            'token' => $token,
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

        Mail::to($request->input('contact'))->send(new ReclamationLink($reclamation));

        return redirect('/dashboard/fiscalFiles/' . $request->input('id'))->with(['success' => 'Reclamation stored successfully'], 201);
    }

    public function showForm($id, Request $request)
    {
        $reclamation = Reclamation::with(['attributesReclamations', 'reportsReclamations'])->findOrFail($id);
        if ($request->query('token') !== $reclamation->token) {
            throw new AuthorizationException('Unauthorized action!');
        }
        return Inertia::render('Admin/FiscalFiles/ReclamationForm', ['reclamation' => $reclamation]);
    }

    public function submitReclamation(ReclamationRequest $request, Reclamation $reclamation)
    {
        if ($request->query('token') !== $reclamation->token) {
            throw new AuthorizationException('Unauthorized action!');
        }

        $validatedData = $request->validated();

        Log::info('rec:', $reclamation->toArray());
        Log::info('data:', $validatedData);

        // Store the resReclamation data
        $resReclamation = ResReclamation::create([
            'reclamation_id' => $reclamation->id,
            'fiscal_file_id' => $reclamation['fiscal_file_id'],
            'sender_contact' => $reclamation['contact_destination']
        ]);

        // Store attributes
        if (!empty($validatedData['att'])) {
            foreach ($validatedData['att'] as $attribute => $value) {
                AttRes::create([
                    'res_reclamation_id' => $resReclamation->id,
                    'attribute' => $attribute,
                    'value' => $value
                ]);
            }
        }

        // Store reports
        if (!empty($validatedData['rep'])) {
            foreach ($validatedData['rep'] as $reportName => $files) {
                foreach ($files as $file) {
                    $filePath = $this->storageService->storeCentralReport($file, "reclamations");
                    Log::critical($reportName);
                    RepoRes::create([
                        'res_reclamation_id' => $resReclamation->id,
                        'report_name' => $reportName,
                        'file_path' => $filePath
                    ]);
                }
            }
        }

        // Log the created resReclamation
        Log::info('ResReclamation created:', $resReclamation->toArray());

        // Return a success response or redirect
        return redirect('/')->with('success', 'Response soumise avec succès');
    }
}
