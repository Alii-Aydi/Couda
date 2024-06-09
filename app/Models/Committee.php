<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Committee extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'proces_verbaux_id',
        'status',
        'title',
        'time_start',
        'ouverture',
        'cloture'
    ];

    public function procesVerbaux()
    {
        return $this->belongsTo(ProcesVerbaux::class);
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'committee_user', 'committee_id', 'user_id');
    }

    public function fiscalFiles()
    {
        return $this->belongsToMany(FiscalFile::class);
    }
}
