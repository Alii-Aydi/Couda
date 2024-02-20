<?php

namespace App\Interfaces;

interface FiscalFilesLogsServiceInterface
{
    public function getAllLogs();
    public function storeFiscalFileLog($fiscalFile, $action);
}
