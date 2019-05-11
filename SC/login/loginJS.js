$("#loginButton").on('click', function(e) {
    $.ajax({
        type: "post",
        url: "login.php",
        dataType: "json",
        data: {
            "email": $("input[name='email']").val(),
            "password": $("input[name='password']").val(),
        },
        success: function(data, status) {
            console.log(data);
            if (data.isAuthenticated) {

                window.location = "../index.html"
                
            }else {

                $("#message").html("Bad email or password");
                $("#message").removeClass("open-hidden");
            }
        },
        complete: function(data, status) { //optional, used for debugging purposes
            //console.log(status);
        }
    });
})
function onSignIn(googleUser) {
    // console.log("hello")
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    // });
    $.ajax({
        type: "POST",
        url: "../google/verify.php",
        dataType: "json",
        data: {
            "token": googleUser.getAuthResponse().id_token
        },
        success: function(data, status) {
            console.log(data);
        },
        complete: function(data, status) { //optional, used for debugging purposes
            // console.log(status);
            // console.log(data)
        }
    });
     $.ajax({
        type: "GET",
        url: "../api/createSession.php",
        dataType: "json",
        data : {
            email: profile.getEmail(),
        },
        complete: function(data, status) { 
          window.location = "../index.html"
        }
    });
}
