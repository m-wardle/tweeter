$(document).ready(function() {
  // --- our code goes here ---
  $("article.tweet").hover(function() {
    $("article.tweet").css("box-shadow", "10px 10px #bdbdbd");
    $("p.tweet-handle").css("visibility", "visible");
  }, function() {
    $("article.tweet").css("box-shadow", "none");
    $("p.tweet-handle").css("visibility", "hidden");
  })
});