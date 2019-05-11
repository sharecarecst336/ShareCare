        $(function() {
               // 1. Get rid of file input button
            //$("form button:nth-of-type(1)").click(function() {
            $("#selectButton").click(function() {
                console.log("clicked")
                $("form input[type='file']").trigger("click")
            })

            // 2. Use ajax to submit files
            $("form input[type='file']").change(function(e) {
                $('#filesList').empty();
                $.map(this.files, function(val) {
                    $('#filesList')
                        .append($('<div>')
                            .html(val.name)
                        );
                });
            })

           
        
        
        /*----------------------------PLACE ADS--------------------------------*/
        /*global $*/
        var email;
        var image_id;
        $(document).ready(function(){
             $("#noAuthModal").modal("hide");
             verifyLogin();
            $.ajax({
                  type: "GET",
                  url: "api/getCategories.php",
                  dataType: "json",
                  success: function(data, status){
                      data.forEach(function(key){
                         $("[name=category]").append("<option value=" + key["Id"] + ">" + key["Name"] + "</option>");
                      });
                  }
               }); 
               
        });
        
        $("#uploadButton").on("click", function(e) {
            setProgress(0);
                var formData = new FormData($('form')[0]);
                $.ajax({
                        url: "api/upload.php",
                        type: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        mimeType: "multipart/form-data",
                        cache: false,
                        // This part gives up chunk progress of the file upload
                        xhr: function() {
                            //upload Progress
                            var xhr = $.ajaxSettings.xhr();
                            if (xhr.upload) {
                                xhr.upload.addEventListener('progress', function(event) {
                                    var percent = 0;
                                    var position = event.loaded || event.position;
                                    var total = event.total;
                                    if (event.lengthComputable) {
                                        percent = Math.ceil(position / total * 100);
                                    }
                                    //update progressbar
                                    setProgress(percent);
                                }, true);
                            }
                            return xhr;
                        }
                    })
                    .done(function(data, status, xhr) {
                        console.log('upload done');
                        console.log(xhr);
                        var response = JSON.parse(xhr.responseText);
                        image_id = response.image_id;
                        getEmail();
                        $("#results").html("Listing Created");
                    })
                    .fail(function(xhr) {
                       $("#results").html("Image Failed to Upload");
                        console.log(xhr);
                    })
                    .always(function() {
                        //console.log('done processing upload');
                    });
        });
        function getSessionInfo(callback){
            $.ajax({
                        url: "api/get_session.php",
                        success: callback
            });
        }
        function getEmail(){
            getSessionInfo( function(data){
                            var session_credentials = $.parseJSON(data);
                           email = session_credentials["email"];
                           insertListing();
                        })
        }
        function insertListing(){
            $.ajax({
                            type: "GET",
                            url: "api/insertListing.php",
                            dataType: "json",
                            data: {
                             userEmail: email,
                             category: $("[name=category]").val(),
                             title: $("#listingTitle").val(),
                             location: $("#itemLocation").val(),
                             description: $("#itemDescription").val(),
                             availability: $("#itemAvailability").val(),
                              image_id :  image_id,
                            },
                            success: function(data, status){
                                console.log(data);
                            }
                       });
        }
        });
        //Redirect to login page
        $("#modalSignIn").on("click", function() {
           window.location = "login/login.html";
        });
        //Redirect to signup page
         $("#modalSignUp").on("click", function() {
            window.location = "signup/signup.html";
         });
         function getSessionInfo(callback){
            $.ajax({
                        url: "api/get_session.php",
                        success: callback
            });
        }
         function loginRequest(){
          $("#noAuthModal").modal("show");
        }
        //Verify session info
        function getSessionInfo(callback){
            $.ajax({
                        url: "api/get_session.php",
                        success: callback
            });
        }
        
        function verifyLogin(){
          getSessionInfo( function(data){
                          var session_credentials = $.parseJSON(data);
                          if(session_credentials["isLoggedIn"]){
                            //if logged in do something
                            $("#login").hide();
                            $("#signup").hide();
                            $("#logout").show();
                            
                          } else {
                              //if not logged in do something
                                $("#login").show();
                                $("#signup").show(); 
                                $("#logout").hide();
                                $("#userProfil").hide();
                                
                                loginRequest();
                          }
                           
                        })
        }
        //end Verify session info
        function setProgress(percent) {
            $(".progress-bar").css("width", +percent + "%");
            $(".progress-bar").text(percent + "%");
        }