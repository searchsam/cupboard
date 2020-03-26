<?php

namespace App\GraphQL\Mutations;

use App\Events\CreateNewOrder;
use App\Events\ShopOrder;
use App\Order;

class OrderMutator
{

    /**
     * @param       $rootValue
     * @param array $args
     * @return mixed
     */
    public function create($rootValue, array $args)
    {
        $deadline = $args['deadline'];
        $name = $args['name'];

        $order = auth()->user()->orders()->create([
            'name'     => $name,
            'deadline' => $deadline
        ])->fresh();

        event(new CreateNewOrder($order));

        return $order;
    }

    /**
     * @param       $rootValue
     * @param array $args
     * @return mixed
     */
    public function update($rootValue, array $args)
    {
        $orderId = $args['id'];
        $deadline = $args['deadline'];
        $name = $args['name'];

        return tap(Order::find($orderId), function ($order) use ($deadline, $name) {
            $order->update([
                'deadline' => $deadline,
                'name'     => $name
            ]);
        });
    }

    /**
     * @param       $rootValue
     * @param array $args
     * @return mixed
     */
    public function shop($rootValue, array $args)
    {
        $orderId = $args['id'];

        return tap(Order::find($orderId), function ($order) {
            $order->update(['status' => Order::COMPLETED]);
            event(new ShopOrder($order));
        });
    }
}
