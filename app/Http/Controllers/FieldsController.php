<?php

namespace App\Http\Controllers;

use App\Models\Field;
use Illuminate\Http\Request;

class FieldsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Field::all());
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $field
     * @return \Illuminate\Http\Response
     */
    public function show(string $field)
    {
        $field = Field::where('name', $field)->first();
        return response()->json($field ?? false);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Field  $field
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        if (!auth()->user()) return abort(401);
        
        $json = json_decode($request->getContent());
        $field = Field::firstOrCreate(
            ['id' => $id],
            [
                'content' => $json->content,
                'name' => $json->name,
            ],
        );
        $field->update([
            'content' => $json->content,
            'name' => $json->name,
        ]);
        return response($field);
    }
}
