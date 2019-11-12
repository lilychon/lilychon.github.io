$(".p1").on("click", function (event) {
    event.preventDefault();
    $(".project1")
    .html('<object data="https://omerkatan1.github.io/project-1/"/>')
    .css("overflow","hidden")
});
