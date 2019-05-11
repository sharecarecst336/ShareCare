/*global $*/
$(document).ready(function() {
    verifyLogin();
     $.ajax({
         type: "GET",
                  url: "../api/getCategoryCount.php",
                  dataType: "json",
                  success: function(data, status){
                     data.forEach(function(key){
                         $("#histogram").append("<tr><td>"+key["Name"]+"</td><td>"+key["count(Category_id)"]+"</td></tr>");
                     });
                  }
     });
     $.ajax({
         type: "GET",
                  url: "../api/getListingCount.php",
                  dataType: "json",
                  success: function(data, status){
                     $("#listingCount").html("Number of Listings: " + data[0]["COUNT(Id)"]);
                  }
     });
     $.ajax({
         type: "GET",
                  url: "../api/getUserCount.php",
                  dataType: "json",
                  success: function(data, status){
                     $("#userCount").html("Number of Users: " + data[0]["COUNT(email)"]);
                  }
     });
      getMostPopular( function(data){
          getListingInfo(data[0]["Listing_Id"]);
      });
     
});
function getListingInfo(id){
    $.ajax({
         type: "GET",
                  url: "../api/getListingById.php",
                  dataType: "json",
                  data: {
                      listingId : id,
                  },
                  success: function(data, status){
                     $("#mostPopular").append("<div class='image_Wrapper'> <img src='../api/bits.php?id="+data[0]['image_id']+"' alt='listing#"+ data[0]['Id']+"img' class='search_result_image' id='"+ data[0]['Id']+"'/>"+data[0]['Title']+"<br>"+data[0]['Location']+"</div>");
                  }
     });
}
function getMostPopular(callback){
     $.ajax({
         type: "GET",
                  url: "../api/getMostPopularListing.php",
                  dataType: "json",
                  success: callback
     });
}
function getSessionInfo(callback){
      $.ajax({
          url: "../api/get_session.php",
          success: callback
      });
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