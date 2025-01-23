<?php

use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\Api\ProductsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('categories')->group(function () {
    Route::get('/', [CategoriesController::class, 'index']);// Muestra todas las categorías

    Route::post('/', [CategoriesController::class, 'store']); // Crea a nueva categoría
});

Route::prefix('products')->group(function () {
    Route::get('/', [ProductsController::class, 'index']);// Muestra todos los productos

    Route::post('/', [ProductsController::class, 'store']); // Crea a nuevo producto

    Route::put('/{product}', [ProductsController::class, 'update']); // Actualiza el stock de un producto

    Route::delete('/{product}', [ProductsController::class, 'destroy']); // Elimina un producto
});