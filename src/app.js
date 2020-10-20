require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
    console.log("Socket conencted:", socket.id);
})

const TwitterManager = require("./core/twitter/twitter.manager");
const manager = new TwitterManager();
manager.createStream("javascript", ["#javascript"], (tweet) => {
    console.log("JAVASCRIPT!");
    io.emit("tweet", {
        tag: "javascript",
        tweet: tweet
    });
});
manager.createStream("python", ["#python"], (tweet) => {
    console.log("PYTHON!");
    io.emit("tweet", {
        tag: "python",
        tweet: tweet
    });
});

app.use("/", express.static("dist"));
http.listen(port, () => {
    console.log(`server listening at port ${port}`);
})