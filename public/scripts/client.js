/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//  Escape function to prevent Cross Site Scripting

const escape = function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Calculate how many days ago a tweet was made (Possible TODO - implement days/months/years)

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

// Create the tweet with proper HTML structure

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

// Loop through tweets and append to main site

const renderTweets = function(tweets) {
  for (tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
}

// AJAX request to get all tweets, sends them to render

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

// AJAX post request which also renders the new tweet

const sendTweet = async function(tweet) {
  $('#compose-tweet > textarea').val('');
  $('#error-message').empty();
  try {
    await $.ajax({ 
    url: `/tweets`,
    type: 'POST',
    data: tweet
  })

  renderNewTweet();

  } catch (err) {
    console.error(err);
  }
}

// Generates error messages to be used within validateTweet

const errorMessage = function(error) {
  const message = $(
  `<div class="isa_error">
    <i class="fa fa-times-circle"></i>
    <p>${escape(error)}</p>
  </div>`
)

  return message;
}

// Checks if new Tweet is valid - if so, sends tweet (which renders)

const validateTweet = function(tweet) {
  const tweetText = tweet.split("=")[1];
  if (tweetText.length > 0 && tweetText.length <= 140) {
    sendTweet(tweet)
  } else if (tweetText.length <= 0) {
    $('#error-message').empty();
    errorMessage("Tweet cannot be empty!").hide().appendTo($('#error-message')).slideDown("fast");
  } else if (tweetText.length > 140) {
    $('#error-message').empty();
    errorMessage("Tweet must not contain more than 140 characters.").hide().appendTo($('#error-message')).slideDown("fast");
    $('#compose-tweet > textarea').val('');
  }
}

// Gets tweets, renders most recent (TODO: clean this up by utilizing loadTweet somehow)

const renderNewTweet = async () => {
  try {
    const response = await $.ajax({
      url: `/tweets`,
      type: 'GET'
    })
    $('#tweets-container').append(createTweetElement(response[response.length - 1]));
  } catch (err) {
    console.error(err);
  }
}

// Application of function on load

$(document).ready(function() {
  loadTweets();
  $('#compose-tweet').submit(function(event) {
    event.preventDefault();
    validateTweet($(this).serialize());
  });
  $('#compose-tweet').keydown(function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      validateTweet($(this).serialize());
    }
  });
});
