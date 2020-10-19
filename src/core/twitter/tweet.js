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
}

module.exports = Tweet;