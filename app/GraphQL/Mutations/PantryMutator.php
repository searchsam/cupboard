<?php

namespace App\GraphQL\Mutations;

use App\Pantry;
use Nuwave\Lighthouse\Execution\Utils\Subscription;

class PantryMutator
{
    /**
     * @param $rootValue
     * @param array $args
     * @return mixed
     */
    public function decrease($rootValue, array $args)
    {
        $pantryId = $args['id'];

        return tap(Pantry::find($pantryId), function ($pantry) {
            $pantry->decrement(['existence', Pantry::STOCK_UNIT]);
        });
    }
}
