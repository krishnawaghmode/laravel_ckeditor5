@extends('layouts.app')
@section('title', 'Edit news')
@section('content')
                <h1 class="mt-4">Edit </h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item active">News & Event</li>
                </ol>

                <section class="content">
                @if(session('success'))
                <div class="alert alert-success">
                    {{session('success')}}
                </div> 
                @endif

               @if(session('error'))
                <div class="alert alert-danger">
                   {{session('error')}}
                </div> 
              @endif

            <div class="container">
                  <form method="post" action="update_news">
                    @csrf
                    <input type="hidden" name="id" value="{{$data->id}}">
                    <div class="row mb-3">
                      <div class="col-md-8">
                        <div class="form-group">
                         <textarea name="news" id="editor">{{$data->news}}</textarea>
                        </div>
                      </div>
                    
                    </div>
                   <a href='newslist' class='btn btn-secondary'>Back</a>
                 <button type="submit" class="btn btn-primary">Update</button>
            </form>
          </div>
@endsection
@section('js')
        <script>
            ClassicEditor
            .create( document.querySelector( '#editor' ), {
                toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                    ]
                }
            } )
            .catch( error => {
                console.log( error );
            } );
    </script>
    @endsection