// const dotenv = require("dotenv").config();

// const keys = 'keys.js';

// const spotify = new Spotify(keys.spotify);
// const client = new Twitter(keys.twitter);







var fs = require("fs");
const request = require('request');

// Grab or assemble the movie name and store it in a variable called "movieName"
const input = process.argv[2];
const movieInput = process.argv.slice(3); 
const encodeName = movieInput.join('+');

switch (input) {
  case "movie-this":
    movie();
    break;

  case "spotify-this-song":
    spotifiy();
    break;

  case "my-tweets":
    tweets();
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

      console.log(` The best movie ${JSON.parse(body).Title} \n was released in ${JSON.parse(body).Year}\n the rating is ${JSON.parse(body).Rated}\n Rotten tomatoes rating is ${JSON.parse(body).Ratings[1].Value}\n Was produced in ${JSON.parse(body).Country}\n Language ${JSON.parse(body).Language} Plot ${JSON.parse(body).Plot}\n Actors ${JSON.parse(body).Actors}`);
    });  
  }else {
  

  // Then create a request to the queryUrl
  request(queryUrl, function(error, response, body) {

   
    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Then log the Release Year for the movie

     console.log(` The movie ${JSON.parse(body).Title} \n was released in ${JSON.parse(body).Year}\n the rating is ${JSON.parse(body).Rated}\n Rotten tomatoes rating is ${JSON.parse(body).Ratings[1].Value}\n Was produced in ${JSON.parse(body).Country}\n Language ${JSON.parse(body).Language} Plot ${JSON.parse(body).Plot}\n Actors ${JSON.parse(body).Actors}`);
    } 
  });  
}
  
     
    
}



function spotifiy() {
const spotifyKey = new Spotify(keys.spotify);

}
 
