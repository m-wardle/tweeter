
$(document).ready(function() {
  // --- our code goes here ---
  $("section.new-tweet > form > textarea").on("keyup", function() {
    $("section.new-tweet > form > span.counter").html(140 - $(this).val().length);
    if ($("section.new-tweet > form > span.counter").html() < 0) {
      $("section.new-tweet > form > span.counter").css("color", "red")
    } else {
      $("section.new-tweet > form > span.counter").css("color", "#545149")
    }
  })
});