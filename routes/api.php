<?php

use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\FieldsController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\User;

Route::resource('projects', ProjectsController::class)->except(['edit', 'create', 'show']);
Route::resource('fields', FieldsController::class)->except(['edit', 'create', 'store']);

Route::post('/login', function(Request $request) {
    $json = json_decode($request->getContent());

    if (!User::where('username', $json->username)->first()) {
        return response(['field' => 'username', 'message' => 'User does not exist', 'success' => false]);
    } else if (!Auth::attempt(['username' => $json->username, 'password' => $json->password])) {
        return response(['field' => 'password', 'message' => 'Incorrect password', 'success' => false]);
    }
    return response(['success' => true]);
});
Route::get('logout', function() {
    Auth::logout();
    return redirect('/');
});
Route::get('authenticate', function() {
    return response('', auth()->user() ? 200 : 401);
});