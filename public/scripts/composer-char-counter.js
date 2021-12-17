$(document).ready(function() {
  // Character counter
$("#tweet-text").on('input', function() {
    const $counter = $(".counter");
    const charCount = 140 - this.value.length;
    $counter.val(charCount);

    if (charCount < 0) {
      $counter.css('color', 'red');
    } else {
      $counter.css("color", "#545149");
    }
  });

  $('#tweet-form').submit(function() {
    $('.counter').val(140);
  });
});
