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
        ])->fresh();

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

        $request = Request::where('id', $requestId)
            ->update(['status' => Request::REJECT]);

        return $request;
    }

    /**
     * @param $rootValue
     * @param array $args
     * @return mixed
     */
    public function approve($rootValue, array $args)
    {
        $requestId = $args['id'];

        $request = Request::where('id', $requestId)
            ->update(['status' => Request::APPROVE]);

        return $request;
    }
}
