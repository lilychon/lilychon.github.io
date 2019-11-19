$(document).ready(function () {
    console.log("loaded");
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position.coords.latitude, position.coords.longitude);
        var startLat = position.coords.latitude;
        var startLong = position.coords.longitude;
    });
});