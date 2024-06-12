<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepoRes extends Model
{
    use HasFactory;

    protected $fillable = [
        'res_reclamation_id',
        'report_name',
        'file_path',
    ];

    public function resReclamation()
    {
        return $this->belongsTo(ResReclamation::class);
    }
}
