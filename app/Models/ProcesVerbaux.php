<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcesVerbaux extends Model
{
    use HasFactory;

    protected $fillable = [
        'conclusion',
    ];

    public function sousProcesVerbaux()
    {
        return $this->hasMany(SousProcesVerbaux::class);
    }
}
