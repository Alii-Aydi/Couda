<?php

namespace App\Services;

use App\Models\FiscalFilesLogs;
use App\Interfaces\FiscalFilesLogsServiceInterface;
use App\Interfaces\StorageServiceInterface;
use Illuminate\Support\Facades\Log;

class FiscalFilesLogsService implements FiscalFilesLogsServiceInterface
{
    protected $storageService;

    public function __construct(StorageServiceInterface $storageService)
    {
        $this->storageService = $storageService;
    }


    public function getAllLogs()
    {
        $files = FiscalFilesLogs::orderBy('updated_at', 'desc')->get();
        return $files;
    }


    public function storeFiscalFileLog($fiscalFile, $action)
    {
        $userId = auth()->id();

        $fiscalFileLog = FiscalFilesLogs::create([
            'fiscal_file_id' => $fiscalFile->id,
            'name' => $fiscalFile->name,
            'cin_or_fiscal_number' => $fiscalFile->cin_or_fiscal_number,
            'taxation_date' => $fiscalFile->taxation_date,
            'tax_center' => $fiscalFile->tax_center,
            'tax_amount' => $fiscalFile->tax_amount,
            'theme' => $fiscalFile->theme,
            'issuing_organism' => $fiscalFile->issuing_organism,
            'delivery_date_to_admin' => $fiscalFile->delivery_date_to_admin,
            'receipt_date' => $fiscalFile->receipt_date,
            'updated_by' => $userId,
            'actions' => $action,
            'status' => $fiscalFile->status
        ]);

        // Get the IDs of the old reports associated with the fiscal file
        $oldReportIds = $fiscalFile->reports->pluck('id')->toArray();

        // Attach the old reports to the newly created fiscal file log
        $fiscalFileLog->reports()->sync($oldReportIds);

        return $fiscalFileLog;
    }
}
