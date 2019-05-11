var currentListingId = -1;
var currentListingTitle = "";
var email;
/*global $*/
    $(document).ready(function(){
      $("#resultsModal").modal("hide");
      $("#requestModal").modal("hide");
      $("#confirmationModal").modal("hide");
      $("#noAuthModal").modal("hide");
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
      verifyLogin();
    });
    //end document ready
    // More results Modal
    $(document).on('click', '.search_result_image', function(){
      $("#resultsModal").modal("show");
      console.log("image #"+ $(this).attr("id")+" clicked");
      currentListingId = $(this).attr("id");
      $.ajax({
        type: "GET",
        url: "api/getListingById.php",
        dataType: "json",
        data:{
          listingId : $(this).attr("id")
        },
        success: function(data, status){
        currentListingTitle =data[0]['Title'];
        $("#resultsModalTitle").html("");
        $("#resultsModalBody").html("");
        
        $("#resultsModalTitle").html(data[0]['Title'] + " - " + data[0]['Location']);
        $("#resultsModalBody").html("Description - <br>" +data[0]['Description']+"<br><br> Availability - <br>"+data[0]['Availability']);
        }
      });
    });
    // End results modal
    // Request Modal
    $("#modalRequestBtn").on("click", function() {
     getSessionInfo( function(data){
          var session_credentials = $.parseJSON(data);
          if(session_credentials["isLoggedIn"]){
            showRequestModal();
          } else {
            loginRequest();
          }
           
        })
    });
    // end request modal
    //Submit Request button
    $("#modalSubmitRequestBtn").on("click", function() {
     getEmail();
      $("#requestModal").modal("hide");
      $("#confirmationModal").modal("show");
    });
    //end Submit Reuqest button
    //Display search results
    $("#searchBtn").on("click", function(e) {
      e.preventDefault();
           $.ajax({
                type: "GET",
                url: "api/getSearchResults.php",
                dataType: "json",
                data:{
                  "title" : $("#TitleSearch").val(),
                  "description" : $("#DescSearch").val(),
                   "category" : $("[name=category]").val(),
                   "orderBy" : $("[name=orderBy]:checked").val()
                },
                success: function(data, status){
                  $("results").empty();
                      var rows =1;
                      var i = 0;
                    data.forEach(function(key){
                       if(i==0){
                          $("results").append("<div class='image_row' id=row_"+rows+">");
                        }
                         $("#row_"+rows).append("<div class='image_Wrapper'> <img src='api/bits.php?id="+key['image_id']+"' alt='listing#"+ key['Id']+"img' class='search_result_image' id='"+ key['Id']+"'/>"+key['Title']+"<br>"+key['Location']+"</div>")
                         i++;
                         if(i==3){
                           $("results").append("</div>");
                           i= 0;
                           rows++;
                         }
                      
                      
                    });
                }
           });
        });
        // End Display Search results
        //Redirect to login page
    $("#modalSignIn").on("click", function() {
           window.location = "login/login.html";
        });
        //Redirect to signup page
    $("#modalSignUp").on("click", function() {
            window.location = "signup/signup.html";
         });
        //Helper Functions
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
                       makeRequest();
                    })
    }
    function makeRequest(){
       $.ajax({
          type: "GET",
          url: "api/makeRequest.php",
          dataType: "json",
          data: {
           userEmail: email,
           listingId: currentListingId,
           checkout: $("#checkoutDate").val(),
           checkin: $("#checkinDate").val(),
           message: $("#requestMessage").val(),
          },
          success: function(data, status){
              console.log(data);
          }
      });
    }
    function showRequestModal(){
      $("#resultsModal").modal("hide");
      $("#requestModal").modal("show");
      $("#requestModalTitle").html("Requesting: " + currentListingTitle);
      $("#checkoutDate").val("");
      $("#checkinDate").val("");
      $("#requestMessage").val("");
    }
    function loginRequest(){
      $("#resultsModal").modal("hide");
      $("#noAuthModal").modal("show");
    }
    function verifyLogin(){
        getSessionInfo( function(data){
          var session_credentials = $.parseJSON(data);
          if(session_credentials["isLoggedIn"]){
            $("#signup").hide();
          } else {
            $("#logout").hide();
            $("#userProfile").hide();
            $("#logout").hide();
          }
           
        })
    }