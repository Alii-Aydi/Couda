<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttributesReclamation extends Model
{
    protected $table = 'attributes_reclamation';

    protected $fillable = [
        'attribute',
        'reason',
        'reclamation_id',
    ];

    public function reclamation()
    {
        return $this->belongsTo(Reclamation::class);
    }
}
