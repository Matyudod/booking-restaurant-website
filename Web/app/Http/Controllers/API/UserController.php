<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\LoginResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Business\IUser;
use App\Models\User;
use Illuminate\Http\Response;

class UserController extends Controller
{
    protected $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }


    public function getCustomerList()
    {
        $users = $this->user->where('is_admin', false)->paginate(10);
        $userResource = UserResource::collection($users)->response()->getData(true);
        return response()->json($userResource, Response::HTTP_OK);
    }

    public function getAdminList()
    {
        $users = $this->user->where('is_admin', true)->paginate(10);
        $userResource = UserResource::collection($users)->response()->getData(true);
        return response()->json($userResource, Response::HTTP_OK);
    }
    public function checkLogin(Request $req)
    {
        $user = $req;
        $usernameCheck = $this->user->where('username', $user->username);
        $passwordCheck = $usernameCheck->where('password', password_hash($user->password, null));
        if ($usernameCheck->count() > 0) {
            if ($passwordCheck->count() > 0) {
                return response()->json(true, Response::HTTP_OK);
            } else {
                return response()->json([
                    "message" => "Not Error",
                    "type_message" => "error_dialog"
                ], Response::HTTP_OK);
            }
        } else {
            return response()->json(true, Response::HTTP_OK);
        }
    }
}