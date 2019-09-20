<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Call;
use App\Order;
use App\Request;

class CallMutator
{
    /**
     * Return a value for the field.
     *
     * @param  null  $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param  mixed[]  $args The arguments that were passed into the field.
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context Arbitrary data that is shared between all fields of a single query.
     * @param  \GraphQL\Type\Definition\ResolveInfo  $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return mixed
     */
    public function __invoke($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        // TODO implement the resolver
    }

    public function create($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        // TODO implement the resolver
        $params = \Arr::only($args, ['request']);

        if (! Order::where('status', 1)->exists()) {
            throw new CustomException(
                'No existe una orden activa.',
                'Para poder crear solicitudes debe exister una orden activa.'
            );
        }

        $order = Order::where('status', 1)->first();
        
        $request = new Request;
        $request->user_id = (int) $params['request']["create"]["user"]["connect"];
        $request->save();

        $call = new Call;
        $call->order_id = $order->id;
        $call->request_id = $request->id;
        $call->save();

        return $call;
    }
}
