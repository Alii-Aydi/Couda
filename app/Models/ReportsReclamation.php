<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportsReclamation extends Model
{
    protected $table = 'reports_reclamation';

    protected $fillable = [
        'name',
        'description',
        'reclamation_id',
    ];

    public function reclamation()
    {
        return $this->belongsTo(Reclamation::class);
    }
}
