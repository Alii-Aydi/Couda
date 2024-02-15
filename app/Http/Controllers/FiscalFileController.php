<?php

namespace App\Http\Controllers;

use App\Services\FiscalFileService;
use App\Services\StorageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class FiscalFileController extends Controller
{

    protected $fiscalFileService;

    public function __construct(FiscalFileService $fiscalFileService)
    {
        $this->fiscalFileService = $fiscalFileService;
    }



    public function create(): Response
    {
        return Inertia::render('Admin/CreateFile');
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'cin_or_fiscal_number' => 'required|string|max:255',
            'taxation_date' => 'required|date|before_or_equal:today',
            'tax_center' => 'required|string|max:255',
            'tax_amount' => 'required|numeric',
            'theme' => 'required|string|max:255',
            'issuing_organism' => 'required|string|max:255',
            'delivery_date_to_admin' => 'required|date|before_or_equal:today',
            'receipt_date' => 'required|date|before_or_equal:today',
            'report' => 'required|file|mimes:pdf,doc,docx,png,jpg',
        ]);

        $fiscalFile = $this->fiscalFileService->storeFiscalFile($validated, $request->file('report'));

        return redirect()->route('dashboard')->with('message', 'Fiscal file created successfully!');
    }

    public function all()
    {
        return response()->json([
            'data' => $this->fiscalFileService->getAllFiles(),
            'status' => 'success',
            'message' => 'Fiscal files retrieved successfully',
        ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
    }
}
