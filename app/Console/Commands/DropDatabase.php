<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;

class DropDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:drop {table? : Table name.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Drop all tables on database. Use table name to drop just one table.';

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

        $table_param = $this->argument('table');
        // Check if any argument was passed.
        if ($table_param) {
            try {
                // Drop table.
                DB::statement("DROP TABLE {$table_param}");
            // Raises the exception `QueryException` in case the argument is not valid.
            } catch (QueryException $e) {
                // Droped table failed message.
                return $this->error("Table `{$table_param}` does not exist in the database.");
            }

            // Droped table successful message.
            return $this->info("The table `{$table_param}` was droped successfully.");
        }

        // Drop all tables in the lambda expression database.
        array_map(function($table) {
            // Verify `sequence` table is not droped.
            if ($table->name != 'sqlite_sequence') {
                // Drop table.
                DB::statement("DROP TABLE {$table->name}");
            }
            // Query by supported database engine to get all tables names.
        }, DB::select($this->getQueryByEngine(env('DB_CONNECTION'))));
        // All tables droped successful message.
        return $this->info('All tables on ' . env('DB_DATABASE') . ' database was droped successfully.');
    }

    private function getQueryByEngine($engineName)
    {
        try {
            // Returns appropriate query to database engine received.
            return array(
                'sqlite' => "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;",
                'mysql' => "SHOW TABLES",
                'pgsql' => "SELECT table_name FROM information_schema.tables WHERE table_schema='public';",
                'sqlsrv' => ""
            )[$engineName];
        // Raises the exception `ErrorException` in case the index not exist.
        } catch (ErrorException $e) {
            // Error message for none database engine not supported.
            return $this->error('Database engine or query poorly formed or not properly assigned.');
        }
    }
}
