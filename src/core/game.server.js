const express = require("express");
const http = require("http");
const io = require("socket.io");
const TwitterManager = require("./twitter/twitter.manager");

class GameServer {

    // constructors
    // ------------------

    constructor() {
        this.createServerListener();
        this.createServerMessages();
        this.createTwitterManager();
    }

    // game configuration methods
    // --------------------------

    createServerListener() {

        // create express as a http request listener
        this.expressApp = express();
        this.createExpressRoutes();

        // create the main http server
        this.httpServer = http.createServer(this.expressApp);

        // creates the web sockets server, throgh http server
        this.serverSocket = io(this.httpServer);

        // define the game port
        this.port = process.env.PORT || 5000;
    }

    createTwitterManager() {
        this.twitterManager = new TwitterManager();
    }

    createServerMessages() {
        this.serverSocket.on("connection", (socket) => {
            console.log(`new socket connected (id: ${socket.id})`);
        });
    }

    createExpressRoutes() {
        this.expressApp.get("/test", (req, res) => {
            res.send("Hello game world!");
        });
    }

    // action methods
    // -------------------------

    start() {
        this.httpServer.listen(this.port, () => {
            console.log(`Server listening at port ${this.port}`);
        })
    }

    createTweetListener(options) {
        this.twitterManager.createStream(options.key, options.filter, (tweet) => {
            // emit to all client when a tweet appears
            this.serverSocket.emit("tweet", {
                key: options.key,
                tweet: tweet
            });

            // call callback if it exists
            if (options.callback)
                options.callback(tweet);
        });
    }


}

module.exports = GameServer;
