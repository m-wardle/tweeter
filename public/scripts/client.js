/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

  return (differenceDay > 0 ? (differenceDay + (differenceDay > 1 ? 'days ago' : 'day ago')) : 'Today');
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
    <p class="tweet-timestamp">${dateDifference(tweetObj.created_at)}</p>
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

const loadTweets = async () =>  {
  try {
    const response = await $.ajax({
      url: `/tweets`,
      type: 'GET'
    })

    renderTweets(response)

  } catch (err) {
    console.error(err)
  }
}

const sendTweet = function(tweet) {
  $.ajax({ 
    url: `/tweets`,
    type: 'POST',
    data: tweet
  })
}

const validateTweet = function(tweet) {
  const tweetText = tweet.split("=")[1];
  if (tweetText.length > 0 && tweetText.length <= 140) {
    sendTweet(tweet)
  } else if (tweetText.length <= 0) {
    alert("Tweet cannot be empty!");
  } else if (tweetText.length > 140) {
    console.log('-------test---------');
    alert("Tweet must not contain more than 140 characters.");
  }
}

$(document).ready(function() {
  loadTweets();
  $('#compose-tweet').submit(function(event) {
    event.preventDefault();
    validateTweet($(this).serialize())
  });
});
