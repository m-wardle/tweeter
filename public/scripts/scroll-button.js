let toggle = 0

const scrollToggle = () => {
  if (toggle === 0) {
    $(".new-tweet").show(500);
    // if ($(document).width() < 1024) {
    //   $('html, body').animate({
    //     scrollTop: $(".new-tweet").offset().top - 150
    //   }, 1000);
    // } else {
    //   $('html, body, .container').animate({
    //     scrollTop: $("#tweets-container").offset().top - 150
    //   }, 1000);
    // }
    $(".new-tweet textarea").focus();
    toggle = 1; 
  } else { 
    $(".new-tweet").hide(500);
    // if ($(document).width() < 1024) {
    //   $('html, body').animate({ 
    //     scrollTop: $("#tweets-container").offset().top - 105
    //   }, 1000);
    // } else {
    //   $('html, body, .container').animate({
    //     scrollTop: $(".new-tweet").offset().top - 70
    //   }, 1000);
    // }
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
}


$(document).ready(function() {
  // if ($(document).width() < 1024) {
  //   $("#tweets-container").scrollTop
  // } else {
  //   $('html, body, .container').animate({
  //     scrollTop: $(".new-tweet").offset().top - 70
  //   }, 1000);
  // }
  $("#scroll-toggle").on("click", () => {
    scrollToggle();
  })
  scrollHover();
  scrollButton();
});
