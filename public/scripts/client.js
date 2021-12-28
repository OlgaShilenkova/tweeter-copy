/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//
//create safe Html
//
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//
// fetch tweets from localhost
//
const loadTweets = function () {
  const url = "http://localhost:8080/tweets";

  //send AJAX request
  $.ajax({
    url: url,
    method: "GET",
    dataType: "json", // define type of data that you are going to receive
    success: function (data) {
      renderTweets(data);
    },
  });
};

//
//fetch tweets from array of objects
//
const renderTweets = function (tweets) {
  // loops through array of data/tweets
  for (let tweet of tweets) {
    // create single tweet element for each tweet
    let $singleTweet = createTweetElement(tweet);

    // takes return value and appends it to the tweets container
    $(".tweets-container").prepend($singleTweet);
  }
};

//
//create single tweet based on data array that we have above
//
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
  <p class="tweet-content"> ${escape(tweet.content.text)}</p>
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

//
// renderTweets(data);
//
$(document).ready(function () {
  console.log("Client.js : I am ready!");

  //
  //submit form using JQuery / add newly created tweet
  //

  //catch the form submit
  $(".new-tweet-form").on("submit", function (event) {
    //prevent form from submittion and refreshing the page
    event.preventDefault();

    //select textarea
    const $textAreaInput = $("#tweet-text");

    //catch input from textarea
    const $inputData = $textAreaInput.val();

    //validate form's input
    if (!$inputData.length) {
      return $("#new-tweet-errors")
        .text("Are you sure that you wrote somethig? Your tweet is empty.")
        .slideDown().delay( 2000 ).slideUp(); //show error message, then pauses for 2 sec, then close
    }

    if ($inputData.length > 140) {
      return $("#new-tweet-errors")
        .text("You tweet is tooo loooong.")
        .slideDown().delay( 2000 ).slideUp();
    }

    //select where to take input from
    const $userInput = $(this);

    const url = "http://localhost:8080/tweets";

    //send AJAX request to post user's input into data
    $.ajax({
      url: url,
      method: "POST",
      data: $userInput.serialize(), //set format of user's input into a query string
      type: "application/json",
      success: function () {
        //clean input area
        $textAreaInput.val("");
        //select counter
        let $charCounter = $(".new-tweet-counter");
        //reset counter back to 140 after submitting a new tweet
        $charCounter.val("140");
        //clean container from previous tweets, bcs we render them later in loadTweets
        $(".tweets-container").empty();
        //make Ajax request to database
        loadTweets();
      },
    });
  });
  //make Ajax request
  loadTweets();
});
