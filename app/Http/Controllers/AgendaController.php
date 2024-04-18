<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AgendaController extends Controller
{
    public function show()
    {
        return Inertia::render('Admin/Agenda/AgendaCalander');
    }
}
