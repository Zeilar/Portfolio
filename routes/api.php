<?php

use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\FieldsController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::resource('projects', ProjectsController::class)->except(['edit', 'create', 'show']);
Route::resource('fields', FieldsController::class)->except(['edit', 'create']);
Route::get('authenticate', function() {
    return response()->json(true);
    return response()->json(auth()->user() ?? false);
});