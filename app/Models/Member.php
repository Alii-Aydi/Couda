<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $table = 'committee_user';
    protected $fillable = ['presence'];
    protected $primaryKey = ['committee_id', 'user_id'];
    public $incrementing = false;

    public function committee()
    {
        return $this->belongsTo(Committee::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
