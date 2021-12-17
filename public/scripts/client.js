/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (data) => {
    return `
      <article class="tweet">
        <header>
          <div class="user">
            <img class="avatar" src=${escape(data.user.avatars)}>
            <div class="username">${escape(data.user.name)}</div>
          </div>
          <div class="userhandle">${escape(data.user.handle)}</div>
        </header>
        <div class="content">${escape(data.content.text)}</div>
        <footer>
          <div class="time">${timeago.format(data.created_at)}</div>
          <div class="actions">
            <a href="/#"><i class="fas fa-flag"></i></a>
            <a href="/#"><i class="fas fa-retweet"></i></a>
            <a href="/#"><i class="fas fa-heart"></i></a>
          </div>
        </footer>
      </article>
    `;
  };

  const renderTweets = (tweets) => {
    $('#tweets-container').empty();
    for (const tweet of tweets.reverse()) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then((data) => renderTweets(data));
  };

  loadTweets();

  // Tweet button behaviour
  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    const text = $('#tweet-text').val();
    $('#error').slideUp(100);

    if (!text) {
      $('#error-message').text("Cannot post an empty tweet!");
      $('#error').slideDown();
      return;
    }

    if (text.length > 140) {
      $('#error-message').text("Tweet is too long! Keep it under 140 characters.");
      $('#error').slideDown();
      return;
    }

    // Submit form
    const formData = $('#tweet-form').serialize();
    $.ajax("/tweets", {
      method: "POST",
      data: formData,
      success: loadTweets
    });

    // clear form
    $('#tweet-text').val("");
  });

  // Write button behaviour
  let formEnabled = false;
  $('#tweet-form').hide();
  $('#write').on('click', function(event) {
    if (formEnabled) {
      $('#tweet-form').slideUp();
      formEnabled = false;
    } else {
      $('#tweet-form').slideDown();
      $('#tweet-text').focus();
      formEnabled = true;
    }
  });

  $('#error').hide();
});

