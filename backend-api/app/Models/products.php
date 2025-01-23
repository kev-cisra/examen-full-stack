<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class products extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'products';

    protected $fillable = [
        'name',
        'stock',
        'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(categories::class, 'category_id');
    }

    public function scopeCategoryRel($q)
    {
        return $q->with([
            "category" => function ($q) {
                $q->select('id', 'name');
            }
        ]);
    }
}
