<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pantry extends Model
{
    const SOLDOUT = 0;
    const STOCK = 1;

    /**
     * {@inheritdoc}
     */
    protected $fillable = [
        'existence', 'request_id'
    ];

    /**
     * @return BelongsTo
     */
    public function request(): BelongsTo
    {
        return $this->belongsTo(Request::class);
    }
}
