<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FiscalFile extends Model
{
    use HasFactory;

    protected $fillable = [
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
    ];
}
