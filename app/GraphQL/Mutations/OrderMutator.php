<?php

namespace App\GraphQL\Mutations;

use App\Order;
use App\Events\CreateOrder;
use App\Events\ShopOrder;

use Illuminate\Notifications\ChannelManager\Notification;
use App\Notification\OrderCreated;

class OrderMutator
{
    /**
     * @param $root
     * @param array $args
     * @return mixed
     */
    public function create($root, array $args)
    {
        $deadline = $args['deadline'];
        $name = $args['name'];

        $order = auth()->user()->orders()->create([
            'name' => $name,
            'deadline' => $deadline
        ])->fresh();

        // event(new CreateOrder($order));
        Notification::send(App\User::all(), new OrderCreated($event->order));

        return $order;
    }

    /**
     * @param $root
     * @param array $args
     * @return mixed
     */
    public function update($root, array $args)
    {
        $orderId = $args['id'];
        $deadline = $args['deadline'];
        $name = $args['name'];

        return tap(Order::find($orderId))
            ->update([
                'deadline' => $deadline,
                'name' => $name
            ]);
    }

    /**
     * @param $root
     * @param array $args
     * @return mixed
     */
    public function shop($root, array $args)
    {
        $orderId = $args['id'];

        return tap(Order::find($orderId), function ($order) {
            $order->update(['status' => Order::COMPLETED]);
            event(new ShopOrder($order));
        });
    }
}
