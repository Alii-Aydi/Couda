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
        Role::create(['name' => 'member']);
        Role::create(['name' => 'secretary']);
        Role::create(['name' => 'dossier manager']);

        // Create permissions
        Permission::create(['name' => 'create a file']);
        Permission::create(['name' => 'start a committee']);

        // Assign permissions to roles
        $adminRole = Role::findByName('admin');
        $adminRole->givePermissionTo(Permission::all()); // Admin has all permissions

        // For other roles, assign permissions as per your requirement
        $memberRole = Role::findByName('member');
        $memberRole->givePermissionTo(['create a file']);

        $secretaryRole = Role::findByName('secretary');
        $secretaryRole->givePermissionTo(['start a committee']);

        $dossierManagerRole = Role::findByName('dossier manager');

        $user = User::factory()->create([
            'name' => 'Ali',
            'email' => 'aliabdelkadergama@gmail.com',
            'password' => bcrypt('12345678'),
            'cin' => '564564645',
        ]);
        $user->assignRole("admin");

        //Fiscal Files
        FiscalFile::factory()->count(12)->create();
    }
}
