let toggle = 0

const scrollToggle = () => {
  if (toggle === 0) {
    $('html, body').animate({
      scrollTop: $(".new-tweet").offset().top - 150
    }, 1000);
    $(".new-tweet textarea").focus();
    // toggle = 1; // With implementation of scroll to top button this seems a bit pointless.
  } else { 
    $('html, body').animate({ 
      scrollTop: $("#tweets-container").offset().top - 150
    }, 1000);
    toggle = 0;
  }
}

const scrollHover = () => {
  $("#scroll-toggle").hover(function() {
    $(this).css("cursor", "pointer");
  }, function() {
    $(this).css("cursor", "default");
  })
}

const scrollButton = () => {
  const btn = $('#scroll-top-btn');

  $(document).scroll(function() {
    if ($(document).scrollTop() > 20) {
      btn.css('display', 'block');
      $('#scroll-toggle').css('display', 'none');
    } else {
      btn.css('display', 'none');
      $('#scroll-toggle').css('display', 'block');
    }
  });

  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
  });
}


$(document).ready(function() {
  $("#scroll-toggle").on("click", () => {
    scrollToggle();
  })
  scrollHover();
  scrollButton();
});
