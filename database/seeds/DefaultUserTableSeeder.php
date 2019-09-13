<?php

use Illuminate\Database\Seeder;

class DefaultUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'Super User',
                'email' => 'suadmin@getnerdify.com',
                'password' => bcrypt('cupboard'),
                'type' => 0
            ],
            [
                'name' => 'Samuel Gutierrez',
                'email' => 'samuel@getnerdify.com',
                'password' => bcrypt('321321'),
                'type' => 2
            ]
        ]);
    }
}
