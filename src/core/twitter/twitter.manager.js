const Twitter = require("twit");
const Tweet = require("./tweet");

class TwitterManager {

    constructor() {
        this.twitterClient = new Twitter({
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            access_token: process.env.ACCESS_TOKEN,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET
        });
        this.streams = {};
    }

    createStream(key, wordsArray, callback) {
        this.streams[key] = this.twitterClient.stream("statuses/filter", {
            track: wordsArray
        }).on("tweet", (tweet) => {
            callback(this.parseTweet(tweet));
        });
    }

    getTweets(query) {

    }

    postTweet() {

    }

    parseTweet(tweet) {
        const parsedTweet = new Tweet();

        parsedTweet.id = tweet.id;
        parsedTweet.idStr = tweet.id_str;
        parsedTweet.date = tweet.created_at;
        parsedTweet.message = tweet.text;
        parsedTweet.username = tweet.user.screen_name;
        parsedTweet.displayName = tweet.user.name;
        parsedTweet.location = tweet.user.location;
        parsedTweet.id = tweet.id;
        parsedTweet.retweets = tweet.retweet_count;
        parsedTweet.likes = tweet.favorite_count;
        parsedTweet.hashtags = tweet.entities.hashtags.map(h => h.text);
        parsedTweet.mentions = tweet.entities.user_mentions.map(m => m.screen_name);

        if (tweet.entities.media) {
            parsedTweet.media = tweet.entities.media.map(m => m.media_url);
        }

        return parsedTweet;
    }

}

module.exports = TwitterManager