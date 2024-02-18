<?php

namespace App\Services;

use App\Models\FiscalFile;
use App\Models\FiscalFilesLogs;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FiscalFileService
{
    protected $storageService;
    protected $fiscalFilesLogsService;

    public function __construct(StorageService $storageService, FiscalFilesLogsService $fiscalFilesLogsService)
    {
        $this->storageService = $storageService;
        $this->fiscalFilesLogsService = $fiscalFilesLogsService;
    }


    public function storeFiscalFile($validatedData, $reportFile = null)
    {
        $validatedData['report'] = $this->storageService->storeCentralReport($reportFile, $validatedData['cin_or_fiscal_number']);
        Log::alert($validatedData['created_by']);
        return FiscalFile::create($validatedData);
    }
    public function getAllFiles()
    {
        $files = FiscalFile::all();
        return $files;
    }

    public function findOne($id)
    {
        return FiscalFile::findOrFail($id);
    }

    public function update($id, $validatedData, $reportFile = null)
    {
        $fiscalFile = $this->findOne($id);

        $this->fiscalFilesLogsService->storeFiscalFileLog($fiscalFile);

        $validatedData['report'] = $this->storageService->storeCentralReport($reportFile, $validatedData['cin_or_fiscal_number']);

        return $fiscalFile->update($validatedData);
    }
}
