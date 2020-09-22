<?php

use App\Http\Controllers\ProjectsController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::resource('projects', ProjectsController::class)->except(['edit', 'create', 'show']);
Route::post('authenticate', function() {
    return response()->json(auth()->user() ?? false);
});