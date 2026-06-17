<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'name',
        'email',
        'password',
        'role',
        'status',
        'avatar_path',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function faculty(): HasOne
    {
        return $this->hasOne(Faculty::class);
    }

    public function qacPersonnel(): HasOne
    {
        return $this->hasOne(QacPersonnel::class);
    }

    public function accreditor(): HasOne
    {
        return $this->hasOne(Accreditor::class);
    }

    public function accreditationAssignments(): HasMany
    {
        return $this->hasMany(AccreditationAssignment::class, 'assigned_user_id');
    }

    public function uploadedDocuments(): HasMany
    {
        return $this->hasMany(Document::class, 'uploaded_by');
    }

    public function documentEvaluations(): HasMany
    {
        return $this->hasMany(DocumentEvaluation::class, 'evaluated_by');
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    public function generatedReports(): HasMany
    {
        return $this->hasMany(Report::class, 'generated_by');
    }

    public function systemEvents(): HasMany
    {
        return $this->hasMany(SystemEvent::class, 'created_by');
    }
}
