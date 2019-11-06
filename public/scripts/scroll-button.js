let toggle = 0

const scrollToggle = () => {
  if (toggle === 0) {
    $('html, body').animate({
      scrollTop: $(".new-tweet").offset().top - 150
    }, 1000);
    $(".new-tweet textarea").focus();
    toggle = 1;
  } else {
    $('html, body').animate({
      scrollTop: $("#tweets-container").offset().top - 150
    }, 1000);
    toggle = 0;
  }
}

const hover = () => {
  $("#scroll-toggle").hover(function() {
    $(this).css("cursor", "pointer");
  }, function() {
    $(this).css("cursor", "default");
  })
}

$(document).ready(function() {
  $("#scroll-toggle").on("click", () => {
    scrollToggle();
  })
  hover();
});
