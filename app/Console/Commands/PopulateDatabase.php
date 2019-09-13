<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PopulateDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:populate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed the database with default records.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $seeders =[
            'DefaultUserTableSeeder',
            'DefaultProductTableSeeder'
        ];

        array_map(function ($seed) {
            $this->callSilent('db:seed', ['--class' => $seed]);
        }, $seeders);

        return $this->info('Database has been populated.');
    }
}
