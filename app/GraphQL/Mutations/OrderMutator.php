<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Order;

class OrderMutator
{

    public function create($rootValue, array $args)
    {

        $deadline = $args['deadline'];

        if (Order::where('status', 1)->exists()) {
            throw new CustomException(
                'Ya existe una orden activa.',
                'Solo puede existir una order activa a la vez.'
            );
        }

        if (Order::where('deadline', '>=', $deadline)->exists()) {
            throw new CustomException(
                'Ya existe una orden para una fecha posterior.',
                'La fecha seleccionada esta en el rango de fecha de una orden existente.'
            );

            return null;
        }


        $order = new Order;
        $order->status = 1;
        $order->deadline = $deadline;
        $order->user_id = auth()->user()->id;
        $order->save();

        return $order;
    }
}
