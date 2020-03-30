<?php

namespace App\Providers;

use App\Events\ApproveRequest;
use App\Events\CreateNewOrder;
use App\Events\ShopOrder;
use App\Listeners\AddStatToProduct;
use App\Listeners\FillPantry;
use App\Listeners\SendCreatedOrderMessage;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        ShopOrder::class => [
            FillPantry::class,
        ],
        CreateNewOrder::class => [
            SendCreatedOrderMessage::class,
        ],
        ApproveRequest::class => [
            AddStatToProduct::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
