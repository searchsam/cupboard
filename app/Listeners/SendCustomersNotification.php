<?php

namespace App\Listeners;

use App\Events\CreateOrder;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\User;
use App\Mail\NewOrderNotification;
use Illuminate\Support\Facades\Mail;

class SendCustomersNotification implements ShouldQueue
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
        $users = User::where('type', 2)->get();

        $users->each(function($user) use ($event) {
            Mail::to($user)->send(new NewOrderNotification($event->order));
        });
    }
}
