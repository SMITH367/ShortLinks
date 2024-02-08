<?php


use App\Http\Controllers\URLController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
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

//Routes for simple user managment, register and login
Route::post("/register",[UsersController::class,"register"]);
Route::post("/login",[UsersController::class,"login"]);


//Middelware with the protected and auth routes
Route::group(['middleware' => ['auth:sanctum']], function(){

    //Routes for view profile and close sesion
    Route::get('profile', [UsersController::class, 'userProfile']);
    Route::post('logout', [UsersController::class, 'logout']);

    //Routes for the api URLShorter
    Route::apiResource('/url',URLController::class);
    Route::post("url/findbyuser",[URLController::class,"findUrlsByUser"]);
    Route::get("url/stats/{id}",[URLController::class,"shortlyStats"]);
});

//Create short url for guest users
Route::post("url/createshly",[URLController::class,"createGuest"]);


