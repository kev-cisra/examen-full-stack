<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\categories;
use App\Models\products;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'name' => 'Usuario 1',
            'email' => 'user1@example.com',
            'api_token' => 'S3EZQ46Fzm0EpZnmR2fyvvbDsNFKFxadBQeCFv5wj0j2tvbKbQ4G8AVqGuww',
        ]);

        categories::factory(10)->create()->each(function ($category) {
            products::factory(5)->create(['category_id' => $category->id]);
        });
    }
}
