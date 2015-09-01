$(document).ready(function() {
  $('input[type="text"], input[name="email"], textarea[name="message"]').blur(function() {
    if ( $(this).val() != "" ) {
      $(this).addClass('filled');
    }
    else {
      $(this).removeClass('filled');
    }
  });
});