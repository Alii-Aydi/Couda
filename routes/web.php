<?php

use App\Http\Controllers\FiscalFileController;
use App\Http\Controllers\FiscalFilesLogsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/makepv', function () {
    return Inertia::render('Admin/ProcesVerbal/CreatePV');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    //Auth
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    //Fiscal Files
    Route::get('/dashboard/createFile', [FiscalFileController::class, 'create'])->name('file.show');
    Route::post('/dashboard/createFile', [FiscalFileController::class, 'store'])->name('file.store');
    Route::get('/dashboard/fiscalFiles', [FiscalFileController::class, 'all'])->name('file.all');
    Route::get('/dashboard/ArchivedfiscalFiles', [FiscalFileController::class, 'allArchived'])->name('file.allArchived');
    Route::get('/dashboard/fiscalFilesList', [FiscalFileController::class, 'list'])->name('file.list');
    Route::get('/dashboard/fiscalFiles/edit/{id}', [FiscalFileController::class, 'edit'])->name('edit.record');
    Route::post('/dashboard/fiscalFiles/edit/{id}', [FiscalFileController::class, 'updateFiscalFile'])->name('update.record'); //as put
    Route::post('/dashboard/fiscalFiles/{id}/Archiver', [FiscalFileController::class, 'archive'])->name('file.archive');
    Route::post('/dashboard/fiscalFiles/{id}/Restorer', [FiscalFileController::class, 'restore'])->name('file.restore');
    //Logs
    Route::get('/dashboard/fiscalFilesLogsList', [FiscalFilesLogsController::class, 'list'])->name('fileLogs.list');
    Route::get('/dashboard/fiscalFilesLogsAll', [FiscalFilesLogsController::class, 'all'])->name('fileLogs.all');
    //user
    Route::get('/users/{id}', [UserController::class, 'getUserById']);
    //Storage
    Route::get('/files/{filename}', [StorageController::class, 'showCentralReport'])->name('repots.show');
});

require __DIR__ . '/auth.php';
