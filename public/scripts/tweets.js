// Implemented via CSS - now redundant and not referenced via index.html. Leaving for posterity/reference for jQuery solution

$(document).ready(function() {
  $(".tweet").hover(function() {
    $(this).css("box-shadow", "10px 10px #bdbdbd");
    $(this).find("p.tweet-handle").css("visibility", "visible");
  }, function() {
    $(this).css("box-shadow", "none");
    $(this).find("p.tweet-handle").css("visibility", "hidden");
  })
});