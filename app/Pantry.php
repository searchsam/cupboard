<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pantry extends Model
{
    /**
     * {@inheritdoc}
     */
    protected $fillable = [
        'status', 'request_id', 'existence'
    ];

    /**
     * @return BelongsTo
     */
    public function requests(): BelongsTo
    {
        return $this->belongsTo(Request::class);
    }
}
