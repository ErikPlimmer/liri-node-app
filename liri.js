const dotenv = require("dotenv").config();



// const keys = require("./keys.js");
const fs = require("fs");
const request = require('request');
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');

// Grab or assemble the movie name and store it in a variable called "movieName"
let input = process.argv[2];
let sliceInput = process.argv.slice(3); 
let encodeName = sliceInput.join('+');

switch (input) {
  case "movie-this":
    movie();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "my-tweets":
    tweets();
    break;  

  case "do-what-it-says":
    doThis();
    break;
}

function movie() {
  // Then run a request to the OMDB API with the movie specified
  const queryUrl = "http://www.omdbapi.com/?t=" + encodeName + "&y=&plot=short&apikey=trilogy";
  const noMovie = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy";
  // This line is just to help us debug against the actual URL.
  // console.log(queryUrl);

  if (process.argv[3] === undefined) {
    request(noMovie, function(error, response, body) {

      console.log(`\n The Best Movie ${JSON.parse(body).Title} \n Released: ${JSON.parse(body).Year}\n Rated: ${JSON.parse(body).Rated}\n Rotten tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}\n Produced in: ${JSON.parse(body).Country}\n Plot: ${JSON.parse(body).Plot}\n Actors: ${JSON.parse(body).Actors}\n Language: ${JSON.parse(body).Language}`);
    });  
  }else {
  
     // Then create a request to the queryUrl
     request(queryUrl, function(error, response, body) {

   
      // If the request is successful
      if (!error && response.statusCode === 200) {

         console.log(`\n Title ${JSON.parse(body).Title} \n Released: ${JSON.parse(body).Year}\n Rated: ${JSON.parse(body).Rated}\n Rotten tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}\n Produced in: ${JSON.parse(body).Country}\n Plot: ${JSON.parse(body).Plot}\n Actors: ${JSON.parse(body).Actors}\n Language: ${JSON.parse(body).Language}`);
      } 
    });  
  }
  
     
    
}

function spotify(song) {
 // const spotifyKey = new Spotify(keys.spotify);

  const spotifyRequest = new Spotify({
    id: '5741319983624e559f4df80472b129b5' ,
    secret: 'bd6ea15212744069b7051c9fdf2ed4b8',
 
  });
 
      if (song != undefined) {
        spotifyRequest.search({ type: 'track', query: song , limit: '1' }, function(err, data) {
          if (err) {
             return console.log('Error occurred: ' + err);
           }
           console.log(song);
           console.log('\nArtist:' , data.tracks.items[0].album.name);
           console.log('Album:' , data.tracks.items[0].artists[0].name); 
           console.log('Song name:' , data.tracks.items[0].name);
           console.log('Spotify link:' , data.tracks.items[0].preview_url);
        });      
  }  else  {
  if (process.argv[3] === undefined) {
    spotifyRequest.search({ type: 'track', query: 'Orinoco Flow' , limit: '1'}, function(err, data) {
      console.log('\nArtist:' , data.tracks.items[0].album.name);
      console.log('Album:' , data.tracks.items[0].artists[0].name); 
      console.log('Song name:' , data.tracks.items[0].name);
      console.log('Spotify link:' , data.tracks.items[0].preview_url);
  
    });  
  
  } else {  
      spotifyRequest.search({ type: 'track', query: encodeName , limit: '20' }, function(err, data) {
       if (err) {
          return console.log('Error occurred: ' + err);
        }
      
    
       for (let i = 0; i < data.tracks.items.length; i++) {
          console.log('\n Artists: '  + data.tracks.items[i].artists[0].name + '\n Album: ' + data.tracks.items[i].album.name + '\n Song name: ' + data.tracks.items[i].name + '\n Spotify link: ' + data.tracks.items[i].preview_url + '\n');
        }    
      });
    } 
}
}
function tweets() {
  // const client = new Twitter(keys.twitter);
  const client = new Twitter({
    consumer_key: '3ceMQXhFi3NUxIpRfmvoaWlyz',
    consumer_secret: 'XDNwV8KRrpLxSFxfco6v6BrOQSH5LlMG9YladGxHFWX1JVWgR5',
    access_token_key: '961786753932722177-ZiqI8uYFT3XHSqtth6MQ5ueuytJq3zG',
    access_token_secret: 'yvMQ8MZKF1FiWwFYSFKJfzpY7v1TBw8WzGrOjS7woNCRT'
  });
  const queryUrl =  'https://api.twitter.com/1.1/search/tweets.json/elp013' ;
 
  var params = {screen_name: '@elp013'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (let i = 0; i < tweets.length; i++) {
              console.log(tweets[i].created_at);
              console.log(tweets[i].text);
              
      }
    }
  });


}

function doThis() {
  
  fs.readFile('random.txt','utf8',  function(error, data) {
    
      // If there's an error log it and return
      if (error) {
        return console.log(error);
      }
    
      spotify(data);
      
    });
}