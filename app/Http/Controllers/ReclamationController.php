<?php

namespace App\Http\Controllers;

use App\Interfaces\FiscalFileServiceInterface;
use App\Models\Reclamation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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
        return Inertia::render('Admin/FiscalFiles/MakeReclamation', ["file" => $file]);
    }
    public function store(Request $request)
    {
        $reasons = $request->input('reasons');
        $newReports = $request->input('newReports');

        if (empty($reasons) && empty($newReports)) {
            // Flash a message indicating that the reclamation is empty
            return redirect()->back()->with('error', 'Reclamation is empty. Please provide reasons or reports.');
        }

        $reclamation = Reclamation::create([
            'fiscal_file_id' => $request->input('id'),
            'created_by' => auth()->id(),
            'contact_destination' => 'random',
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

        return response()->json(['message' => 'Reclamation stored successfully'], 201);
    }
}
