<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth, Validator, Redirect,Session; 

class NewsController extends Controller
{


    public function dashboard(Request $request){

        if(Session::has('username'))
          return view('dashboard');
        else
            return Redirect('/');
    }

    public function addnews(Request $request){

        if(Session::has('username'))
           return view('addnews');
        else
            return Redirect('/');
    }

     public function add_news(Request $request){

        if(Session::has('username')){
              $insert = DB::table('news_events')->insert([
                                    'news'=>$request->news,
                                    'user_id'=>Auth::user()->id]);
         if ($insert) {
                return redirect()->back()->with('success', 'News added');
            } else {
                return redirect()->back()->with('error', 'News not added');
            }
        }else{
            return Redirect('/');
        }
    }

    public function newslist(Request $request){
        if(Session::has('username')){
           $newslist = DB::table('news_events')->join('users','users.id','news_events.user_id')
             ->select('news_events.*','users.name')
             ->orderBy('id','desc')
             ->get();
           return view('newslist',compact('newslist'));
        }else{
            return Redirect('/');
        }
    }
    public function statuschange(Request $request){
        if(Session::has('username')){
                $update  = DB::table('news_events')->where('id',$request->id)->update(['status'=>$request->status]);
                if ($update) {
                    return response()->json(['success'=>'News status updated']);
                } else {
                    return response()->json(['error'=>'News status not updated']);
                }

        }else{
            return Redirect('/');
        }
    }
    public function editnews(Request $request){
        if(Session::has('username')){
           $data = DB::table('news_events')->where('id',$request->id)
             ->first();
           return view('edit_news',compact('data'));
        }else{
            return Redirect('/');
        }
    }

     public function update_news(Request $request){
        if(Session::has('username')){
                $update  = DB::table('news_events')->where('id',$request->id)->update(['news'=>$request->news]);
                if ($update) {
                     return redirect()->back()->with('success','News updated');
                } else {
                    return redirect()->back()->with('error','News not updated');
                }

        }else{
            return Redirect('/');
        }
    }
}
