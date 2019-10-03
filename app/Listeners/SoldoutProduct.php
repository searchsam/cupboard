<?php

namespace App\Listeners;

use App\Events\StocklessProduct;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\Pantry;

class SoldoutProduct implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  StocklessProduct  $event
     * @return void
     */
    public function handle(StocklessProduct $event)
    {
        if ($event->pantry->existence == Pantry::SOLDOUT) {
            $event->pantry->update(['status' => Pantry::SOLDOUT]);
        }
    }
}
