<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SousProcesVerbaux extends Model
{
    use HasFactory;

    protected $fillable = [
        'decision',
        'path_to_spv',
        'fiscal_file_id',
        'proces_verbaux_id',
    ];

    public function fiscalFile()
    {
        return $this->belongsTo(FiscalFile::class);
    }

    public function procesVerbaux()
    {
        return $this->belongsTo(ProcesVerbaux::class);
    }
}
