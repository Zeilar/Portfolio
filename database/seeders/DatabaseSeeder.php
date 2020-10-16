<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Field;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'username' => 'Admin',
            'password' => Hash::make(env('ADMIN_PASSWORD')),
        ]);

        Project::create(['title' => 'Z-Forum', 'link' => 'https://zforum.angelin.dev']);
        Project::create(['title' => 'Tools', 'link' => 'https://tools.angelin.dev']);
        Project::create(['title' => 'ZCMS', 'link' => 'https://zcms.angelin.dev']);
        Project::create(['title' => 'Cinema', 'link' => 'https://cinema.angelin.dev']);

        Field::create([
            'name'    => 'heroHeader',
            'content' => 'Hi, I\'m Philip',
        ]);
        Field::create([
            'name'    => 'heroText',
            'content' => 'I\'m a fullstack web developer. That means I can work in every stack of the production, be it frontend or backend, to deliver a fully fledged application. Currently, I excel at the frameworks; Laravel, React and Vue. Take a look around to learn more about me and my works.',
        ]);
    }
}
