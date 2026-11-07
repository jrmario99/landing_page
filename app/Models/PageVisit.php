<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageVisit extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'action', 'ip_address', 'user_agent', 'referrer',
        'screen', 'language', 'links', 'duration',
        'country', 'country_code', 'city',
    ];

    protected $casts = [
        'links' => 'array',
        'created_at' => 'datetime',
    ];
}
