<?php

namespace App\GraphQL\Mutations;

class OrderMutator
{
    /**
     * @param $root
     * @param array $args
     * @return mixed
     */
    public function create($root, array $args)
    {
        // TODO implement the resolver
        $deadline = $args['deadline'];

        $order = auth()->user()->orders()->create([
            'status' => 1, // deberia de ser default 1 en la migracion
            'deadline' => $deadline,
        ]);

        return $order;
    }
}
