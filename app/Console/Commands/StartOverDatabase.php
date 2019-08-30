<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class StartOverDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:startover';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reiniciar la base de datos.';

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
        // Verify the execution environment.
        if (env('APP_ENV') != 'local') {
            // Invalid environment message.
            return $this->error('This command is only available in a local environment.');
        }

        // Verify the database engine.
        if (env('DB_CONNECTION') != 'sqlite') {
            // Invalid environment message.
            return $this->error('This command is only available for SQLite database engine.');
        }

        return shell_exec('echo "" > ' . database_path('database.sqlite'));
    }
}
