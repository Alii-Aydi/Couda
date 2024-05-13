<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcesVerbauxSection extends Model
{
    protected $table = 'custom_proces_verbaux_fields';
    protected $fillable = ['section_name', 'section_content'];

    public function procesVerbaux()
    {
        return $this->belongsTo(ProcesVerbaux::class);
    }
}
