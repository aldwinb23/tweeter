/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('.tweet-form').on('submit', function(event) {
  
    event.preventDefault();

    const dataToServer = $('.tweet-form').serialize();
  
    if (dataToServer.length === 5) {
      return alert("You didn't type anything!");
    
    } else if (dataToServer.length > 145) {
      return alert("You exceed the maximum characters allowed!");
    
    } else {
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
    }
      
  });

  
  const createTweetElement = (tweet) => {
    let $tweet = $(`
      <article class="old-tweet-container">
        <header>
          <div class="icon-name">
            <img src="${tweet.user.avatars}">
            <div>${tweet.user.name}</div>
          </div>
          <div class="tweethandle">${tweet.user.handle}</div>
        </header>
        <div class="article-body"> ${tweet.content.text} </div>
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

    for (let tweet of tweets) {
      const $newTweet = createTweetElement(tweet);
      $('#tweets-container').prepend($newTweet);
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
