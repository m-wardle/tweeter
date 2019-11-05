/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const escape = function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const dateDifference = function(date) {
  let today = new Date();
  let tweet = date;

  let difference = today - date;
  let differenceDay = Math.floor(difference / (1000 * 3600 * 24));

  // if (differenceDay > 365) {
  //     let years = Math.floor(differenceDay / 365);
  //     differenceDay = differenceDay % 365;
  //   }

  return differenceDay;
  }

const createTweetElement = function(tweetObj) {
  let tweet = $(`<article class="tweet">
  <header>
    <div class="avatar-name">
      <img class="tweet-avatar" src="${escape(tweetObj.user.avatars)}">
      <p class="tweet-name">${escape(tweetObj.user.name)}</p>
    </div>
    <p class="tweet-handle">${escape(tweetObj.user.handle)}</p>
  </header>
  <div class="tweet-text">
    <p>${escape(tweetObj.content.text)}</p>
  </div>
  <footer>
    <p class="tweet-timestamp">${dateDifference(tweetObj.created_at)} days ago</p>
    <div class="tweet-icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
  </article>`)

  return tweet;
}

const renderTweets = function(tweets) {
  for (tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
}

$(document).ready(function() {
  console.log("test");
  renderTweets(data);
});