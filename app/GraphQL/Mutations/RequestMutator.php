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

        return auth()->user()->requests()->create([
            'description' => $description,
            'quantity' => $quantity,
            'order_id' => $orderId
        ])->fresh();
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

        return tap(Request::find($requestId), function ($request) use ($description, $quantity) {
            $request->update([
                'description' => $description,
                'quantity'    => $quantity,
            ]);
        });
    }

    /**
     * @param $rootValue
     * @param array $args
     * @return mixed
     */
    public function deny($rootValue, array $args)
    {
        $requestId = $args['id'];

        return tap(Request::find($requestId), function ($request) {
            $request->update(['status' => Request::REJECT]);
        });
    }

    /**
     * @param $rootValue
     * @param array $args
     * @return mixed
     */
    public function approve($rootValue, array $args)
    {
        $requestId = $args['id'];

        return tap(Request::find($requestId), function ($request) {
            $request->update(['status' => Request::APPROVE]);
        });
    }
}
