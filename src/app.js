require("dotenv").config();
const express = require("express");
const app = express();
app.use("/", express.static("dist"));

const http = require("http").createServer(app);
const io = require("socket.io");
const twit = require("twit");

// tenemos que inicializar twitter
const twitter = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

// aca va la logica del server (Crear el server socket)
const serverSocket = io(http);

// iniciar el servior
serverSocket.on("connection", (socket) => {
    console.log("se conectó un socket!")
});


// streams
const streamJs = twitter.stream("statuses/filter", {
    track: ["#javascript"]
});
const streamPy = twitter.stream("statuses/filter", {
    track: ["#python"]
});

streamJs.on("tweet", (tweet) => {
    serverSocket.emit("tweet", {
        key: "javascript",
        user: tweet.user.screen_name 
    })
})
streamPy.on("tweet", (tweet) => {
    serverSocket.emit("tweet", {
        key: "python",
        user: tweet.user.screen_name 
    })
})

http.listen(5000, () => "server escuchando");
