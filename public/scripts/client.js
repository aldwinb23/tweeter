/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('.tweet-form').on('submit', function(event) {
    
    const $text = $('#tweet-text').val();

    event.preventDefault();
    
    const dataToServer = $('.tweet-form').serialize();

    const errMessage = $('.error-message');
  
    if ($text.length === 0) {
      errMessage.slideDown(800);
      return errMessage.text("You didn't type anything!");
    }
    
    if ($text.length > 140) {
      errMessage.slideDown(800);
      return errMessage.text("You exceed the maximum characters allowed!");
    }
    
    errMessage.slideUp(800)

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: dataToServer,
      success: (data) => {
        loadtweets();
      },
      error: (error) => {
        console.log('this request failed and this was the error', error);
      }
    });

    $('.tweet-form')[0].reset();

  });


  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;

  };

  
  const createTweetElement = (tweet) => {
    let $tweet = $(`
      <article class="old-tweet-container">
        <header>
          <div class="icon-name">
            <img class="icon-photo" src="${tweet.user.avatars}">
            <div>${escape(tweet.user.name)}</div>
          </div>
          <div class="tweethandle">${tweet.user.handle}</div>
        </header>
        <div class="article-body"> ${escape(tweet.content.text)} </div>
        <footer>
          <div>${timeago.format(tweet.created_at)}</div>
          <div class="small-icon">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);

    return $tweet;

  }


  const renderTweets = function(tweets) {

    const $container = $('#tweets-container');
    $container.empty();

    for (let tweet of tweets) {
      const $newTweet = createTweetElement(tweet);
      $container.prepend($newTweet);
    }

  }
  
  
  const loadtweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        renderTweets(data);
      },
      error: (error) => {
        console.log('this request failed and this was the error', error);
      }
    });

  }


  loadtweets();


});
