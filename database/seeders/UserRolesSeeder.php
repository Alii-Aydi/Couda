<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Ali',
            'email' => 'aliabdelkadergama@gmail.com',
            'password' => bcrypt('12345678'),
            'cin' => '564564645',
            'signature_path' => ''
        ]);
        $user->assignRole("super admin");
        $user->signature_path = '/private/signatures/1/AdminSignature.jpg';
        $user->save();
    }
}
