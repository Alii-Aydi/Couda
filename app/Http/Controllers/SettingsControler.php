<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsControler extends Controller
{
    public function account()
    {
        return Inertia::render('Admin/Settings/UserManegment');
    }

    public function infra()
    {
        return Inertia::render('Admin/Settings/Infra');
    }
}
