<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Database\QueryException;
use DB;

class TruncateDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:truncate {table? : Table name.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Truncate all tables on database. Use table name to truncate just one table.';

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
                // Truncate table.
                DB::table($table_param)->truncate();
            // Raises the exception `QueryException` in case the argument is not valid.
            } catch (QueryException $e) {
                // Truncated table failed message.
                return $this->error("Table `{$table_param}` does not exist in the database.");
            }

            // Truncated table successful message.
            return $this->info("The table `{$table_param}` was truncated successfully.");
        }

        // Truncate all tables in the lambda expression database.
        array_map(function($table) {
            // Truncate table.
            DB::table($table->name)->truncate();
            // Query by supported database engine to get all tables names.
        }, DB::select($this->getQueryByEngine(env('DB_CONNECTION'))));
        // All tables truncated successful message.
        return $this->info('All tables on ' . env('DB_DATABASE') . ' database was truncated successfully.');
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
