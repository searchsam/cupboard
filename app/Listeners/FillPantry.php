<?php

namespace App\Listeners;

use App\Events\ShopOrder;
use Illuminate\Contracts\Queue\ShouldQueue;

class FillPantry implements ShouldQueue
{

    /**
     * Handle the event.
     *
     * @param  ShopOrder  $event
     * @return void
     */
    public function handle(ShopOrder $event)
    {
        $requests = $event->order->requests()
            ->approved()
            ->get(['id as request_id', 'quantity as existence'])
            ->toArray();

        $event->order->pantry()->createMany($requests);
    }
}
