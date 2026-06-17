<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Accreditation extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'status',
        'start_date',
        'end_date',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(AccreditationAssignment::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }
}
