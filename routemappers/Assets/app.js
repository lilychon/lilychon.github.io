

$(document).ready(function () {

    $('body').css('display', 'none').fadeIn(1000);
})

$("#goBtn").click(function (e) {
    e.preventDefault();

    var addressText = $("#destination").val();
    console.log(addressText);
    displayTopBar();

    loadMap(addressText);
});

function displayTopBar() {
    $("<img />", {
        src: "Assets/Images/logo.png",
        alt: "logo",
        class: "topBarLogo",
        appendTo: ".top-bar"
    })
}

// function displayMapContent() {
//     $(".grid-container").empty();

//     $("<div>", {
//         html: "hello",
//         appendTo: ".map"
//     })

//     $("<iframe>", {
//         src: "https://maps.google.com/maps?q=seattle&t=&z=13&ie=UTF8&iwloc=&output=embed",
//         class: "framedMap",
//         appendTo: ".map"
//     })
// }



$(document).foundation()

