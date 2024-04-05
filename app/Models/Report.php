<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;
    protected $fillable = ['file_path', 'desc'];

    public function fiscalFile()
    {
        return $this->belongsTo(FiscalFile::class);
    }

    public function fiscalFilesLogs()
    {
        return $this->belongsToMany(FiscalFilesLogs::class, 'fiscal_file_log_report', 'report_id', 'fiscal_file_log_id');
    }
}
