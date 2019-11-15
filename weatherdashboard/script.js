var APIKey = "166a433c57516f51dfab1f7edaed8413";
var cities = [];

function renderCity() {
    var citiesString = localStorage.getItem("weatherKey")

    if (citiesString) {
        cities = JSON.parse(citiesString)
        $(".cityHistory").empty();
        for (var i = 0; i < cities.length; i++) {
            var city = cities[i].split(" ").join("+")
            var cityHistory = $("<button cityval=" + city + ">" + cities[i] + "</button>");
            cityHistory.addClass("cityBtn");
            $(".cityHistory").append(cityHistory);
        }
        $(".cityBtn").on("click", getcity);
    }
}

function getcity() {
    console.log(this)
    var city = $(this).attr("cityval");
    console.log(city)
    displayWeatherInfo(city)
}

$(".searchBtn").on("click", function (event) {
    event.preventDefault();
    var city = $("#cityInput").val();
    displayWeatherInfo(city);
})

function buildForecast(response) {

    for (var i = 1; i < 6; i++) {
        const date = moment().add(i, 'days').format("M/D/YYYY");

        var fiveDayDiv = $("<div id='fiveDayBox'>");
        var fiveDayDivDate = $("<h3>");
        fiveDayDivDate.html(date);
        var icon = $("<i>");

        var fiveDayDivTemp = $("<span>");
        fiveDayDivTemp.html("Temp: " + response.list[i].main.temp.toFixed(1) + " °F" + "<br>");
        var fiveDayDivHumidity = $("<span>");
        fiveDayDivHumidity.html("Humidity: " + response.list[i].main.humidity.toFixed(1) + "%")

        fiveDayDiv.append(fiveDayDivDate, icon, fiveDayDivTemp, fiveDayDivHumidity);

        $(".fiveDay").append(fiveDayDiv);

        var weatherIcon = response.list[i].weather[0].main;

        if (weatherIcon === "Clear")
            icon.addClass("fas fa-sun weatherIcon");

        else if (weatherIcon === "Clouds")
            icon.addClass("fas fa-cloud weatherIcon");

        else if (weatherIcon === "Snow")
            icon.addClass("fas fa-snowflake weatherIcon");

        else if (weatherIcon === "Drizzle")
            icon.addClass("fas fa-cloud-rain weatherIcon");

        else if (weatherIcon === "Rain")
            icon.addClass("fas fa-cloud-showers-heavy weatherIcon");
    }
}


function displayWeatherInfo(city) {
    console.log("-->", city)
    $(".fiveDay").empty();
    $(".weatherInfo").empty();


    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        buildForecast(response);

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon
            ,
            method: "GET"
        }).then(function (uvResponse) {
            console.log(uvResponse);

            const currentDate = moment().format("M/D/YYYY");

            // icon
            $("<div>", {
                id: "icon",
                appendTo: ".weatherInfo"
            })

            // temp
            $("<div>", {
                html: "<h2><b>" + response.list[0].main.temp.toFixed(1) + " °F </b></h2>",
                class: "temp",
                appendTo: ".weatherInfo"
            })

            // city
            $("<div>", {
                html: "<h2>" + response.city.name + "</h2>",
                class: "city",
                appendTo: ".weatherInfo"
            })

            // date
            $("<div>", {
                html: currentDate,
                class: "city",
                appendTo: ".weatherInfo"
            })

            // humidity
            $("<div>", {
                html: "<p>" + "Humidity: " + response.list[0].main.humidity + "%" + "</p>",
                class: "humidity",
                appendTo: ".weatherInfo"
            })

            // wind
            $("<div>", {
                html: "<p>" + "Wind Speed: " + response.list[0].wind.speed.toFixed(1) + " MPH" + "</p>",
                class: "wind",
                appendTo: ".weatherInfo"
            })

            // UV
            var uvDiv = $("<div>");
            uvDiv.html("UV Index: ");
            var uv = $("<h4>");
            uv.html(uvResponse.value);

            uvDiv.append(uv);
            $(".weatherInfo").append(uvDiv);

            if (uvResponse.value < 6) {
                uv.addClass("uvIndexLow");
            } else {
                uv.addClass("uvIndex")
            }

            if (response.list[0].main.temp >= 80) {
                $(".top").addClass("above80");
            } else if (response.list[0].main.temp < 30) {
                $(".top").addClass("below30");
            } else {
                $(".top").addClass("above30");
            }

            var weatherIcon = response.list[0].weather[0].main;

            if (weatherIcon === "Clear") {
                $("#icon").addClass("fas fa-sun");
            }
            else if (weatherIcon === "Clouds") {
                $("#icon").addClass("fas fa-cloud");
            }
            else if (weatherIcon === "Snow") {
                $("#icon").addClass("fas fa-snowflake");
            }
            else if (weatherIcon === "Drizzle") {
                $("#icon").addClass("fas fa-cloud-rain");
            }
            else if (weatherIcon === "Rain") {
                $("#icon").addClass("fas fa-cloud-showers-heavy");
            }

            if (cities.indexOf(response.city.name) === -1) {

                cities.push(response.city.name);


                localStorage.setItem("weatherKey", JSON.stringify(cities));
                renderCity();
            }

        })
    })
}

$(document).on("click", ".cityBtn", displayWeatherInfo);
renderCity();
