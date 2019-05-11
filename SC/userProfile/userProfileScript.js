/*global $*/
var email;
$(document).ready(function() {
  $("#removelistingModal").modal("hide");
  $("#updateListingModal").modal("hide");
  getEmail();
  $.ajax({
            type: "GET",
            url: "../api/getCategories.php",
            dataType: "json",
            success: function(data, status){
                data.forEach(function(key){
                   $("[name=category]").append("<option value=" + key["Id"] + ">" + key["Name"] + "</option>");
                });
            }
         }); //Get Categories
  verifyLogin();
  // requestInfo();
});
$(document).on('click', '.updateLink', function() {
  console.log("Update link clicked");
  $("#updateListingModal").modal("show");
  var str = $(this).attr("id");
  $("#updateListingId").html(str);
  $.ajax({
    type: "GET",
  url: "../api/getListingById.php",
  dataType: "json",
  data:{
    listingId : $("#updateListingId").html(),
  },
  success: function(data, status){
    $("#listingTitle").val(data[0]['Title']);
    $("#itemDescription").val(data[0]['Description']);
    $("#itemAvailability").val(data[0]['Availability']);
    $("#itemLocation").val(data[0]['Location']);
    $("[name=category]").val(data[0]['Category_id']);
  }
  });
});
$(document).on('click', '.deleteLink', function() {
  $("#removelistingModal").modal("show");
  var str = $(this).attr("id");
  $("#removeListingId").html(str.replace("R", ""));
});
$("#confirmRemoveListing").on("click", function() {
  $("#removelistingModal").modal("hide");
  $.ajax({
    type: "GET",
    url: "../api/deleteListingById.php",
    dataType: "json",
    data: {
      "listingId": $("#removeListingId").html()
    }
  });
  listingInfo();
});
$("#updateListingModalBtn").on("click", function() {
  $("#updateListingModal").modal("hide");
  $.ajax({
                      type: "GET",
                      url: "../api/updateListingById.php",
                      dataType: "json",
                      data: {
                       listingId: $("#updateListingId").html(),
                       category: $("[name=category]").val(),
                       title: $("#listingTitle").val(),
                       location: $("#itemLocation").val(),
                       description: $("#itemDescription").val(),
                       availability: $("#itemAvailability").val(),
                      },
                      success: function(data, status){
                          console.log(data);
                      }
   });
  listingInfo();
});


function getSessionInfo(callback) {
  $.ajax({
    url: "../api/get_session.php",
    success: callback
  });
}

function getEmail() {
  getSessionInfo(function(data) {
    var session_credentials = $.parseJSON(data);
    email = session_credentials["email"];
    userInf();
    listingInfo();
    requestInfo();
  })
}

function userInf() {
  // console.log(email)
  $.ajax({
    type: "GET",
    url: "userProfile.php",
    dataType: "json",
    data: { email: email },
    success: function(data, status) {
      data.forEach(function(key) {
        $("#rowinside1").html("Email: " + key["email"] + " ");
        
        $("#firstName").html("First name: " + key["first_name"] + " ");
        
        $("#lastName").html("Last name: " + key["last_name"] + " ");
        


      }); //
    }
  }); // end of ajax called for iformation
  $.ajax({
    type: "GET",
    url: "getUserImg.php",
    dataType: "binary",
    data: { email: email },
    success: function(data, stauts) {
      data.forEach(function(key) {
        $("#rowinside2").html("<p>" + key['picture'] + "</p>")
      });
    }
  });
}

function listingInfo() {
  $("#tableListings").empty();
  $.ajax({
    type: "GET",
    url: "getListingsByEmail.php",
    dataType: "json",
    data: { email: email },
    success: function(data, status) {
      $counter = 1;
      data.forEach(function(key) {
        $("#tableListings").append("<tr><td> " + $counter + ". " + key['Title'] + "</td><td>" + key['Description'] + "</td><td> <a href = '#' class='updateLink' id='" + key['Id'] + "'>update</a><a href = '#' class='deleteLink' id='R" + key['Id'] + "'> delete</a></td></tr>");
        $counter = $counter+1;
        
      });
    }
  })
}

function requestInfo() {
  $.ajax({
    type: "GET",
    url: "getUserRequest.php",
    dataType: "json",
    data: {email: email},
    
    success:function(data, status)
    {
      $counter2 = 1;
      data.forEach(function(key) {
        $("#tableInsideRow3").append("<tr><td>"+ $counter2 + ". "  + key['Request_Message'] + "</td><td>"+ key['Checkout_Date'] +"</td><td>"+ key['Return_date'] +"</td></tr>");
        $counter2 = $counter2 +1;
        
      })    
    }
  })
}
function verifyLogin(){
      // console.log("Enter");
      getSessionInfo( function(data){
        var session_credentials = $.parseJSON(data);
        if(session_credentials["isLoggedIn"]){
           //if logged in do something
          $("#login").hide();
          $("#signup").hide();
          $("#logout").show();
          $("#userProfile").hide();
          // console.log("Enter 1");
        } else {
            // console.log("Enter 1");
            //if not logged in do something
            $("#login").show();
            $("#signup").show(); 
            // $("#logout").hide();
            // $("#userProfile").hide();
            $("#placeAds").show();
            
        }
         
      })
    }