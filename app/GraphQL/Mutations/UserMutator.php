<?php

namespace App\GraphQL\Mutations;

use App\User;

class UserMutator
{

    /**
     * @param       $rootValue
     * @param array $args
     * @return mixed
     */
    public function doAdmin($rootValue, array $args)
    {
        $userId = $args['id'];

        return tap(User::find($userId), function ($user) {
            $user->update(['type' => User::ADMIN]);
        });
    }
}
