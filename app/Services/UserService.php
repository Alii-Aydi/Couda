<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function getUserById($id)
    {
        return User::find($id);
    }
}
