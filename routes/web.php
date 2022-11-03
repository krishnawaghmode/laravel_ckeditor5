<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LoginController;
use App\Http\Controllers\NewsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [LoginController::class,'login_view']);
Route::post('/login', [LoginController::class,'login']);
Route::get('/logout', [LoginController::class,'logout']);

Route::get('/dashboard', [NewsController::class,'dashboard']);
Route::get('/add-news',[NewsController::class,'addnews']);
Route::post('/add_news',[NewsController::class,'add_news']);
Route::get('/newslist',[NewsController::class,'newslist']);
Route::post('/statuschange',[NewsController::class,'statuschange']);
Route::get('/edit-news-{id}',[NewsController::class,'editnews']);
Route::post('/update_news',[NewsController::class,'update_news']);

