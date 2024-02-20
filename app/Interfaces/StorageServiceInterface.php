<?php

namespace App\Interfaces;

interface StorageServiceInterface
{
    public function storeCentralReport($reportFile, $cin);
    public function getCentralReport($filename);
}
