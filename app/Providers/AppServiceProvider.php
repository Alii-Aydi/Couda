<?php

namespace App\Providers;

use App\Interfaces\FiscalFileServiceInterface;
use App\Interfaces\FiscalFilesLogsServiceInterface;
use App\Interfaces\StorageServiceInterface;
use App\Services\FiscalFileService;
use App\Services\FiscalFilesLogsService;
use App\Services\StorageService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(FiscalFileServiceInterface::class, FiscalFileService::class);
        $this->app->bind(FiscalFilesLogsServiceInterface::class, FiscalFilesLogsService::class);
        $this->app->bind(StorageServiceInterface::class, StorageService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
