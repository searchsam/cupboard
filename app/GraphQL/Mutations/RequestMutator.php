<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Order;
use App\Request;

class RequestMutator
{
    public function create($rootValue, array $args)
    {
        $description = $args['description'];
        $quantity = $args['quantity'];

        // TODO Validar existe una orden activa

        $order = Order::where('status', 1)->first();

        $request = new Request;
        $request->description = $description;
        $request->quantity = $quantity;
        $request->user_id = auth()->user()->id;
        $request->order_id = $order->id;
        $request->save();

        return $request;
    }
}
