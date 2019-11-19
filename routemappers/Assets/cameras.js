function wsdotCameraCall() {
    var queryURL = "https://www.wsdot.com/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson?AccessCode=" + accessCode;
    var accessCode = "30e61ff7-f96c-45c2-9304-9a0a67fddae7"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

    })}