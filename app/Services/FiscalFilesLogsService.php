<?php

namespace App\Services;

use App\Models\FiscalFilesLogs;
use App\Services\StorageService;
use Illuminate\Http\Request;

class FiscalFilesLogsService
{
    protected $storageService;

    public function __construct(StorageService $storageService)
    {
        $this->storageService = $storageService;
    }


    public function storeFiscalFileLog($fiscalFile)
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
            'report' => $fiscalFile->report,
            'updated_by' => $userId,
        ]);

        return $fiscalFileLog;
    }
}
