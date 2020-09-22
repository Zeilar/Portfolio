<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Technology;
use App\Models\Project;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Technology::create(['name' => 'JavaScript', 'logo' => file_get_contents(storage_path('app\public\technologies\javascript.svg'))]);
        Technology::create(['name' => 'TypeScript', 'logo' => file_get_contents(storage_path('app\public\technologies\typescript.svg'))]);
        Technology::create(['name' => 'PHP', 'logo' => file_get_contents(storage_path('app\public\technologies\php.svg'))]);
        Technology::create(['name' => 'CSS', 'logo' => file_get_contents(storage_path('app\public\technologies\css.svg'))]);
        Technology::create(['name' => 'HTML', 'logo' => file_get_contents(storage_path('app\public\technologies\html.svg'))]);
        Technology::create(['name' => 'SASS', 'logo' => file_get_contents(storage_path('app\public\technologies\sass.svg'))]);
        Technology::create(['name' => 'Laravel', 'logo' => file_get_contents(storage_path('app\public\technologies\laravel.svg'))]);
        Technology::create(['name' => 'React', 'logo' => file_get_contents(storage_path('app\public\technologies\react.svg'))]);
        Technology::create(['name' => 'Node', 'logo' => file_get_contents(storage_path('app\public\technologies\node.svg'))]);
        Technology::create(['name' => 'WordPress', 'logo' => file_get_contents(storage_path('app\public\technologies\wordpress.svg'))]);
        Technology::create(['name' => 'Vue', 'logo' => file_get_contents(storage_path('app\public\technologies\vue.svg'))]);
        Technology::create(['name' => 'AWS', 'logo' => file_get_contents(storage_path('app\public\technologies\aws.svg'))]);
        Technology::create(['name' => 'Angular', 'logo' => file_get_contents(storage_path('app\public\technologies\angular.svg'))]);
        Technology::create(['name' => 'C#', 'logo' => file_get_contents(storage_path('app\public\technologies\c-sharp.svg'))]);
        Technology::create(['name' => 'ASP.NET', 'logo' => file_get_contents(storage_path('app\public\technologies\asp.net.svg'))]);
        Technology::create(['name' => '.NET', 'logo' => file_get_contents(storage_path('app\public\technologies\.net.svg'))]);
        Technology::create(['name' => 'Java', 'logo' => file_get_contents(storage_path('app\public\technologies\java.svg'))]);
        Technology::create(['name' => 'Spring', 'logo' => file_get_contents(storage_path('app\public\technologies\spring.svg'))]);
        Technology::create(['name' => 'Bootstrap', 'logo' => file_get_contents(storage_path('app\public\technologies\bootstrap.svg'))]);
        Technology::create(['name' => 'MySQL', 'logo' => file_get_contents(storage_path('app\public\technologies\mysql.svg'))]);
        Technology::create(['name' => 'PostgreSQL', 'logo' => file_get_contents(storage_path('app\public\technologies\postgresql.svg'))]);
        Technology::create(['name' => 'jQuery', 'logo' => file_get_contents(storage_path('app\public\technologies\jquery.svg'))]);
        Technology::create(['name' => 'Docker', 'logo' => file_get_contents(storage_path('app\public\technologies\docker.svg'))]);
        Technology::create(['name' => 'Git', 'logo' => file_get_contents(storage_path('app\public\technologies\git.svg'))]);

        $query = Technology::query();
        collect(['PHP', 'JavaScript', 'CSS', 'HTML', 'SASS', 'Laravel', 'React', 'MySQL'])->each(function (string $name) use ($query) {
            $query->orWhere('name', $name);
        });
        $technologies = $query->pluck('id');
        $project = Project::create([
            'title' => 'Z-Forum',
            'description' => '',
            'image' => '',
            'color' => '',
            'link' => 'https://zforum.angelin.dev',
        ]);
        $project->technologies()->sync($technologies);

        Project::factory(3)->create()->each(function($project) {
            $randomTechnologies = Technology::inRandomOrder()->limit(rand(1, 5))->pluck('id');            
            $project->technologies()->sync($randomTechnologies);
        });
    }
}
