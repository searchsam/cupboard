<?php

namespace App\Listeners;

use App\Events\CreateOrder;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\User;
use App\Mail\NewOrderMessage;
use Illuminate\Support\Facades\Mail;

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
        $users = User::all()->toArray();

        Mail::to($users)->send(new NewOrderMessage($event->order));
    }
}
