$( document ).ready(function() {
    
  var arr_index = 1;
  var rotate_text = $('.rotate_job, .rotate_text')
  var arr_word = rotate_text.text().split(',');

  rotate_text.text(arr_word[0]);
  
  function rotate() {
    rotate_text.fadeOut(800, function() {  
      rotate_text.text(arr_word[arr_index]).fadeIn(600);
      if((arr_index + 1) == arr_word.length) arr_index = -1
      arr_index += 1;
    });
  }

  setInterval(rotate, 3000);
});