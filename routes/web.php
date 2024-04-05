<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\{
    FiscalFileController,
    FiscalFilesLogsController,
    ProfileController,
    StorageController,
    UserController
};

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::get('/dashboard/makepv', function () {
        return Inertia::render('Admin/ProcesVerbal/CreatePV');
    })->name('makepv');

    // Profile
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // Fiscal Files
    Route::prefix('dashboard')->group(function () {
        Route::get('/createFile', [FiscalFileController::class, 'create'])->name('file.create');
        Route::post('/createFile', [FiscalFileController::class, 'store'])->name('file.store');
        Route::get('/fiscalFiles', [FiscalFileController::class, 'all'])->name('file.all');
        Route::get('/ArchivedfiscalFiles', [FiscalFileController::class, 'allArchived'])->name('file.allArchived');
        Route::get('/fiscalFilesList', [FiscalFileController::class, 'list'])->name('file.list');
        Route::get('/fiscalFiles/edit/{id}', [FiscalFileController::class, 'edit'])->name('edit.record');
        Route::put('/fiscalFiles/edit/{id}', [FiscalFileController::class, 'updateFiscalFile'])->name('update.record');
        Route::post('/fiscalFiles/{id}/Archiver', [FiscalFileController::class, 'archive'])->name('file.archive');
        Route::post('/fiscalFiles/{id}/Restorer', [FiscalFileController::class, 'restore'])->name('file.restore');
        Route::get('/fiscalFiles/{id}', [FiscalFileController::class, 'show'])->name('file.show');

        // Logs
        Route::get('/fiscalFilesLogsList', [FiscalFilesLogsController::class, 'list'])->name('fileLogs.list');
        Route::get('/fiscalFilesLogsAll', [FiscalFilesLogsController::class, 'all'])->name('fileLogs.all');
    });

    // Users
    Route::get('/users/{id}', [UserController::class, 'getUserById']);

    // Storage
    Route::get('/files/{filename}', [StorageController::class, 'showCentralReport'])->name('reports.show');
});

// Authentication routes
require __DIR__ . '/auth.php';
