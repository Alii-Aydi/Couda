<?php

namespace App\Http\Controllers;

use App\Interfaces\FiscalFileServiceInterface;
use App\Services\StorageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class FiscalFileController extends Controller
{

    protected $fiscalFileService;

    public function __construct(FiscalFileServiceInterface $fiscalFileService)
    {
        $this->fiscalFileService = $fiscalFileService;
    }


    public function list()
    {
        return Inertia::render('Admin/FiscalFiles');
    }

    public function all()
    {
        return response()->json([
            'data' => $this->fiscalFileService->getAllFiles(),
            'status' => 'success',
            'message' => 'Fiscal files retrieved successfully',
        ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
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

        $validated['created_by'] = auth()->id();

        $fiscalFile = $this->fiscalFileService->storeFiscalFile($validated, $request->file('report'));

        return redirect()->route('dashboard')->with('success', 'Fiscal file created successfully!');
    }

    public function edit($id)
    {
        $post = $this->fiscalFileService->findOne($id);

        return Inertia::render('Admin/EditFile', [
            'file' => $post,
        ]);
    }

    public function updateFiscalFile(Request $request, $id)
    {
        $validationRules = [
            'name' => 'required|string|max:255',
            'cin_or_fiscal_number' => 'required|string|max:255',
            'taxation_date' => 'required|date|before_or_equal:today',
            'tax_center' => 'required|string|max:255',
            'tax_amount' => 'required|numeric',
            'theme' => 'required|string|max:255',
            'issuing_organism' => 'required|string|max:255',
            'delivery_date_to_admin' => 'required|date|before_or_equal:today',
            'receipt_date' => 'required|date|before_or_equal:today',
        ];

        if ($request->hasFile('report')) {
            $validationRules['report'] = 'file|mimes:pdf,doc,docx,png,jpg';
        }

        $validatedData = $request->validate($validationRules);

        $fiscalFile = $this->fiscalFileService->update($id, $validatedData, $request->file('report'));

        return redirect()->route('dashboard')->with('success', 'Fiscal file updated successfully!');
    }

    public function archive($id)
    {
        try {
            $this->fiscalFileService->archiveFile($id);

            return response()->json(['sucess' => 'File archived successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to archive file.', 'error' => $e->getMessage()], 500);
        }
    }
}
