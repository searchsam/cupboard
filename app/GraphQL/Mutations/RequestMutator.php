<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Order;
use App\Request;

class RequestMutator
{
    /**
     * @param $rootValue
     * @param array $args
     * @return mixed
     */
    public function create($rootValue, array $args)
    {
        // TODO implement the resolver
        $description = $args['description'];
        $quantity = $args['quantity'];
        $order_id = $args['order'];

        $request = auth()->user()->requests()->create([
            'description' => $description,
            'quantity' => $quantity,
            'order_id' => $order_id
        ]);;

        return $request;
    }
}
