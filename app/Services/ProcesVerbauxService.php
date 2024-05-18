<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;

class ProcesVerbauxService
{
    public static function generatePDF($pvData)
    {
        $pdf = PDF::loadView('ProcesVerbauxPDF', $pvData);

        $pdfPath = 'proces-verbaux/' . uniqid() . '.pdf';
        Storage::disk('private')->put($pdfPath, $pdf->output());

        return 'private/' . $pdfPath;
    }
}
