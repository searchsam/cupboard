<?php

namespace App\GraphQL\Mutations;

use App\Order;
use App\Events\ShopOrder;

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

        return $order;
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
