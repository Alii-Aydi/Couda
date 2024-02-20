<?php

namespace App\Interfaces;

interface FiscalFileServiceInterface
{
    public function getAllFiles();
    public function getAllArchived();
    public function storeFiscalFile($validatedData, $reportFile = null);
    public function findOne($id);
    public function update($id, $validatedData, $reportFile = null);
    public function archiveFile($id);
    public function restoreFile($id);
}
