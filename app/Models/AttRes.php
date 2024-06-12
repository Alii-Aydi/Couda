<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttRes extends Model
{
    use HasFactory;

    protected $fillable = [
        'res_reclamation_id',
        'attribute',
        'value',
    ];

    public function resReclamation()
    {
        return $this->belongsTo(ResReclamation::class);
    }
}
