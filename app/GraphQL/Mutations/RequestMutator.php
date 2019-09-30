<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

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
        $description = $args['description'];
        $quantity = $args['quantity'];
        $orderId = $args['order'];

        $request = auth()->user()->requests()->create([
            'description' => $description,
            'quantity' => $quantity,
            'order_id' => $orderId
        ]);

        return $request;
    }

    /**
     * @param $rootValue
     * @param array $args
     * @return mixed
     */
    public function deny($rootValue, array $args)
    {
        $requestId = $args['id'];

        $request = Request::find(1);
        $request->status = 0;
        $request->save();

        return $request;
    }
}
