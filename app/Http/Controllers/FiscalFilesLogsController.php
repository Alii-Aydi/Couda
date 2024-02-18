<?php

namespace App\Http\Controllers;

use App\Models\FiscalFilesLogs;
use App\Services\FiscalFilesLogsService;
use App\Services\StorageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FiscalFilesLogsController extends Controller
{
    protected $fiscalFilesLogsService;

    public function __construct(FiscalFilesLogsService $fiscalFilesLogsService)
    {
        $this->fiscalFilesLogsService = $fiscalFilesLogsService;
    }


    public function list()
    {
        return Inertia::render('Admin/FiscalFilesLogs');
    }

    public function all()
    {
        return response()->json([
            'data' => $this->fiscalFilesLogsService->getAllLogs(),
            'status' => 'success',
            'message' => 'Fiscal files retrieved successfully',
        ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
    }
}
