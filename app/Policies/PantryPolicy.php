<?php

namespace App\Policies;

use App\Pantry;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PantryPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any pantries.
     *
     * @param User $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the pantry.
     *
     * @param User   $user
     * @param Pantry $pantry
     * @return mixed
     */
    public function view(User $user, pantry $pantry)
    {
        //
    }

    /**
     * Determine whether the user can create pantrys.
     *
     * @param User $user
     * @return mixed
     */
    public function create(User $user)
    {
        return (
            $user->type == User::ADMIN ||
            $user->type == User::SUPERADMIN
        );
    }

    /**
     * Determine whether the user can update the pantry.
     *
     * @param User   $user
     * @param Pantry $pantry
     * @return mixed
     */
    public function update(User $user, Pantry $pantry)
    {
        return $pantry->existence >= Pantry::SOLDOUT_STOCK;
    }

    /**
     * Determine whether the user can delete the pantry.
     *
     * @param User   $user
     * @param Pantry $pantry
     * @return mixed
     */
    public function delete(User $user, Pantry $pantry)
    {
        //
    }

    /**
     * Determine whether the user can restore the pantry.
     *
     * @param User   $user
     * @param Pantry $pantry
     * @return mixed
     */
    public function restore(User $user, Pantry $pantry)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the pantry.
     *
     * @param User   $user
     * @param Pantry $pantry
     * @return mixed
     */
    public function forceDelete(User $user, Pantry $pantry)
    {
        //
    }
}
