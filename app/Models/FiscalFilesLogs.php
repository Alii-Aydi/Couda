<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FiscalFilesLogs extends Model
{
    use HasFactory;

    protected $fillable = [
        'fiscal_file_id',
        'updated_by',
        'name',
        'cin_or_fiscal_number',
        'taxation_date',
        'tax_center',
        'tax_amount',
        'theme',
        'issuing_organism',
        'delivery_date_to_admin',
        'receipt_date',
        'report',
        'actions'
    ];

    public function fiscalFile()
    {
        return $this->belongsTo(FiscalFile::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
