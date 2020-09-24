<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $appends = ['technologies'];

    public function technologies() {
        return $this->belongsToMany(Technology::class);
    }

    public function getTechnologiesAttribute() {
        return $this->technologies()->get();
    }
}
