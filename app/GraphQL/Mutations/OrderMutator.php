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
        $deadline = $args['deadline'];
        $name = $args['name'];

        $order = auth()->user()->orders()->create([
            'name' => $name,
            'deadline' => $deadline
        ])->fresh();

        return $order;
    }
}
