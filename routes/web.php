<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\{
    AgendaController,
    ContactController,
    DashboardController,
    FiscalFileController,
    FiscalFilesLogsController,
    ProcesVerbauxController,
    ProfileController,
    ReclamationController,
    SettingsControler,
    StorageController,
    UserController
};

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::middleware(['permission:create a file'])->group(function () {
            Route::get('/createFile', [FiscalFileController::class, 'create'])->name('file.create');
            Route::post('/createFile', [FiscalFileController::class, 'store'])->name('file.store');
            Route::get('/fiscalFiles/{id}/reclamation', [ReclamationController::class, 'create']);
            Route::post('/fiscalFiles/{id}/reclamation', [ReclamationController::class, 'store']);
        });

        Route::middleware(['permission:edit file'])->group(function () {
            Route::get('/fiscalFiles/edit/{id}', [FiscalFileController::class, 'edit'])->name('edit.record');
            Route::put('/fiscalFiles/edit/{id}', [FiscalFileController::class, 'updateFiscalFile'])->name('update.record');
            Route::post('/fiscalFiles/{id}/Archiver', [FiscalFileController::class, 'archive'])->name('file.archive');
            Route::post('/fiscalFiles/{id}/Restorer', [FiscalFileController::class, 'restore'])->name('file.restore');
        });

        Route::middleware(['auth', 'verified'])->group(function () {
            Route::get('/fiscalFiles', [FiscalFileController::class, 'all'])->name('file.all');
            Route::get('/ArchivedfiscalFiles', [FiscalFileController::class, 'allArchived'])->name('file.allArchived');
            Route::get('/fiscalFilesList', [FiscalFileController::class, 'list'])->name('file.list');
            Route::get('/fiscalFiles/{id}', [FiscalFileController::class, 'show'])->name('file.show');
        });

        Route::middleware(['permission:create comite'])->group(function () {
            Route::post('/commitee', [AgendaController::class, 'addCommitee']);
            Route::put('/commitee/{id}/fiscalfile/{fid}', [AgendaController::class, 'attachFiscalFileToCommitee']);
        });

        Route::middleware(['auth', 'verified', 'permission:show pv'])->group(function () {
            Route::get('/fiscalFilesLogsList', [FiscalFilesLogsController::class, 'list'])->name('fileLogs.list');
            Route::get('/fiscalFilesLogsAll', [FiscalFilesLogsController::class, 'all'])->name('fileLogs.all');
            Route::get('/fiscalFilesLogs/{id}', [FiscalFilesLogsController::class, 'show'])->name('fileLogs.show');

            Route::get('/proces-verbaux/list', [ProcesVerbauxController::class, 'index'])->name('proces-verbaux.index');
            Route::get('/commitee/{id}/makepv', [ProcesVerbauxController::class, 'showMakePV'])->name('makepv');
            Route::post('/commitee/{id}/makepv', [ProcesVerbauxController::class, 'storePV'])->name('commitee.store');
        });

        Route::middleware(['permission:show agenda'])->group(function () {
            Route::get('/agenda', [AgendaController::class, 'show'])->name('agenda');
            Route::get('/commitee/list', [AgendaController::class, 'list']);
        });

        //Account Manegment
        Route::middleware(['permission:infra'])->group(function () {
            Route::get('/settings/accountManagement', [SettingsControler::class, 'account'])->name('setting.users');
            Route::get('/settings/infra', [SettingsControler::class, 'infra'])->name('setting.infra');

            Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
            Route::get('/contacts/add', [ContactController::class, 'create'])->name('contacts.create');
            Route::post('/contacts/add', [ContactController::class, 'store'])->name('contacts.store');
            Route::delete('/contacts/{contact}/delete', [ContactController::class, 'destroy'])->name('contacts.destroy');
            Route::get('/contacts/{contact}/edit', [ContactController::class, 'edit'])->name('contacts.edit');
            Route::put('/contacts/{contact}/edit', [ContactController::class, 'update'])->name('contacts.update');
        });
    });

    //API's
    Route::get('/users/{id}', [UserController::class, 'getUserById']);
    Route::get('/users', [UserController::class, 'getAll']);
    Route::post('/profile/{user}/savepic', [ProfileController::class, 'saveProfilePicture'])->name('profile.savepic');

    Route::get('/files/{filename}', [StorageController::class, 'showCentralReport'])->name('reports.show');
});

require __DIR__ . '/auth.php';
