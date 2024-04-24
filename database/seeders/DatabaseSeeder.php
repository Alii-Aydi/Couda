<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\FiscalFile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'user']);

        Permission::create(['name' => 'create a file']);
        Permission::create(['name' => 'start a committee']);

        $role = Role::findByName('admin');
        $role->givePermissionTo(Permission::all());

        User::factory()->create([
            'name' => 'Ali',
            'email' => 'aliabdelkadergama@gmail.com',
            'password' => bcrypt('12345678'),
            'role' => 'admin',
        ]);

        //Fiscal Files
        FiscalFile::factory()->count(12)->create();
    }
}
