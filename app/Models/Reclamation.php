<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reclamation extends Model
{
    use HasFactory;

    protected $fillable = [
        'fiscal_file_id',
        'created_by',
        'contact_destination',
        'token',
    ];

    // Define the relationship with AttributesReclamation model
    public function attributesReclamations()
    {
        return $this->hasMany(AttributesReclamation::class);
    }

    public function reportsReclamations()
    {
        return $this->hasMany(ReportsReclamation::class);
    }

    public function fiscalFile()
    {
        return $this->belongsTo(FiscalFile::class);
    }
}
