<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{HasMany, HasOne};

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'user_id'
    ];

    public function wish(): HasOne
    {
        return $this->hasOne(Wish::class);
    }

    public function facts(): HasMany
    {
        return $this->hasMany(Fact::class);
    }
}
