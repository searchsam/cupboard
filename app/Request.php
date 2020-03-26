<?php

namespace App;

use Doctrine\DBAL\Query\QueryBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Request extends Model
{
    /**
     * Request Status Values
     *
     * @var int
     */
    const REJECT = 0;
    const APPROVE = 1;
    const WAITING = 2;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'order_id',
        'description',
        'quantity',
        'status'
    ];

    /**
     * @param $query
     * @return QueryBuilder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', Request::APPROVE);
    }

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
