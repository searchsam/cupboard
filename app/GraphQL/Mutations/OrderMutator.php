<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Order;

class OrderMutator
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
        $params = \Arr::only($args, ['status', 'deadline', 'user']);

        if (Order::where('status', 1)->exists()) {
            throw new CustomException(
                'Ya existe una orden activa.',
                'Solo puede existir una order activa a la vez.'
            );
        }

        if (Order::where('deadline', '>=', $params['deadline'])->exists()) {
            throw new CustomException(
                'Ya existe una orden para una fecha posterior.',
                'La fecha seleccionada esta en el rango de fecha de una orden existente.'
            );

            return null;
        }

        if ((int) $params['user']["connect"] > 1) {
            throw new CustomException(
                'Permiso denegado.',
                'Tu usuario no posee los permisos necesarios para realizar esta accion.'
            );

            return null;
        }

        $order = new Order;
        $order->status = $params['status'];
        $order->deadline = $params['deadline'];
        $order->user_id = (int) $params['user']["connect"];
        $order->save();

        return $order;
    }
}
