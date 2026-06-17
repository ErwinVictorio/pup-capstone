<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Faculty extends Model
{
    use HasFactory;

    protected $table = 'faculty';

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone_number',
        'academic_program',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
