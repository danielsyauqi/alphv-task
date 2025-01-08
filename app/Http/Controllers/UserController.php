<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        // Ensure only admin can access
        if (!Auth::user()->is_admin) {
            abort(403);
        }

        return Inertia::render('Users/Index', [
            'users' => User::all()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'is_admin' => $user->is_admin,
                    'created_at' => $user->created_at->format('M d, Y'),
                ];
            })
        ]);
    }

    public function updateStatus(Request $request, User $user)
    {
        if (!Auth::user()->is_admin) {
            abort(403);
        }

        $validated = $request->validate([
            'is_admin' => 'required|boolean'
        ]);

        $user->update($validated);

        return back()->with('message', 'User status updated successfully');
    }
}