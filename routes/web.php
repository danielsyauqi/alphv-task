<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\ShapeController;
use App\Http\Controllers\ProfileController;

// Public routes
Route::get('/', function () {
    return redirect()->route('gallery');
});

// Protected routes - requires authentication
Route::middleware(['auth', 'verified'])->group(function () {
    // gallery route

    // Shapes routes
    Route::resource('shapes', ShapeController::class);
    Route::get('gallery', [ShapeController::class, 'gallery'])->name('gallery');


    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware([AdminMiddleware::class])->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::patch('/users/{user}/status', [UserController::class, 'updateStatus'])->name('users.updateStatus');
    });

    
});





// Authentication routes (already included by Breeze)
require __DIR__.'/auth.php';