<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResReclamation extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_contact',
        'fiscal_file_id',
        'reclamation_id',
    ];

    public function attRes()
    {
        return $this->hasMany(AttRes::class);
    }

    public function repoRes()
    {
        return $this->hasMany(RepoRes::class);
    }

    public function fiscalFile()
    {
        return $this->belongsTo(FiscalFile::class);
    }
}
