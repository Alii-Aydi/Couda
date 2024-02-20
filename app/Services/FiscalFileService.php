<?php

namespace App\Services;

use App\Interfaces\FiscalFileServiceInterface;
use App\Interfaces\FiscalFilesLogsServiceInterface;
use App\Interfaces\StorageServiceInterface;
use App\Models\FiscalFile;
use App\Models\FiscalFilesLogs;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FiscalFileService implements FiscalFileServiceInterface
{
    protected $storageService;
    protected $fiscalFilesLogsService;

    public function __construct(StorageServiceInterface $storageService, FiscalFilesLogsServiceInterface $fiscalFilesLogsService)
    {
        $this->storageService = $storageService;
        $this->fiscalFilesLogsService = $fiscalFilesLogsService;
    }


    public function storeFiscalFile($validatedData, $reportFile = null)
    {
        $validatedData['report'] = $this->storageService->storeCentralReport($reportFile, $validatedData['cin_or_fiscal_number']);
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

    public function delete($fiscalFile)
    {
        return $fiscalFile->delete();
    }

    public function archiveFile($fileId)
    {
        $fiscalFile = $this->findOne($fileId);

        DB::beginTransaction();
        try {

            $log = $this->fiscalFilesLogsService->storeFiscalFileLog($fiscalFile);
            Log::alert($log);
            $file = $this->delete($fiscalFile);
            Log::alert($file);
            DB::commit();

            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
