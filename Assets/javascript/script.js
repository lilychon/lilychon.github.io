$(document).ready(function () {

    $('body').css('display', 'none').fadeIn(1000);
})

$(function () {
    $(document).scroll(function () {
      var $nav = $(".navbar");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
  });