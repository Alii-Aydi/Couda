<?php

namespace App\Http\Controllers;

use App\Models\FiscalFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class FiscalFileController extends Controller
{
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

        if ($request->hasFile('report')) {
            $file = $request->file('report');
            $filename = time() . '_' . $file->getClientOriginalName();
            $filePath = 'private/reports/centre_report/' . $validated['cin_or_fiscal_number'] . '/' . $filename;
            Storage::put($filePath, file_get_contents($file));

            // Add file path to validated data if you want to store it in the database
            $validated['report'] = $filePath;
        }

        $fiscalFile = FiscalFile::create($validated);

        return redirect()->route('dashboard')->with('message', 'Fiscal file created successfully!');
    }

    public function create(): Response
    {
        return Inertia::render('Admin/CreateFile');
    }
}
