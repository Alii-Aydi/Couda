<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FiscalFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'created_by',
        'cin_or_fiscal_number',
        'taxation_date',
        'tax_center',
        'tax_amount',
        'theme',
        'issuing_organism',
        'delivery_date_to_admin',
        'receipt_date',
        'status',
    ];

    protected $casts = [
        'archived' => 'boolean',
    ];


    public function logs()
    {
        return $this->hasMany(FiscalFilesLogs::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function reclamations()
    {
        return $this->hasMany(Reclamation::class);
    }

    public function Commitees()
    {
        return $this->belongsToMany(Committee::class);
    }

    public function sections()
    {
        return $this->hasMany(ProcesVerbauxSection::class);
    }
}
