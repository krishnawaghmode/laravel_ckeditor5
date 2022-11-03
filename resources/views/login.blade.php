<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Employee Login</title>
    <link rel="icon" href="assets/images/favicon.png" type="image/png" sizes="16x16">
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/style.css"> </head>
<body class="home">
    <div id="wrapper">
        <div id="main-content" class="container-fluid">
            <div class="row">
                <article class="col-lg-12 col-md-12 order-md-2 order-1">
                    <h2 class="site-heading text-center mt-5"><span class='badge-success badge'>Login</span></h2>
                    <hr>
                    <div class="form-container">
                         @if(count($errors)>0)
  <div class="msg alert alert-warning"> 
      <h3>
        <center>
        @foreach($errors->all() as $error)
          {{$error}}
        @endforeach
        </center>
      </h3>
  </div>
  @endif
                    <form class="form-horizontal" action="login" method="post">
                        @csrf
                        <!-- <div class="heading">Welcome</div>  -->
                        <div class="form-group">
                            <input class="form-control" name="email" placeholder="Email" type="email" autocomplete="off" required> </div>
                        <div class="form-group">
                            <input class="form-control" name="password" placeholder="Password" type="Password" autocomplete="off" required> </div>
                        <button type="submit" class="btn btn-default">Login</button>
                     </form>


                       </div>
                </article>
            </div>
        </div>
        </div>
        <script src="assets/js/jquery.min.js"></script>
</body>
</html>