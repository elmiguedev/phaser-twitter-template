const Twitter = require("twit");

class TwitterManager {

    constructor() {
        this.twitterClient = new Twitter({
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            access_token: process.env.ACCESS_TOKEN,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET
        });
    }

    createStream(wordsArray, callback) {
        this.twitterClient.stream("statuses/filter", {
            track: wordsArray
        }).on("tweet", callback);
    }

}

module.exports = TwitterManager