<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class OwnProfile
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        $profileUserId = $request->route('id'); // Assuming the user ID is passed as a route parameter

        if ($user->id != $profileUserId) {
            return redirect('/'); // Redirect if the user is trying to access someone else's profile
        }

        return $next($request);
    }
}
