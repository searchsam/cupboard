<?php

namespace App\Listeners;

use App\Events\CreateNewOrder;
use App\Notifications\OrderCreated;
use App\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Notification;

class SendCreatedOrderMessage implements ShouldQueue
{

    /**
     * Handle the event.
     *
     * @param CreateNewOrder $event
     * @return void
     */
    public function handle(CreateNewOrder $event)
    {
        $users = User::all();

        Notification::send($users, new OrderCreated($event->order));
    }
}
