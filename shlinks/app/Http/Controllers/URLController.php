<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use AshAllenDesign\ShortURL\Models\ShortURL;
use AshAllenDesign\ShortURL\Facades\ShortURL as ShortUrlBuilder;

class URLController extends Controller
{
    //Getting all URLS
    public function index(Request $request)
    {
        return ShortURL::All();
    }
    //Save urlshorted for users
    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required',
            'url'=>'required',
            'personalized_slug'=> 'required',
        ]);

        $user = $request->user_id;

        $shortURL = ShortUrlBuilder::destinationUrl($request->url)
            ->beforeCreate(function (ShortURL $model) use ($user): void {
                $model->user = $user;
            })
            ->urlKey($request->personalized_slug)
            ->redirectStatusCode(302)
            ->make();
        return response()->json([
            "message" => $shortURL,
        ]);

    }
    //Short url shorted for guest users
    public function createGuest(Request $request)
    {
        $this->validate($request, [
            'url'=>'required',
        ]);

        $user = "guest@guest.com";

        $shortURL = ShortUrlBuilder::destinationUrl($request->url)
            ->beforeCreate(function (ShortURL $model) use ($user): void {
                $model->user = $user;
            })
            ->make();
        return response()->json([
            "message" => $shortURL,
        ]);

    }
    //show data about shorted url
    public function show($id)
    {
        return ShortURL::findByKey($id);
    }
    //Show stats about short urls
    public function shortlyStats($id)
    {
        $visits = ShortURL::findByKey($id);
        return $visits->visits;
    }
    //find urls shorted by the user
    public function findUrlsByUser(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required',
        ]);

        $userUrls = ShortUrl::where('user',$request->user_id)->get();
        return $userUrls;
    }
    //Update destinatuon url using url key
    public function update(Request $request, $id)
    {
            $this->validate($request, [
                'destination_url' => 'required',
            ]);

            $model =ShortURL::findByKey($id);
            $model->destination_url = $request->destination_url;
            $model->save();
            return $model;
    }
    //Delete an url using url key
    public function destroy($id)
    {
        $URLModel = ShortURL::findByKey($id);
        if (is_null($URLModel)) {
            return response()->json("URL don't exist", 404);
        }

        $URLModel->delete();
        return response()->json(['message' => 'URL has been deleted']);
    }

}
