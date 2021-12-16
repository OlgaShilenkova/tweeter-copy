/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  console.log("Client.js : I am ready!");

  // const tweetData = {
  //   user: {
  //     name: "Newton",
  //     avatars: "https://i.imgur.com/73hZDYK.png",
  //     handle: "@SirIsaac",
  //   },
  //   content: {
  //     text: "If I have seen further it is by standing on the shoulders of giants",
  //   },
  //   created_at: timeago.format(1461116232227),
  // };

  // //  Single Tweeet
  // const $tweet = `
  //       <article class="tweet">
  //         <header class="tweet-header">
  //           <div class="tweet-header-avatar">
  //             <img src="/images/profile-hex.png" width="70px" height="70px" />
  //             <p>${tweetData.user.name}</p>
  //           </div>
  //           <p class="tweet-header-handle">${tweetData.user.handle}</p>
  //         </header>
  //         <p class="tweet-content"> ${tweetData.content.text}</p>
  //         <footer class="tweet-footer">
  //           <span class="tweet-footer-timestamp">${tweetData.created_at}</span>
  //           <div class="tweet-footer-icons">
  //             <i class="fa-solid fa-flag"></i>
  //             <i class="fa-solid fa-retweet"></i>
  //             <i class="fa-solid fa-heart"></i>
  //           </div>
  //         </footer>
  //       </article>`;

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $(".tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  //to perform request and deal with result
  const loadTweets = function () {
    const url = "http://localhost:8080/tweets";

    //sending AJAX request
    $.ajax({
      url: url,
      method: "GET",
    })
      //if no error see this
      .done((results) => {
        console.log(results);
        renderTweets(results);
      })
      .fail((error) => console.log(`Error:${error.message}`))
      .always(() => console.log(`Request to ${url} done`));
  };

  //fetching tweets from array of objects
  const renderTweets = function (tweets) {
    // loops through array of data/tweets
    for (let tweet of tweets) {
      // console.log("tweet", tweet);

      // calls createTweetElement for each tweet
      let $singleTweet = createTweetElement(tweet);

      // takes return value and appends it to the tweets container
      $(".tweets-container").append($singleTweet);
    }
  };

  //creating single tweet based on data array that we have above
  const createTweetElement = function (tweet) {
    let $tweet = `
    <article class="tweet">
      <header class="tweet-header">
        <div class="tweet-header-avatar">
          <img src="/images/profile-hex.png" width="70px" height="70px" />
          <p>${tweet.user.name}</p>
        </div>
        <p class="tweet-header-handle">${tweet.user.handle}</p>
      </header>
      <p class="tweet-content"> ${tweet.content.text}</p>
      <footer class="tweet-footer">
        <span class="tweet-footer-timestamp">${timeago.format(
          tweet.created_at
        )}</span>
        <div class="tweet-footer-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`;
    return $tweet;
  };

  renderTweets(data);

  //
  //Form Submittion using JQuery
  //
  //catch the form submit
  $(".new-tweet-form").on("submit", function (event) {
    //prevent form from submittion and reloading the page
    event.preventDefault();
    console.log("form submit");

    //select textarea
    const $textAreaInput = $("#tweet-text");

    //catch input from textarea
    const $inputData = $textAreaInput.val();
    console.log("input =>", $inputData);

    //make Ajax request
    loadTweets($inputData);
  });
  
  /*I did not understand part about POST request to server with serialize data 
    const content = $(this).serialize();

    console.log( $(this).serialize());

    $.ajax({
      url:`http://localhost:8080`,
      method: 'POST',
      data: content,
    })
      .done((result) => {
        console.log(result);
      })
      .fail((err) => console.log(err));
   });
    */
});
