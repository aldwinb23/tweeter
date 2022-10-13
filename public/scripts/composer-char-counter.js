
$(document).ready(function() {
  
  $("#tweet-text").on("input", function () {
    const maxNumOfChars = 140;
    const $charCount = $("output.counter");

    // const $charCount = $(this).next().output.counter;


    let numOfEnteredChars = $(this).val().length;
    let counter = maxNumOfChars - numOfEnteredChars;
    $charCount.text(counter)


    if (counter < 0) {
      $charCount.css("color", "red");
        } else {
      $charCount.css("color", "black");
        }

  });

});