@extends('layouts.app')
@section('title', 'List news')
@section('content')
<meta name="csrf-token" content="{{ csrf_token() }}">
                        <h1 class="mt-4">List</h1>
                       <!--  <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">News & Event</li>
                        </ol> -->
                      
                       
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                               News & Events list
                            </div>
                            <div class="card-body">
                                <table id="datatablesSimple">
                                    <thead>
                                        <tr>
                                            <th>Sr.No</th>
                                            <th>News & Events</th>
                                            <th>User Name</th>
                                            <th>Created Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                  <!--   <tfoot>
                                        <tr>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Office</th>
                                            <th>Age</th>
                                            <th>Start date</th>
                                            <th>Salary</th>
                                        </tr>
                                    </tfoot> -->
                                    <tbody>
                                         <?php $i=1;?>
                                        @foreach($newslist as $list)
                                        <tr>
                                            <td>{{$i++}}</td>
                                            <td>{!! $list->news !!}</td>
                                            <td>{{$list->name}}</td>
                                            <td>{{date('d-m-Y',strtotime($list->created_at))}}</td>
                                            <td>
                                                <a href='edit-news-{{$list->id}}' class='btn btn-sm btn-primary'>Edit</a>
                                                @if($list->status == 0)
                                                <a href='#' class='btn btn-sm btn-warning status' data-status="1" data-id="{{$list->id}}">Unpublish</a>
                                                @else
                                                <a href='#' class='btn btn-sm btn-success status' data-status="0" data-id="{{$list->id}}">Publish</a>
                                                @endif
                                               <!--  <a href='#' class='btn btn-sm btn-danger status m-1' data-status="2" data-id="{{$list->id}}">Delete</a> -->
                                            </td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
@endsection

@section('js')
<script type="text/javascript">
    $(document).ready(function(){
            $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
    });
    });
     $(document).on('click', '.status', function() {
        var id = $(this).data('id');
        var status = $(this).data('status');
        var ajaxurl = 'statuschange';
        // var del = '';
        // if(status == 2){
        //    del = confirm('are you sure delete!!');
        // }
        // if(del){
        //     return false;
        // }
        $.ajax({
            type: 'post',
            url: ajaxurl,
            data: {id:id,status:status},
            dataType: 'json',
            success: function (data) {
               if(data.success){
                  location.reload();
               }
            },
            error: function (data) {
                console.log(data);
            }
        });
    });
                   
             

   
</script>
@endsection