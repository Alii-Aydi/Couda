<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FiscalFile>
 */
class FiscalFileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $randomUser = User::inRandomOrder()->first();
        $randomUserID = $randomUser->id;
        return [
            'name' => $this->faker->name,
            'created_by' => $randomUserID,
            'cin_or_fiscal_number' => $this->faker->numerify('############'), // Generate a random 12-digit number
            'taxation_date' => $this->faker->dateTimeBetween('-1 year', 'now'), // Random date within the last year
            'tax_center' => $this->faker->company,
            'tax_amount' => $this->faker->randomFloat(2, 100, 10000), // Random amount between 100 and 10000 with 2 decimal places
            'theme' => $this->faker->sentence,
            'issuing_organism' => $this->faker->company,
            'delivery_date_to_admin' => $this->faker->dateTimeBetween('-30 days', 'now'), // Random date within the last 30 days
            'receipt_date' => $this->faker->dateTimeBetween('-30 days', 'now'), // Random date within the last 30 days
            'status' => $this->faker->randomElement(['pending']),
        ];
    }
}
