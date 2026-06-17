<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'accreditation_id',
        'uploaded_by',
        'file_name',
        'file_path',
        'upload_date',
    ];

    protected function casts(): array
    {
        return [
            'upload_date' => 'datetime',
        ];
    }

    public function accreditation(): BelongsTo
    {
        return $this->belongsTo(Accreditation::class);
    }

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function evaluations(): HasMany
    {
        return $this->hasMany(DocumentEvaluation::class);
    }
}
