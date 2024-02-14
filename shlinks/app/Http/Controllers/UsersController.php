<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;


class UsersController extends Controller
{
    //
    public function login(Request $request){
        $credencials = $request->validate([
            "email"=>["required","email"],
            "password"=>["required"],
        ]);

        if(Auth::attempt($credencials)){
            $user = Auth::user();
            $token = $user -> createToken("token")->plainTextToken;
            return response(["token"=>$token, "userData" => $user], Response::HTTP_OK);
        } else {
            return response(["error"=> "Invalid user or password"], Response::HTTP_UNAUTHORIZED);
        }
    }

    public function register(Request $request){
        $request ->validate([
            "email"=> "required|email|unique:users",
            "name"=>"required",
            "password"=>"required|confirmed",

        ]);
        $user = new User();
        $user ->name = $request-> name;
        $user ->email = $request->email;
        $user ->password = Hash::make($request->password);
        $user ->save();

        return response($user,Response::HTTP_CREATED);
    }

    public function userProfile (Request $request){
        return response()->json([
            "message" => "userProfile OK",
            "userData" => auth()->user()
        ], Response::HTTP_OK);
       }


    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response(["message"=>"Cierre de sesión OK"], Response::HTTP_OK);
    }

    public function allUsers() {
       $users = User::all();
       return response()->json([
        "users" => $users
       ]);
    }
}
