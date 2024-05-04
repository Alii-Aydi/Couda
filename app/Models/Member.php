<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $table = 'committee_user';
    protected $fillable = ['presence'];

    public function committee()
    {
        return $this->belongsTo(Committee::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
