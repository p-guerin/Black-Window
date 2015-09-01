$(document).ready(function(){  
  $(".btn").click(function() {
    var page = $(this).attr("href");
    var offset_margin = $(window).width()/15;
    $("#container").animate({scrollTop: $("#container").scrollTop() + $(page).offset().top + offset_margin}, 750);
    return false;
  });
});