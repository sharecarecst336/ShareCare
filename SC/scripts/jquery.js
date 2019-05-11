/*global $*/
$(document).ready(function() {
    var loggedIn = false;
    var header = "header";
    var location = "somelocation";
    console.log("ready!");
    // The following code is for the browsing page
    if ($('body').is('#IDBodySeeAds')) {
        console.log("ready!!");
        if (loggedIn == false) {
            $("#linkFromBrowseToDashboard").hide();
        }
        $("img").hover(function() {
            console.log("Hovering image!");
            $("img").attr("title", "header, location");

        });
    }
});
