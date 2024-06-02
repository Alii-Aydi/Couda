<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create roles
        $superAdmin = Role::create(['name' => 'super admin']);
        $admin = Role::create(['name' => 'admin']);
        $member = Role::create(['name' => 'member']);
        $secretary = Role::create(['name' => 'secretary']);
        $dossierManager = Role::create(['name' => 'dossier manager']);

        // Create permissions and assign them to roles
        Permission::create(['name' => 'create a file'])->assignRole([$dossierManager, $superAdmin]);
        Permission::create(['name' => 'edit file'])->assignRole([$dossierManager, $superAdmin]);
        Permission::create(['name' => 'show file'])->assignRole([$admin, $member, $secretary, $dossierManager, $superAdmin]);
        Permission::create(['name' => 'enter a comite'])->assignRole([$member, $secretary, $dossierManager, $superAdmin]);
        Permission::create(['name' => 'create comite'])->assignRole([$secretary, $superAdmin]);
        Permission::create(['name' => 'show pv'])->assignRole([$admin, $member, $secretary, $dossierManager, $superAdmin]);
        Permission::create(['name' => 'show agenda'])->assignRole([$admin, $member, $secretary, $dossierManager, $superAdmin]);
        Permission::create(['name' => 'infra'])->assignRole([$admin, $superAdmin]);
    }
}
