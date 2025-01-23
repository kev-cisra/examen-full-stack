<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\categories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $categories = categories::all();

        if ($categories->isEmpty()) {
            $data = [
                'message' => 'No hay categorías registradas',
                'code' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'categories' => $categories,
            'code' => 200
        ];
        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'code' => 422
            ];
            return response()->json($data, 422);
        }

        $category = categories::create($request->all());

        return response()->json([
            'message' => 'Categoría creada correctamente',
            'category' => $category,
            'code' => 201
        ], 201);
    }
}
