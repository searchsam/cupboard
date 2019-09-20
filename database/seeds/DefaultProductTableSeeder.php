<?php

use Illuminate\Database\Seeder;

class DefaultProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            [ 'name' => 'Leche' ],
            [ 'name' => 'Gaseosa' ],
            [ 'name' => 'Pan' ],
            [ 'name' => 'Galleta' ]
        ]);
    }
}
