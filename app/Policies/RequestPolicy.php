<?php

namespace App\Policies;

use App\Order;
use App\Request;
use App\User;
use Carbon\Carbon;
use Illuminate\Auth\Access\HandlesAuthorization;

class RequestPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any requests.
     *
     * @param User $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the request.
     *
     * @param User    $user
     * @param Request $request
     * @return mixed
     */
    public function view(User $user, Request $request)
    {
        //
    }

    /**
     * Determine whether the user can create requests.
     *
     * @param User  $user
     * @param Order $order
     * @return mixed
     */
    public function create(User $user, Order $order)
    {
        return (
            $order->status == Order::ACTIVE &&
            Carbon::now() <= $order->deadline
        );
    }

    /**
     * Determine whether the user can update the request.
     *
     * @param User    $user
     * @param Request $request
     * @return mixed
     */
    public function update(User $user, Request $request)
    {
        return $request->order->status == Order::ACTIVE;
    }

    /**
     * Determine whether the user can delete the request.
     *
     * @param User    $user
     * @param Request $request
     * @return mixed
     */
    public function delete(User $user, Request $request)
    {
        //
    }

    /**
     * Determine whether the user can restore the request.
     *
     * @param User    $user
     * @param Request $request
     * @return mixed
     */
    public function restore(User $user, Request $request)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the request.
     *
     * @param User    $user
     * @param Request $request
     * @return mixed
     */
    public function forceDelete(User $user, Request $request)
    {
        //
    }
}
