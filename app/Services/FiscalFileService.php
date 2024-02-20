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
        $fiscalFiles = FiscalFile::where('archived', false)->get();
        return $fiscalFiles;
    }

    public function getAllArchived()
    {
        $fiscalFiles = FiscalFile::where('archived', true)->get();
        return $fiscalFiles;
    }

    public function findOne($id)
    {
        return FiscalFile::findOrFail($id);
    }

    public function update($id, $validatedData, $reportFile = null)
    {
        $fiscalFile = $this->findOne($id);

        $this->fiscalFilesLogsService->storeFiscalFileLog($fiscalFile, 'Modifiée');

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

            $log = $this->fiscalFilesLogsService->storeFiscalFileLog($fiscalFile, 'Archivée');
            $fiscalFile->archived = true;
            $fiscalFile->save();
            DB::commit();

            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function restoreFile($fileId)
    {
        $fiscalFile = $this->findOne($fileId);

        DB::beginTransaction();
        try {

            $log = $this->fiscalFilesLogsService->storeFiscalFileLog($fiscalFile, 'Restorée');
            $fiscalFile->archived = false;
            $fiscalFile->save();
            DB::commit();

            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
