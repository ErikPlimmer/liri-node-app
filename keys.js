const dotenv = require("dotenv").config();

const keys = {
  twitterKey = process.env.TWITTER_CONSUMER_KEY,
  twitterSecKey = process.env.TWITTER_CONSUMER_SECRET,
  spoitfyKey = process.env.SPOTIFY_ID,
  spotifySecKey = process.env.SPOTIFY_SECRET }

module.exports = twitterKey, twitterSecKey, spoitfyKey, spotifySecKey;