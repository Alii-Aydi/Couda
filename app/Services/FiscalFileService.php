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


    public function storeFiscalFile($validatedData, $reportFiles = [])
    {
        $fiscalFile = FiscalFile::create($validatedData);
        if ($reportFiles) {
            foreach ($reportFiles as $reportFile) {
                $reportPath = $this->storageService->storeCentralReport($reportFile, $validatedData['cin_or_fiscal_number']);
                $fiscalFile->reports()->create(['file_path' => $reportPath, 'desc' => $reportFile->getClientOriginalName()]);
            }
        }

        return $fiscalFile;
    }


    public function getAllFiles()
    {
        $fiscalFiles = FiscalFile::with('reports') // Eager load center reports
            ->where('archived', false)
            ->orderBy('created_at', 'desc')
            ->get();
        return $fiscalFiles;
    }


    public function getAllArchived()
    {
        $fiscalFiles = FiscalFile::with('reports') // Eager load center reports
            ->where('archived', true)
            ->orderBy('created_at', 'desc')
            ->get();
        return $fiscalFiles;
    }

    public function findOne($id)
    {
        return FiscalFile::with('reports')->findOrFail($id);
    }

    public function update($id, $validatedData, $reportFiles = [], $deletedFiles = [])
    {
        $fiscalFile = $this->findOne($id);

        $this->fiscalFilesLogsService->storeFiscalFileLog($fiscalFile, 'Modifiée');

        if ($reportFiles) {
            Log::alert($reportFiles);
            foreach ($reportFiles as $reportFile) {
                $reportPath = $this->storageService->storeCentralReport($reportFile, $validatedData['cin_or_fiscal_number']);
                $fiscalFile->reports()->create(['file_path' => $reportPath, 'desc' => $reportFile->getClientOriginalName()]);
            }
        }

        if ($deletedFiles) {
            foreach ($deletedFiles as $deletedFile) {
                $fiscalFile->reports()->where('id', $deletedFile['id'])->update(['fiscal_file_id' => null]);
            }
        }

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
