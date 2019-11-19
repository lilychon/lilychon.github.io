var APIKey = "166a433c57516f51dfab1f7edaed8413";

function getWeatherInfo(addressLat, addressLon) {
    console.log(addressLat, addressLon);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" + APIKey + "&lat=" + addressLat + "&lon=" + addressLon;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var weather = {
            city: response.name,
            temp: response.main.temp.toFixed(1),
            wind: response.wind.speed.toFixed(1),
            icon: response.weather[0].main,
            lat: response.coord.lat,
            lon: response.coord.lon,
        }

        displayWeatherInfo(weather);
    })
}

function displayWeatherInfo(weather) {
    $("<div>", {
        html: weather.temp + " °F",
        class: "temp",
        appendTo: ".top-bar"
    })
    $("<div>", {
        id: "icon",
        appendTo: ".top-bar"
    })
    $("<div>", {
        html: weather.city,
        class: "city",
        appendTo: ".top-bar"
    })

    //dynamic day/night function call begin
    // getSRSS(weather.lat, weather.lon);
    //dynamic day/night function call end  

    if (weather.icon === "Clear") {
        $("<img>", {
            src: "Assets/Images/sun.png",
            class: "icon",
            appendTo: "#icon"
        })}
    else if (weather.icon === "Clouds") {
        $("<img>", {
        src: "Assets/Images/cloudy.png",
        class: "icon",
        appendTo: "#icon"
    })}
    else if (weather.icon === "Snow") {
        $("<img>", {
            src: "Assets/Images/snowing.png",
            class: "icon",
            appendTo: "#icon"
        })}
    else if (weather.icon === "Drizzle") {
        $("<img>", {
            src: "Assets/Images/drizzle.png",
            class: "icon",
            appendTo: "#icon"
        })}
    else if (weather.icon === "Rain") {
        $("<img>", {
            src: "Assets/Images/rain.png",
            class: "icon",
            appendTo: "#icon"
        })}
}

// function getSRSS(lat, lng) {
//     var queryURL = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng;
//     console.log("latitude:" + lat);
//     console.log("longitude:" + lng);

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response);
//         console.log("Sunrise:" + response.results.sunrise);
//         console.log("Sunset:" + response.results.sunset);

//         // api seems to return inaccurate data, future versions will use a different api,
//         // all values returned by api are behind by 5 hours, correction for this is error margin
//         // also add minute determination for greater accuraccy.
//         var errorMargin = 5;
//         var curhour = (new Date()).getHours();
//         var sunrise = errorMargin + response.results.sunrise[0];
//         var sunset = sunrise + response.results.day_length[1];
//         if (curhour >= sunrise && curhour <= sunset) {
//             $(".top-bar").removeClass("nightbody").addClass("daybody");
//         } else {
//             $(".top-bar").removeClass("daybody").addClass("nightbody");
//         }

//     })
// }