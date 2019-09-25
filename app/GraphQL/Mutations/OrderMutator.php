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
        // TODO implement the resolver
        $deadline = $args['deadline'];

        // TODO Validar existe orden activa

        // TODO Validar fecha no se sobrepongan

        // TODO Validar usuario es administrador

        $order = new Order;
        $order->status = 1;
        $order->deadline = $deadline;
        $order->user_id = auth()->user()->id;
        $order->save();

        return $order;
    }
}
