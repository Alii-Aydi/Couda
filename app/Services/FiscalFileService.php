<?php

namespace App\Services;

use App\Models\FiscalFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FiscalFileService
{

    protected $storageService;

    public function __construct(StorageService $storageService)
    {
        $this->storageService = $storageService;
    }


    public function storeFiscalFile($validatedData, $reportFile = null)
    {
        if ($reportFile) {
            $filename = time() . '_' . $reportFile->getClientOriginalName();
            $filePath = 'private/reports/centre_report/' . $validatedData['cin_or_fiscal_number'] . '/' . $filename;
            Storage::put($filePath, file_get_contents($reportFile));
            $validatedData['report'] = $this->storageService->storeCentralReport($reportFile, $validatedData['cin_or_fiscal_number']);
        }

        return FiscalFile::create($validatedData);
    }
    public function getAllFiles()
    {
        $files = FiscalFile::all();
        return $files;
    }
}
