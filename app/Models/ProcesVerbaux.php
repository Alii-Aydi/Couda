<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcesVerbaux extends Model
{
    use HasFactory;

    protected $table = 'proces_verbaux';
    protected $fillable = [
        'conclusion',
        'presedent',
        'ouverture',
        'cloture',
        'pdf'
    ];

    public function sousProcesVerbaux()
    {
        return $this->hasMany(SousProcesVerbaux::class);
    }

    public function customFields()
    {
        return $this->hasMany(ProcesVerbauxSection::class);
    }
}
