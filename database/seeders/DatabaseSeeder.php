<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Technology;
use App\Models\Project;

class DatabaseSeeder extends Seeder
{
    private function getSvg(string $name = '', string $override = 'original-wordmark'): string {
        return file_get_contents(storage_path("app\public\\technologies\\$name\\$name-$override.svg"));
    }

    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
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
        collect(['PHP', 'JavaScript', 'CSS', 'HTML', 'SASS', 'Laravel', 'React', 'MySQL', 'Apache'])
            ->each(fn(string $name) => $query->orWhere('name', $name));
        $project = Project::create([
            'title' => 'Z-Forum',
            'description' => 'My first real, finished project; a forum targetted at a younger audience. This site has a very modern look for a forum and some functionality you don\'t often see. It\'s very backend oriented as I used Laravel as an MVC, which is its original purpose. However in newer projects of mine, I rather serve my own frontend with frameworks such as React, Vue, Angular etc.',
            'image' => '/storage/projects_images/zforum.png',
            'color' => '#00e676',
            'link' => 'https://zforum.angelin.dev',
        ]);
        $project->technologies()->sync($query->pluck('id'));

        $query = Technology::query();
        collect(['JavaScript', 'CSS', 'HTML', 'SASS', 'React', 'Apache'])
            ->each(fn(string $name) => $query->orWhere('name', $name));
        $project = Project::create([
            'title' => 'Tools',
            'description' => 'This app was my first take on React. It features React Router and is served on an Apache server. This is meant mostly for personal use but others are free to make some use of it. Keep in mind this site is work in progress and may not even look like the image on the left currently.',
            'image' => '/storage/projects_images/tools.png',
            'color' => '#00e676',
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
            'color' => '#00e676',
            'link' => 'https://zcms.angelin.dev',
        ]);
        $project->technologies()->sync($query->pluck('id'));

        // Project::factory(3)->create()->each(function($project) {
        //     $randomTechnologies = Technology::inRandomOrder()->limit(rand(1, 5))->pluck('id');            
        //     $project->technologies()->sync($randomTechnologies);
        // });
    }
}
