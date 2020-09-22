<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProjectFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Project::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $r = rand(0, 255);
        $g = rand(0, 255);
        $b = rand(0, 255);
        $rgb = "rgb($r, $g, $b)";

        return [
            'title'       => $this->faker->realText(20, 1),
            'description' => $this->faker->realText(800, 5),
            'image'       => '',
            'color'       => $rgb,
            'link'        => '#',
        ];
    }
}
