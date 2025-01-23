<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $products = products::CategoryRel()->get();

        if ($products->isEmpty()) {
            $data = [
                'message' => 'No hay productos registrados',
                'code' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'products' => $products,
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
            'stock' => 'required|integer',
            'category_id' => 'required|integer|exists:categories,id'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'code' => 422
            ];
            return response()->json($data, 422);
        }

        $product = products::create($request->all());

        return response()->json([
            'message' => 'Producto creado correctamente',
            'product' => $product,
            'code' => 201
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $validator = Validator::make($request->all(), [
            'stock' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'code' => 422
            ];
            return response()->json($data, 422);
        }

        $product = products::find($id);

        if (!$product) {
            $data = [
                'message' => 'Producto no encontrado',
                'code' => 404
            ];
            return response()->json($data, 404);
        }else{
            $product->stock = $request->stock;
            $product->save();
            $data = [
                'message' => 'Producto actualizado correctamente',
                'product' => $product,
                'code' => 200
            ];
            return response()->json($data, 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $product = products::find($id);

        if (!$product) {
            $data = [
                'message' => 'Producto no encontrado',
                'code' => 404
            ];
            return response()->json($data, 404);
        }else{
            $product->delete();
            $data = [
                'message' => 'Producto eliminado correctamente',
                'code' => 200
            ];
            return response()->json($data, 200);
        }
    }
}
