<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\Models\Technology;
use App\Models\Project;
use App\Models\Field;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    private function getSvg(string $name = '', string $override = 'original-wordmark'): string {
        return file_get_contents(storage_path("app/public/technologies/$name/$name-$override.svg"));
    }

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

        Technology::create(['name' => 'HTML', 'link' => 'http://www.w3.org/html', 'logo' => $this->getSvg('html5')]);
        Technology::create(['name' => 'CSS', 'link' => 'http://www.w3.org/css', 'logo' => $this->getSvg('css3')]);
        Technology::create(['name' => 'SASS', 'link' => 'http://www.sass-lang.com', 'logo' => $this->getSvg('sass', 'original')]);
        Technology::create(['name' => 'Bootstrap', 'link' => 'http://www.getbootstrap.com', 'logo' => $this->getSvg('bootstrap', 'plain')]);
        Technology::create(['name' => 'JavaScript', 'link' => 'http://www.javascript.com', 'logo' => $this->getSvg('javascript', 'original')]);
        Technology::create(['name' => 'TypeScript', 'link' => 'http://www.typescriptlang.com', 'logo' => $this->getSvg('typescript', 'original')]);
        Technology::create(['name' => 'jQuery', 'link' => 'http://www.jquery.com', 'logo' => $this->getSvg('jquery')]);
        Technology::create(['name' => 'React', 'link' => 'http://www.reactjs.org', 'logo' => $this->getSvg('react')]);
        Technology::create(['name' => 'Vue', 'link' => 'http://www.vuejs.org', 'logo' => $this->getSvg('vuejs')]);
        Technology::create(['name' => 'Angular', 'link' => 'http://www.angular.io', 'logo' => $this->getSvg('angularjs')]);
        Technology::create(['name' => 'PHP', 'link' => 'http://www.php.net', 'logo' => $this->getSvg('php', 'original')]);
        Technology::create(['name' => 'Laravel', 'link' => 'http://www.laravel.com', 'logo' => $this->getSvg('laravel', 'plain-wordmark')]);
        Technology::create(['name' => 'WordPress', 'link' => 'http://www.wordpress.org', 'logo' => $this->getSvg('wordpress', 'original')]);
        Technology::create(['name' => 'C#', 'link' => 'http://docs.microsoft.com/en-us/dotnet/csharp/programming-guide', 'logo' => $this->getSvg('csharp', 'original')]);
        Technology::create(['name' => 'ASP.NET', 'link' => 'http://dotnet.microsoft.com/apps/aspnet', 'logo' => $this->getSvg('dot-net')]);
        Technology::create(['name' => 'Java', 'link' => 'http://www.java.com', 'logo' => $this->getSvg('java')]);
        Technology::create(['name' => 'Spring', 'link' => 'http://www.spring.io', 'logo' => $this->getSvg('spring', 'original')]);
        Technology::create(['name' => 'MySQL', 'link' => 'http://www.mysql.com', 'logo' => $this->getSvg('mysql')]);
        Technology::create(['name' => 'PostgreSQL', 'link' => 'http://www.postgresql.org', 'logo' => $this->getSvg('postgresql')]);
        Technology::create(['name' => 'Apache', 'link' => 'http://www.apache.org', 'logo' => $this->getSvg('apache')]);
        Technology::create(['name' => 'Node', 'link' => 'http://www.nodejs.org', 'logo' => $this->getSvg('nodejs')]);
        Technology::create(['name' => 'Nginx', 'link' => 'http://www.nginx.com', 'logo' => $this->getSvg('nginx', 'original')]);
        Technology::create(['name' => 'AWS', 'link' => 'http://www.aws.amazon.com', 'logo' => $this->getSvg('amazonwebservices')]);
        Technology::create(['name' => 'Docker', 'link' => 'http://www.docker.com', 'logo' => $this->getSvg('docker')]);
        Technology::create(['name' => 'Git', 'link' => 'http://www.git-scm.com', 'logo' => $this->getSvg('git')]);

        $query = Technology::query();
        collect(['PHP', 'JavaScript', 'jQuery', 'CSS', 'HTML', 'SASS', 'Laravel', 'MySQL', 'Apache'])
            ->each(fn(string $name) => $query->orWhere('name', $name));
        $project = Project::create([
            'title' => 'Z-Forum',
            'description' => 'My first real, finished project; a forum targetted at a younger audience. This site has a very modern look for a forum and some functionality you don\'t often see.',
            'image' => '/storage/projects_images/zforum.png',
            'github' => 'http://www.github.com/Zeilar/Z-Forum',
            'canvas' => 'zforum',
            'link' => 'https://zforum.angelin.dev',
        ]);
        $project->technologies()->sync($query->pluck('id'));

        $query = Technology::query();
        collect(['JavaScript', 'CSS', 'HTML', 'SASS', 'React', 'Apache'])
            ->each(fn(string $name) => $query->orWhere('name', $name));
        $project = Project::create([
            'title' => 'Tools',
            'description' => 'This app was my first take on React. It features React Router and is served on an Apache server. This is meant mostly for personal use but others are free to make some use of it. Keep in mind it is a work in progress and may not even look like the image on the side currently.',
            'image' => '/storage/projects_images/tools.png',
            'github' => 'http://www.github.com/Zeilar/tools',
            'canvas' => 'tools',
            'link' => 'https://tools.angelin.dev',
        ]);
        $project->technologies()->sync($query->pluck('id'));

        $query = Technology::query();
        collect(['PHP', 'JavaScript', 'CSS', 'HTML', 'SASS', 'Laravel', 'React', 'MySQL', 'Apache'])
            ->each(fn(string $name) => $query->orWhere('name', $name));
        $project = Project::create([
            'title' => 'ZCMS',
            'description' => 'Now that I had made a project in Laravel and React respectively, I decided to do a second take on my Z-Forum project, but this time with a mostly React-based frontend. Unlike Z-Forum, this CMS will have a whole dashboard and vastly improved systems. Note that it\'s in early development at the time of writing this.',
            'image' => '/storage/projects_images/zcms.png',
            'github' => 'http://www.github.com/Zeilar/ZCMS',
            'canvas' => 'zcms',
            'link' => 'https://zcms.angelin.dev',
        ]);
        $project->technologies()->sync($query->pluck('id'));

        $query = Technology::query();
        collect(['PHP', 'JavaScript', 'CSS', 'HTML', 'SASS', 'Laravel', 'MySQL', 'Apache'])
            ->each(fn(string $name) => $query->orWhere('name', $name));
        $project = Project::create([
            'title' => 'Cinema',
            'description' => 'A watch together app. This project was purely for fun, and something that me and my friends could potentially use. The concept is very simple; you have a room with users inside, and a playlist where you add the video(s) you want to watch. Then the player is synced for everybody. And of course you can chat as well! There are still some things left to do, but it\'s almost finished!',
            'image' => '/storage/projects_images/cinema.png',
            'github' => 'http://www.github.com/Zeilar/Cinema',
            'canvas' => 'cinema',
            'link' => 'https://cinema.angelin.dev',
        ]);
        $project->technologies()->sync($query->pluck('id'));

        Field::create([
            'name' => 'heroHeaderBig',
            'content' => 'Philip Angelin',
        ]);
    }
}
