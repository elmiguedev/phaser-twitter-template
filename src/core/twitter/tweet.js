class Tweet {
    constructor(options = {}) {
        this.id = options.id || null;
        this.idStr = options.idStr || "";
        this.username = options.username || "";
        this.displayName = options.displayName || "";
        this.location = options.location || "";
        this.message = options.message || "";
        this.media = options.media || [];
        this.hashtags = options.hashtags || [];
        this.mentions = options.mentions || [];
        this.date = options.date || null;
        this.likes = options.likes || 0;
        this.retweets = options.likes || 0;
    }

    static fromTweetRepresentation(tweetRepresentation) {
        const tweet = new Tweet();
        tweet.id = tweetRepresentation.id;
        tweet.idStr = tweetRepresentation.id_str;
        tweet.date = tweetRepresentation.created_at;
        tweet.message = tweetRepresentation.text;
        tweet.username = tweetRepresentation.user.screen_name;
        tweet.displayName = tweetRepresentation.user.name;
        tweet.location = tweetRepresentation.user.location;
        tweet.id = tweetRepresentation.id;
        tweet.retweets = tweetRepresentation.retweet_count;
        tweet.likes = tweetRepresentation.favorite_count;
        tweet.hashtags = tweetRepresentation.entities.hashtags.map(h => h.text);
        tweet.mentions = tweetRepresentation.entities.user_mentions.map(m => m.screen_name);
        return tweet;
    }
}

module.exports = Tweet;