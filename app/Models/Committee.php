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
    ];

    public function procesVerbaux()
    {
        return $this->hasOne(ProcesVerbaux::class);
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'committee_user', 'committee_id', 'user_id');
    }

    public function signatures()
    {
        return $this->belongsToMany(Signature::class);
    }
}
