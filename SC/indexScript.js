/*global $*/
$(document).ready(function() {
    verifyLogin();
     $.ajax({
                  type: "GET",
                  url: "api/getRandomListing.php",
                  dataType: "json",
                  success: function(data, status){
                      $("#foryou1").attr("src","api/bits.php?id="+data[0]['image_id']);
                       $("#foryou2").attr("src","api/bits.php?id="+data[1]['image_id']);
                        $("#foryou3").attr("src","api/bits.php?id="+data[2]['image_id']);
                         $("#foryou4").attr("src","api/bits.php?id="+data[3]['image_id']);
                  }
               }); 
});
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
        console.log("Enter email2");
        //if logged in do something
        // $("#login").hide();
        $("#signup").hide();
        $("#logout").show();
      
      } else {
          console.log("Enter email");
          //if not logged in do something
        //   $("#login").show();
        //   $("#signup").show(); 
          $("#logout").hide();
          $("#userProfile").hide();
          
      }
       
    })
  }

// $("#logout").on("click touchstart", function(e) {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function() {
//         console.log('User signed out.');
//     });
// })