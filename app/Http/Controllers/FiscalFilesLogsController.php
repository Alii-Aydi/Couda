<?php

namespace App\Http\Controllers;

use App\Interfaces\FiscalFilesLogsServiceInterface;
use App\Models\FiscalFilesLogs;
use App\Services\FiscalFilesLogsService;
use App\Services\StorageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FiscalFilesLogsController extends Controller
{
    protected $fiscalFilesLogsService;

    public function __construct(FiscalFilesLogsServiceInterface $fiscalFilesLogsService)
    {
        $this->fiscalFilesLogsService = $fiscalFilesLogsService;
    }


    public function list()
    {
        return Inertia::render('Admin/FiscalFiles/FiscalFilesLogs');
    }

    public function all()
    {
        return response()->json([
            'data' => $this->fiscalFilesLogsService->getAllLogs(),
            'status' => 'success',
            'message' => 'Fiscal files retrieved successfully',
        ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
    }

    public function show($id)
    {
        $fiscalFile = $this->fiscalFilesLogsService->findOne($id);
        return Inertia::render('Admin/FiscalFiles/Show', [
            'file' => $fiscalFile->load('reports'),
        ]);
    }
}
