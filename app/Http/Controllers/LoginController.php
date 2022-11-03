<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Schema;
use App\Http\Controllers\Cache;
use App\Http\Controllers\Cookie;
use App\Http\Controllers\Controller;
use Auth, Validator, Redirect,Session; 
use Illuminate\Http\Request;
use App\Models\User;

class LoginController extends Controller
{
    
    public function __construct()
    {
        $this->middleware('auth', ['only' => 'store']);
    }
    public function login_view(Request $request){

        if(Session::has('username'))
           return Redirect::to('/dashboard');
        else
            return view('login');
    }
    public function login(Request $request){
        $rules = array(
        'email'    => 'required|email', 
        'password' => 'required' 
        );

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return Redirect::to('/')
            ->withErrors($validator)
            ->withInput();; 
        } 
        else {

            $userdata = array(
            'email'     => $request->email,
            'password'  => $request->password
            );
             if (Auth::attempt($userdata)) {
                $user = Auth::user();
                $username = $user->name;
                $email = $user->email;
                $password = $user->password;
                Session::put('username',$username);
                Session::put('email',$email);
                Session::put('password',$password);
                return Redirect::to('/dashboard');
            }
            else {  
                return redirect()->back()->with('status','Invalid Username or Password.');
            }

        }
        return 'success';
    }
    public function logout(Request $request)
    {
        Auth::logout();
        \Cache::flush();
        Session::forget('username');
        Session::forget('email');
        Session::forget('password');
        Session::flush();
        return redirect('/')->withCookie(\Cookie::forget('laravel_token'))->with('action','Successfully Logout');
    }
}
