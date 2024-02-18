<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class StorageService
{
    public function storeCentralReport($reportFile, $cin)
    {
        if ($reportFile) {
            $filename = time() . '_' . $reportFile->getClientOriginalName();
            $filePath = 'private/reports/centre_report/' . $cin . '/' . $filename;
            Storage::put($filePath, file_get_contents($reportFile));

            return $filePath;
        }
        return "none";
    }

    public function getCentralReport($filename)
    {
        $path = str_replace(' ', '/', $filename);

        if (!Storage::exists($path)) {
            abort(404);
        }

        $fileContent = Storage::get($path);
        $mimeType = Storage::mimeType($path);

        return ['fileContent' => $fileContent, 'mimeType' => $mimeType, 'path' => $path];
    }
}
