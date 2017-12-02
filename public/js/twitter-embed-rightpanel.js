var Twitter = require('twitter');
var keys = require('./keys.js');

var getTweets = function()
  {
  var client = new Twitter(keys.twitterKeys);

  var params = {screen_name: 'closets4good', count: 6};
  client.get('statuses/user_timeline', params, function(error, tweets, response) 
    {
    if (error) 
      {
      console.log(error)
      };
        else 
        {
        for(var i = 0; i < tweets.length; i++)
          {
          var tweeted = tweets[i].created_at;
          var image = tweets[i].image;
          var tweet = tweets[i].text;
          }
        }
    });
  }