<?php

use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\FieldsController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\User;

Route::resource('fields', FieldsController::class)->except(['edit', 'create', 'store', 'destroy']);
Route::resource('projects', ProjectsController::class)->except(['edit', 'create', 'show']);

Route::post('/login', function(Request $request) {
    $json = json_decode($request->getContent());

    if (Auth::attempt(['username' => $json->username, 'password' => $json->password])) {
        return response(['success' => true]);
    }

    return !User::where('username', $json->username)->first()
        ? response(['field' => 'username', 'message' => 'User does not exist', 'success' => false])
        : response(['field' => 'password', 'message' => 'Incorrect password', 'success' => false]);
});

Route::get('logout', function() {
    Auth::logout();
    return redirect('/');
});

Route::get('authenticate', function() {
    return response()->json('', auth()->user() ? 200 : 401);
});
