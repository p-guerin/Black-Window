$(document).ready(function() {

  var div1 = $('.close-bottom-left');
  var div2 = $('.close-top-right');
  var div3 = $('.logo-pg');

  function closeheader() {
    if(div1.css('opacity') == 1){
      div1.animate({"left": "-126%", opacity: 0}, 1000);
      div2.animate({"right": "-126%", opacity: 0}, 1000);
      div3.fadeOut(600);
      setTimeout("$('.ps-container').css({'overflow': 'hidden'})", 1000);
    }
  }

  setTimeout(closeheader, 1500);
});