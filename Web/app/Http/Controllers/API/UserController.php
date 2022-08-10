<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
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
}