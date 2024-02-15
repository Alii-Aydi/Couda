<?php

namespace App\Http\Controllers;

use App\Services\StorageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class StorageController extends Controller
{
    protected $storageService;

    public function __construct(StorageService $storageService)
    {
        $this->storageService = $storageService;
    }


    public function showCentralReport($filename)
    {
        $file = $this->storageService->getCentralReport($filename);
        $path = $file['path'];
        $fileContent = $file['fileContent'];
        $mimeType = $file['mimeType'];


        return response($fileContent, \Symfony\Component\HttpFoundation\Response::HTTP_OK)
            ->header('Content-Type', $mimeType)
            ->header('Content-Disposition', 'inline; filename="' . basename($path) . '"');
    }
}
