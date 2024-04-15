<?php

namespace App\Http\Controllers;

use App\Interfaces\FiscalFileServiceInterface;
use App\Models\Reclamation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ReclamationController extends Controller
{
    protected $fiscalFileService;

    public function __construct(FiscalFileServiceInterface $fiscalFileService)
    {
        $this->fiscalFileService = $fiscalFileService;
    }
    public function store(Request $request)
    {
        $data = $request->input('data');
        $reasons = $request->input('reasons');
        $newReports = $request->input('newReports');

        // Optionally, you can log the data
        Log::info('Reclamation data:', [
            'data' => $data,
            'reasons' => $reasons,
            'newReports' => $newReports,
        ]);

        // You can also return a response or redirect to a different page
        return response()->json(['message' => 'Reclamation stored successfully'], 201);
    }
}
