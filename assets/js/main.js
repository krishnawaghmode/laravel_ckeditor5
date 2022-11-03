$(document).ready(function(){
    //site url
    var base_url = 'https://www.sitename.com/';


    //script for side menu
    $('.toggle-side-menu').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('#course-menu').removeClass('show-menu');
        }else{
            $(this).addClass('active');
            $('#course-menu').addClass('show-menu');
        }
    });



    //script for screenshot
    //copy screenshot link on click
    $('.copy-link').click(function(){
        copy_to_clipboard($(this).data('copy'));
    });
     //function for copy to clipboard
    function copy_to_clipboard(str) {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    //function for remove screenshot by user : screenshot
    $('.remove-screenshot').click(function(){
        var el = $(this);
        var id = $(this).attr('data-id');
        var img = $(this).attr('data-image');
        if(confirm('Are you sure want to delete this image ?')){
            $.ajax({
                url: base_url+'screenshot/remove',
                type: 'POST',
                data: {s_id:id,img:img},
                success: function(response){
                    if(response == 'true'){
                        el.parent().parents().parents('.screenshot-content').parent().remove();
                    }
                }
            })
        }

    });

    //script for add table class in single chapter page
    $('.description table').addClass('table');
    //script for add tryit_code class on tryit button in single chapter page
    $('.description a').each(function(){
        if(this.hasAttribute('data-class')){
            $(this).addClass('tryit_code');
        }
    })

    //script for add codelab in favourites  : Home
    $(document).on('click','.fav-codelab',function (e) {
        e.preventDefault();
        if (!this.hasAttribute("data-user")) {
            window.location.replace('<?php echo base_url() ?>user/login');
        }else{
            var user = $(this).attr('data-user');
            var clicked = $(this);
            if (clicked.hasClass('active')) {
                var status = '0';
            } else {
                var status = '1';
            }
            var id = $(this).attr('data-id');
            $.ajax({
                url: base_url+"lab/add-favorites",
                type: "POST",
                data: {id: id, user: user, status: status},
                success: function (data) {
                    if (data == 'true') {
                        window.setTimeout('location.reload()', 100);
                    }
                }
            });
        }
    });

    //script for increase click count : Home
    $('.snippet-box .snippet-view,.snippet-box .snippet-title').click(function () {
        var id = $(this).attr('data-id');
        $.ajax({
            url: base_url+"lab/clicks_codelab",
            type: "POST",
            data: {id: id},
            success: function (data) {
                if (data == 'true') {
                    window.setTimeout('location.reload()', 100);
                }
            }
        });
    });

    //script for add templates in favorite list : Home
    $('.like-template').click(function (e) {
        e.preventDefault();
        if (!this.hasAttribute("data-user")) {
            window.location.replace(base_url+'user/login');
        }else{
            var user = $(this).attr('data-user');
            var clicked = $(this);
            if (clicked.hasClass('active')) {
                var status = '0';
            } else {
                var status = '1';
            }
            var id = $(this).attr('data-id');
            $.ajax({
                url: base_url+"home/add_template_favorites",
                type: "POST",
                data: {id: id, user: user, status: status},
                success: function (data) {
                    if (data == 'true') {
                        window.setTimeout('location.reload()', 100);
                    }
                }
            });
        }
    });

    //script for add code project in favourite list : Home
    $('.like-project').click(function (e) {
        e.preventDefault();
        if (!this.hasAttribute("data-user")) {
            window.location.replace(base_url+'user/login');
        }else{
            var user = $(this).attr('data-user');
            var clicked = $(this);
            if (clicked.hasClass('active')) {
                var status = '0';
            } else {
                var status = '1';
            }
            var id = $(this).attr('data-id');
            $.ajax({
                url: base_url+"home/add_project_favorites",
                type: "POST",
                data: {id: id, user: user, status: status},
                success: function (data) {
                    if (data == 'true') {
                        window.setTimeout('location.reload()', 100);
                    }
                }
            });
        }
    });

    //script for insert code project comment : Users
    $(document).on('submit','#add-project-comment',function(e){
        e.preventDefault();
        var comment = $('.comment-info').val();
        var post = $('.post-id').val();
        var parent = $('#parent-id').val();
        var user = $('.username').val();
        if(user == ''){
            window.location.href = base_url+"user/login";
        }else if(comment == ''){
            $('.has-error').text('This Field is required');
        }else{
            $.ajax({
                url: base_url+"add-project-comments",
                type: "POST",
                data: {user:user,post:post,comment:comment,parent:parent},
                success: function (data) {
                    if(data == 'true'){
                        $('.comment-info').val('');
                        $('#add-project-comment').append('<div class="alert alert-info">'+
                        '<strong>Your Comment Under Authorization Process</strong>'+
                        '</div>');
                        $('.alert.alert-info').delay(10000).fadeOut();

                    }else{
                        $('.comment-info').val('');
                        $('#add-project-comment').append('<div class="alert alert-info">'+
                        '<strong>'+data+'</strong>'+
                        '</div>');
                        $('.alert.alert-info').delay(2000).fadeOut();
                    }

                }
            });
        }
    });

    //script for add form for code project comment reply
    $('.project-comment-reply').on('click',function(){
        var user = $(this).attr('data-user');
        if(user == ''){
            window.location.replace(base_url+'user/login');
        }else{
            var ids = $(this).attr('data-id');
            var post = $(this).attr('data-post');
            $('.web-trend-comments .comment-form-container').remove();

            var html = '<div class="comment-form-container"><form id="add-project-comment" class="form-horizontal" method="post">'+
                '<h4>Add Comment</h4>'+
                '<div class="form-group">'+
                '<input type="hidden" class="username" value="'+user+'"/>'+
                '<input type="hidden" class="post-id" value="'+post+'"/>'+
                '<textarea class="form-control comment-info" name="" id="" cols="30" rows="2" required></textarea>'+
                '<span class="has-error"></span>'+
                '</div>'+
                '<input type="hidden"  id="parent-id" value="'+ids+'"/>'+
                '<button type="submit" class="btn btn-primary">Submit</button>'+
                '</form>'+
                '</div>';

            $(this).parent('.comment-content').append(html);
        }
    });

    //script for add tutorial in favourite list : Home
    $('.add-fav-tutorial').click(function (e) {
        e.preventDefault();
        if (!this.hasAttribute("data-user")) {
            window.location.replace(base_url+'user/login');
        }else{
            var user = $(this).attr('data-user');
            var clicked = $(this);
            if (clicked.hasClass('active')) {
                var status = '0';
            } else {
                var status = '1';
            }
            var id = $(this).attr('data-id');
            $.ajax({
                url: base_url+"home/add_tutorial_favorites",
                type: "POST",
                data: {id: id, user: user, status: status},
                success: function (data) {
                    if (data == 'true') {
                        window.setTimeout('location.reload()', 100);
                    }
                }
            });
        }
    });

    //script for insert tutorial comments : Home
    $('body').on('click','.submit-comment',function(){
        var body = $('#comment-body').val();
        var user = $('#user').val();
        var post_id = $('#post-id').val();
        var parent_id = $('#parent-id').val();
        if(body == ''){
            $('#comment-body').next('has-error').text('This field is required.');
        }else{
            $.ajax({
                url  : base_url+"home/add_comment",
                type : "POST",
                data : {user:user,body:body,post_id:post_id,parent_id:parent_id},
                success : function(data){
                    if(data == 'true'){
                        $('.comment-form-container').append('<div class="alert alert-info">'+
                        '<strong>Your Comment Under Authorization Process</strong>'+
                        '</div>');
                        window.setTimeout('location.reload()', 1000);
                    }else{
                        $('.comment-form-container').append('<div class="alert alert-info">'+
                        '<strong>'+data+'</strong>'+
                        '</div>');
                    }
                }
            });
        }
    });
    /* script for leave reply on  comment*/
    $('.tutorial-comment-reply').on('click',function(){
        var user = $(this).attr('data-user');
        if (user == ''){
            window.location.replace(base_url+'user/login');
        }else{
            var id2 = $(this).attr('data-id');
            var post = $(this).attr('data-post');
            $('.comment-container .comment-form-container').remove();
            var data = '<div class="comment-form-container">' +
                '<h4>Leave a comment</h4>' +
                '<form class="form-horizontal row comment-form" id="" method="POST">' +
                '<div class="form-group col-12">' +
                '<label for="">Comment</label>' +
                '<textarea class="form-control" name="body" id="comment-body" cols="30" rows="2"></textarea>' +
                '</div>' +
                '<input type="hidden"  id="user" value="'+user+'"/>' +
            '<input type="hidden" name="post_id" id="post-id" value="'+post+'"/>' +
            '<input type="hidden" name="parent_id" id="parent-id" value="' + id2 + '"/>' +
            '<div class="form-group col-12">' +
            '<button type="button" class="btn btn-sm btn-info submit-comment">Add Comment</button>' +
            '</div>' +
            '</form>' +
            '</div>';
            $(this).parent('.comment-content').append(data);
        }
    });


    //show input box for modify user details in profile page
    $('.user-edit-input').hide();
    $('.edit-detail-user').click(function(){
        $(this).siblings('.user-edit-input').slideToggle().show();
    });

    //script for update user profile details : Users
    $('.modify-user-edit').on('click',function(){
        $('.text-danger').hide();
        var d = $(this).parent().siblings('.user-edit-detail');
        var val = d.val();
        if(val == ''){
            var html = '<span class="text-danger" style="display: block;">This Field is Required.</span>'
            $(this).parents('.list-content').append(html);
        }else if((d.hasClass('user-first') || d.hasClass('user-last')) && val.length > 50){
            var html = '<span class="text-danger" style="display: block;">Maximum number of characters is 50</span>'
            $(this).parents('.list-content').append(html);
        }else if(d.hasClass('user-phone') && (!$.isNumeric(val) || val.length != 10)){
            var html = '<span class="text-danger" style="display: block;">Please Enter Correct Phone Number</span>'
            $(this).parents('.list-content').append(html);
        }else{
            if(d.hasClass('user-first')){
                var full_name = val;
            }else{
                full_name = $('.user-first').val();
            }
            if(d.hasClass('user-last')){
                var display_name = val;
            }else{
                display_name = $('.user-last').val();
            }
            if(d.hasClass('user-phone')){
                var phone = val;
            }else{
                phone = $('.user-phone').val();
            }
            $.ajax({
                url  : base_url+"users/modify_user_profile",
                type : "POST",
                data : {full_name:full_name,display_name:display_name,phone:phone},
                success : function(data){
                    if(data == 'true'){
                        window.setTimeout('location.reload()', 300);
                    }
                }
            });
        }
    });

    //trigger to input file click
    $('.change-profile-pic').click(function(){
        $('.user-new-pic').click();
    });

    //script for update user Image : Users
    $(document).on('change', '#file', function(){
        var name = document.getElementById("file").files[0].name;
        var form_data = new FormData();
        var ext = name.split('.').pop().toLowerCase();
        if(jQuery.inArray(ext, ['gif','png','jpg','jpeg']) == -1)
        {
            alert("Invalid Image File");
        }
        else
        {
            form_data.append("file", document.getElementById('file').files[0]);
            form_data.append("old_file", document.getElementById('old-file').value);
            $.ajax({
                url: base_url+"users/modify_user_pic",
                method: "POST",
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                success:function(data)
                {
                    window.setTimeout('location.reload()', 300);
                }
            });
        }
    });

    //add active class on fav-list first li in user favourites page
    $('.fav-list li:first a').addClass('active');

    //load user favourites on click
    $('.fav-list li a').click(function(e){
        e.preventDefault();
        var name = $(this).attr('data-content');

        $('.fav-list li a').removeClass('active');

        $(this).addClass('active');

        if(name == 'web-trends'){
            var loader = '<div class="loading">' +
                '<div class="preloader">' +
                '<div class="spinner"></div>' +
                '<div class="spinner-2"></div>' +
                '</div>' +
                '</div>';
            $('.post-container').append(loader);
            $.ajax({
                url: base_url+"user-favorite-web-trends",
                method:"POST",
                success:function(data)
                {
                    setTimeout(function(){
                        $('.post-container').html(data).fadeIn('slow');
                    },1000);
                }
            });
        }else if(name == 'code-projects'){
            var loader = '<div class="loading">' +
                '<div class="preloader">' +
                '<div class="spinner"></div>' +
                '<div class="spinner-2"></div>' +
                '</div>' +
                '</div>';
            $('.post-container').append(loader);
            $.ajax({
                url: base_url+"user-favorite-code-projects",
                method:"POST",
                success:function(data)
                {
                    setTimeout(function(){
                        $('.post-container').html(data).fadeIn('slow');
                    },1000);
                }
            });
        }else if(name == 'tutorials'){
            var loader = '<div class="loading">' +
                '<div class="preloader">' +
                '<div class="spinner"></div>' +
                '<div class="spinner-2"></div>' +
                '</div>' +
                '</div>';
            $('.post-container').append(loader);
            $.ajax({
                url: base_url+"user-favorite-tutorials",
                method:"POST",
                success:function(data)
                {
                    setTimeout(function(){
                        $('.post-container').html(data).fadeIn('slow');
                    },1000);
                }
            });
        }else if(name == 'templates'){
            var loader = '<div class="loading">' +
                '<div class="preloader">' +
                '<div class="spinner"></div>' +
                '<div class="spinner-2"></div>' +
                '</div>' +
                '</div>';
            $('.post-container').append(loader);
            $.ajax({
                url: base_url+"user-favorite-templates",
                method:"POST",
                success:function(data)
                {
                    setTimeout(function(){
                        $('.post-container').html(data).fadeIn('slow');
                    },1000);
                }
            });
        }else if(name == 'codelab'){
            var loader = '<div class="loading">' +
                '<div class="preloader">' +
                '<div class="spinner"></div>' +
                '<div class="spinner-2"></div>' +
                '</div>' +
                '</div>';
            $('.post-container').append(loader);
            $.ajax({
                url: base_url+"user-favorite-codelab",
                method:"POST",
                success:function(data)
                {
                    setTimeout(function(){
                        $('.post-container').html(data).fadeIn('slow');
                    },1000);
                }
            });
        }else{
            window.setTimeout('location.reload()', 300);
        }
    });


    //script for increase web trend rating : users
    $('.rat_up_btn').click(function () {
        var user = $(this).attr('data-user');
        if (user == '') {
            window.location.href = base_url+'user/login';
        } else {
            var id = $(this).attr('data-id');
            var rating = $(this).attr('data-vote');
            $.ajax({
                url: base_url+"users/rating_web_trend",
                type: "POST",
                data: {rating: rating, id: id, user: user},
                success: function (data) {
                    if (data == 'true') {
                        window.setTimeout('location.reload()', 100);
                    }
                }
            });
        }
    });

    ///script for decrease web trend rating : users
    $('.rat_down_btn').click(function () {

        var user = $(this).attr('data-user');
        if (user == '') {
            window.location.href = base_url+'user/login';
        } else {
            var id = $(this).attr('data-id');
            var rating = $(this).attr('data-vote');
            $.ajax({
                url: base_url+"users/rating_web_trend",
                type: "POST",
                data: {rating: rating, id: id, user: user},
                success: function (data) {
                    if (data == 'true') {
                        window.setTimeout('location.reload()', 100);
                    }
                }
            });
        }
    });

    //script for increase web trend click count : users
    $('.web-trend-detail .post-content h3').click(function () {
        var id = $(this).attr('data-id');
        $.ajax({
            url: base_url+"users/clicks_web_trend",
            type: "POST",
            data: {id: id},
            success: function (data) {
                if (data == 'true') {
                    window.setTimeout('location.reload()', 100);
                }
            }
        });
    });

    //script for add web trend in favourite list : Users
    $('.add-to-favorite').click(function (e) {
        e.preventDefault();
        var user = $(this).attr('data-user');
        if (user == '') {
            window.location.href = base_url+'user/login';
        } else {
            var clicked = $(this);
            if (clicked.hasClass('active')) {
                var status = '0';
            } else {
                var status = '1';
            }
            var id = $(this).attr('data-id');
            $.ajax({
                url: base_url+"users/add_favorites",
                type: "POST",
                data: {id: id, user: user, status: status},
                success: function (data) {
                    if (data == 'true') {
                        window.setTimeout('location.reload()', 100);
                    }
                }
            });
        }
    });

    //filter web trends : Home
    function web_trend_filter(page) {
        var loader = '<div class="loading">' +
            '<div class="preloader">' +
            '<div class="spinner"></div>' +
            '<div class="spinner-2"></div>' +
            '</div>' +
            '</div>';
        $('#web-trend-container').append(loader);
        var values = $('select#sorting-web-trend').children('option:selected').val();
        $.ajax({
            url: base_url+"home/filter_web_trend",
            type: "POST",
            data: {page: page, values: values},
            success: function (data) {
                setTimeout(function () {
                    $("#web-trend-container").empty();
                    $('#web-trend-container').html(data);
                }, 700);

            }
        });
    }

    $('select#sorting-web-trend').change(function () {
        web_trend_filter(0);
    });

    //script for insert comment on web trend : Users
    $(document).on('submit','#add-web-trend-comment',function(e){
        e.preventDefault();
        var comment = $('.comment-info').val();
        var post = $('.post-id').val();
        var parent = $('#parent-id').val();
        if(comment == ''){
            $('.has-error').text('Please Fill This Field');
        }
        var user = $('.username').val();
        if(user == ''){
            window.location.href = base_url+'user/login';
        }else{
            $.ajax({
                url: base_url+"add-web-trend-comments",
                type: "POST",
                data: {user:user,post:post,comment:comment,parent:parent},
                success: function (data) {
                    if(data == 'true'){
                        window.setTimeout('location.reload()', 800);
                        $('#add-web-trend-comment').append('<div class="alert alert-info">'+
                        '<strong>Your Comment Under Authorization Process</strong>'+
                        '</div>');

                    }else{
                        $('#add-web-trend-comment').append('<div class="alert alert-info">'+
                        '<strong>'+data+'</strong>'+
                        '</div>');
                    }

                }
            });
        }
    });

    //show form for reply other user comment in web trend page
    $('.web-trend-comment-reply').on('click',function(){
        var user = $(this).attr('data-user');
        if (user == ''){
            window.location.replace(base_url+'user/login');
        }else {
            var id = $(this).attr('data-id');
            var post = $(this).attr('data-post');
            $('.web-trend-comments .comment-form-container').remove();

            var html = '<div class="comment-form-container"><form id="add-web-trend-comment" class="form-horizontal mx-3" method="post">' +
                '<h4>Add Comment</h4>' +
                '<div class="form-group">' +
                '<input type="hidden" class="username" value="'+user+'"/>' +
                '<input type="hidden" class="post-id" value="'+post+'"/>' +
                '<textarea class="form-control comment-info" name="" id="" cols="30" rows="2" required></textarea>' +
                '<span class="has-error"></span>' +
                '</div>' +
                '<input type="hidden"  id="parent-id" value="' + id + '"/>' +
                '<button type="submit" class="btn btn-primary mb-2">Submit</button>' +
                '</form>' +
                '</div>';

            $(this).parent('.comment-content').append(html);
        }
    });

    //script for insert web trends by user : meadmin/web_trends
    $('#add-web-trend-form').on('submit',function(e){
        e.preventDefault();
        var title = $('.post-title').val();
        var category = $('.post-category option:selected').val();
        var slug = $('.post-link').val();
        if(title == '' || category == '' || slug == ''){
            var html = '<div class="alert alert-danger m-2">'+
                'Please Fill All The Fields.'+
                '</div>';
            $('.has-error').html(html);
        }else{
            var loader = '<div class="loading">' +
                '<div class="preloader">'+
                '<div class="spinner"></div>'+
                '<div class="spinner-2"></div>'+
                '</div>'+
                '</div>';
            $('#site-content').append(loader);
            $.ajax({
                url: base_url+"web-trends/add-web-trends",
                type: "POST",
                dataType: "JSON",
                data: {title:title,category:category,slug:slug},
                success: function (data) {
                    if (data.status == 'true') {
                        $('.loading').remove();
                        var html = '<div class="alert alert-success m-2">'+
                            'Your Post Gone For Apprroval.'+
                            '</div>';
                        $('.has-error').html(html);
                    }else if(data.status == 'existing'){
                        $('#site-content .loading').hide();
                        var html = '<div class="alert alert-danger m-2">'+
                            'Title is Already Exists.'+
                            '</div>';
                        $('.has-error').html(html);
                    }
                }
            });
        }
    });


});

