<?php

namespace Database\Factories;

use App\Models\categories;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\products>
 */
class productsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'name' => $this->faker->randomElement([
                'Televisor', 'Camiseta', 'Sofá', 'Muñeca', 'Libro de cocina', 'Bicicleta', 'Champú', 'Vitaminas', 'Neumático', 'Cereal'
            ]),
            'stock' => $this->faker->numberBetween(1, 100),
            'category_id' => categories::factory(), // Relación con la categoría
        ];
    }
}
