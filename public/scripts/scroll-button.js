let toggle = 0;

// Toggles the tweet composer visibility.

const composeToggle = () => {
  if (toggle === 0) {
    $(".new-tweet").show(500);
    $(".new-tweet textarea").focus();
    toggle = 1;
  } else {
    $(".new-tweet").hide(500);
    toggle = 0;
  }
};

// Toggling pointer cursor with jQuery - could be done with CSS, but wanted practice.

const scrollHover = () => {
  $("#scroll-toggle").hover(function() {
    $(this).css("cursor", "pointer");
  }, function() {
    $(this).css("cursor", "default");
  });
};

// Implements the scroll to top button appearing/compose tweet button disappearing.
// Needed some extra logic to work with the overflow container on desktop.

const scrollButton = () => {
  const btn = $('#scroll-top-btn');

  $(document).scroll(function() {
    if ($(document).scrollTop() > 550) {
      btn.css('visibility', 'visible');
      $('#scroll-toggle').css('visibility', 'hidden');
    } else {
      btn.css('visibility', 'hidden');
      $('#scroll-toggle').css('visibility', 'visible');
    }
  });

  $("main.container").scroll(function() {
    if ($("main.container").scrollTop() > 105) {
      btn.css('visibility', 'visible');
      $('#scroll-toggle').css('visibility', 'hidden');
    } else {
      btn.css('visibility', 'hidden');
      $('#scroll-toggle').css('visibility', 'visible');
    }
  });

  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
    $('html, body, main').animate({scrollTop:0}, '300');
  });
};


$(document).ready(function() {
  $("#scroll-toggle").on("click", () => {
    composeToggle();
  });
  scrollHover();
  scrollButton();
});
