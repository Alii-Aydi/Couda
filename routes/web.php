<?php

use App\Http\Controllers\FiscalFileController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StorageController;
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

Route::middleware('auth')->group(function () {
    //Auth
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    //Dashboard
    Route::get('/dashboard/createFile', [FiscalFileController::class, 'create'])->name('file.show');
    Route::post('/dashboard/createFile', [FiscalFileController::class, 'store'])->name('file.store');
    Route::get('/dashboard/fiscalFiles', [FiscalFileController::class, 'all'])->name('file.all');
    Route::get('/dashboard/fiscalFiles/edit/{id}', [FiscalFileController::class, 'edit'])->name('edit.record');
    //storage
    Route::get('/files/{filename}', [StorageController::class, 'showCentralReport'])->name('repots.show');
});

require __DIR__ . '/auth.php';
