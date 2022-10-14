/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

// const newTime = format('2016-06-12', 'en_US');

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


// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     }
//   ]
  

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $newTweet = createTweetElement(tweet);
      $('#tweets-container').prepend($newTweet);
    }
  }
  

  // renderTweets(data);


$('.tweet-form').on('submit', function(event) {
  
  event.preventDefault();
  const dataToServer = $('.tweet-form').serialize();
  
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: dataToServer,
    success: (data) => {
      console.log('this post request succeeded and here\'s the data', dataToServer);
      loadtweets();
    },
    error: (error) => {
      console.log('this request failed and this was the error', error);
    }
  });


})

const loadtweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log('this get request succeeded and here\'s the data', data);
        renderTweets(data);
    },
    error: (error) => {
      console.log('this request failed and this was the error', error);
    }
  });
}

loadtweets();

// loadtweets(renderTweets());


});