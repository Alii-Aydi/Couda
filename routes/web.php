<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\{
    AgendaController,
    FiscalFileController,
    FiscalFilesLogsController,
    ProfileController,
    ReclamationController,
    SettingsControler,
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

        // Reclamations
        Route::get('/fiscalFiles/{id}/reclamation', [ReclamationController::class, 'create']);
        Route::post('/fiscalFiles/{id}/reclamation', [ReclamationController::class, 'store']);

        // Logs
        Route::get('/fiscalFilesLogsList', [FiscalFilesLogsController::class, 'list'])->name('fileLogs.list');
        Route::get('/fiscalFilesLogsAll', [FiscalFilesLogsController::class, 'all'])->name('fileLogs.all');

        // Agenda
        Route::get('/agenda', [AgendaController::class, 'show']);
        Route::get('/commitee/list', [AgendaController::class, 'list']);
        Route::post('/commitee', [AgendaController::class, 'addCommitee']);

        Route::get('/commitee/{id}/makepv', [AgendaController::class, 'showMakePV'])->name('makepv');
        Route::post('/commitee/{id}/makepv', [AgendaController::class, 'storePV'])->name('commitee.store');
        Route::put('/commitee/{id}/fiscalfile/{fid}', [AgendaController::class, 'attachFiscalFileToCommitee']);

        // Settings
        Route::get('/settings/accountManagement', [SettingsControler::class, 'index'])->name('setting.users');
    });

    // Users
    Route::get('/users/{id}', [UserController::class, 'getUserById']);
    Route::get('/users', [UserController::class, 'getAll']);

    // Storage
    Route::get('/files/{filename}', [StorageController::class, 'showCentralReport'])->name('reports.show');
});

// Authentication routes
require __DIR__ . '/auth.php';
