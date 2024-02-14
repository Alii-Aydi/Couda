<?php

namespace App\Http\Controllers;

use App\Models\FiscalFile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FiscalFileController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'cin_or_fiscal_number' => 'required|string|max:255',
            'taxation_date' => 'required|date',
            'tax_center' => 'required|string|max:255',
            'tax_amount' => 'required|numeric',
            'theme' => 'required|string|max:255',
            'issuing_organism' => 'required|string|max:255',
            'delivery_date_to_admin' => 'required|date',
            'receipt_date' => 'required|date',
            'report' => 'required|file|mimes:pdf,doc,docx',
        ]);

        $fiscalFile = FiscalFile::create($validated);

        return redirect()->route('dashboard')->with('message', 'Fiscal file created successfully!');
    }

    public function create(): Response
    {
        return Inertia::render('Admin/CreateFile');
    }
}
