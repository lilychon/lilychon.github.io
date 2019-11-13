$(document).ready(function () {
    const currentDate = moment().format("dddd, MMMM Do");

    $("#currentDay").html(currentDate);


    var times = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
    const currentTime = moment().format("H");
    var schedule = {}

    function buildRows() {

        var startTime = 8;

        for (var i = 0; i < times.length; i++) {

            var row = $("<div class='row'>");

            var time = $("<div>");
            time.attr("data-timeOption", times[i]);
            time.text(times[i]);
            time.addClass("col-md-1 hour");

            var dot = $("<span>");
            dot.addClass("dot");

            var textArea = $("<textarea/>");
            textArea.attr("id", startTime++);
            textArea.addClass("col userInput row");


            if (startTime == currentTime) {
                dot.addClass("present")
            } else if (startTime > currentTime) {
                dot.addClass("future")
            } else {
                dot.addClass("past")
            }

            var saveBtn = $("<button>");
            saveBtn.html("<h3>+</h3>")
            saveBtn.addClass("saveBtn");

            row.append(time, dot, textArea, saveBtn);

            $(".container").append(row);

        }

        schedule = JSON.parse(localStorage.getItem("getValue"))
        console.log(schedule)
        for (key in schedule) {
            console.log(key, schedule[key])
            $("#" + key).text(schedule[key])
        }

        $(".saveBtn").on("click",
            function (event) {
                event.preventDefault();
                console.log(this)
                var userInput = $(this).parent().find(".userInput").val();
                var hour = $(this).parent().find(".userInput").attr("id")
                console.log(hour, userInput);
                var scheduleTemp = JSON.parse(localStorage.getItem("getValue"))
                if (scheduleTemp === null) {
                    scheduleTemp = {}
                }
                scheduleTemp[hour] = userInput
                localStorage.setItem("getValue", JSON.stringify(scheduleTemp));
            })
    }

    buildRows();

})