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

    // twitter stream
    // -------------------------------


    createStream(key, wordsArray, callback) {
        this.streams[key] = this.twitterClient.stream("statuses/filter", {
            track: wordsArray
        }).on("tweet", (tweet) => {
            callback(this.parseTweet(tweet));
        });
    }

    destroyStream(key) {
        this.streams[key].stop();
        delete this.streams[key];
    }

    // twitter post
    // -------------------------------

    sendTweet(tweet) {
        this.twitterClient.post("statuses/update",
            {
                status: tweet.message,
                attachment_url: tweet.imageUrl
            },
            (err, res) => {
                if (tweet.callback)
                    tweet.callback();
            })
        this.twitterClient.postMediaChunked({

        })
    }


    parseTweet(tweet) {
        const parsedTweet = Tweet.fromTweetRepresentation(tweet);
        if (tweet.entities.media) {
            parsedTweet.media = tweet.entities.media.map(m => m.media_url);
        }
        return parsedTweet;
    }

}

module.exports = TwitterManager