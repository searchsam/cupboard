<?php

namespace App\GraphQL\Mutations;

use App\Request;
use Nuwave\Lighthouse\Execution\Utils\Subscription;

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
        $orderId = $args['order_id'];

        $request = auth()->user()->requests()->create([
            'description' => $description,
            'quantity' => $quantity,
            'order_id' => $orderId
        ])->fresh();

        Subscription::broadcast('requestCreated', $request);

        return $request;
    }

    /**
     * @param $rootValue
     * @param array $args
     * @return mixed
     */
    public function update($rootValue, array $args)
    {
        $requestId = $args['id'];
        $description = $args['description'];
        $quantity = $args['quantity'];

        $request = tap(Request::find($requestId))
            ->update([
                'description' => $description,
                'quantity' => $quantity,
            ]);

        Subscription::broadcast('requestCreated', $request);

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

        $request = tap(Request::find($requestId))
            ->update(['status' => Request::REJECT]);

        Subscription::broadcast('requestCreated', $request);

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

        $request = tap(Request::find($requestId))
            ->update(['status' => Request::APPROVE]);

        Subscription::broadcast('requestCreated', $request);

        return $request;
    }
}
