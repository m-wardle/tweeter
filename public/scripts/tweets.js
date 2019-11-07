$(document).ready(function() {
  $("article.tweet").hover(function() {
    $(this).css("box-shadow", "10px 10px #bdbdbd");
    $(this).find("p.tweet-handle").css("visibility", "visible");
  }, function() {
    $(this).css("box-shadow", "none");
    $(this).find("p.tweet-handle").css("visibility", "hidden");
  })
});