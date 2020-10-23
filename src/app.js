require("dotenv").config();

const express = require("express");
const app = express();
app.use("/", express.static("dist"));
const http = require("http").createServer(app);
const io = require("socket.io");
const twit = require("twit");

// aca va la logica dl server :V
const serverSocket = io(http);

serverSocket.on("connection", (socket) => {
    console.log("se conectó un socket!")
});


const twitter = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const sVue = twitter.stream("statuses/filter", {
    track: ["@beerjscba #vue"]
});
const sAngular = twitter.stream("statuses/filter", {
    track: ["@beerjscba #angular"]
});
const sReact = twitter.stream("statuses/filter", {
    track: ["@beerjscba #react"]
});

sVue.on("tweet", (tweet) => {
    serverSocket.emit("vue_tweet", {
        key: "vue",
        user: tweet.user.screen_name
    });
})
sAngular.on("tweet", (tweet) => {
    serverSocket.emit("angular_tweet", {
        key: "angular",
        user: tweet.user.screen_name
    });
})
sReact.on("tweet", (tweet) => {
    serverSocket.emit("react_tweet", {
        key: "react",
        user: tweet.user.screen_name
    });
})

http.listen(5000, () => "server escuchando");
