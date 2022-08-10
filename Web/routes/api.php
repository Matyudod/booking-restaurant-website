<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return '$request->user()';
// });

// Route::apiResource('/user', App\Http\Controllers\API\UserController::class);


//Dashboard API

Route::controller(UserController::class)->group(function () {
    Route::get('/customer-list', 'getCustomerList');
    Route::get('/admin-list', 'getAdminList');
});