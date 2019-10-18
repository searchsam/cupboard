<?php

namespace App\Listeners;

use App\Events\CreateOrder;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Mail;

use App\User;
use App\Notification\OrderCreated;
use App\Mail\OrderCreatedMessage;

class SendCreationMessage implements ShouldQueue
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
     * @param  CreateOrder  $event
     * @return void
     */
    public function handle(CreateOrder $event)
    {
        error_log('Create Order Listener');
        $users = User::all();

        Notification::send($users, new OrderCreated($event->order));
        // Mail::to($users)->send(new OrderCreatedMessage($event->order));
    }
}
