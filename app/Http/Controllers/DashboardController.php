<?php

namespace App\Http\Controllers;

use App\Models\Committee;
use App\Models\FiscalFile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $committees = Committee::all();
        $fiscalFiles = FiscalFile::all();

        return Inertia::render('Admin/Dashboard', [
            'committees' => $committees,
            'fiscalFiles' => $fiscalFiles,
        ]);
    }
}
