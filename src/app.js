require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const TwitterManager = require("./utils/twitter.manager");
const manager = new TwitterManager();
manager.createStream(["#javascript"], (tweet) => {
    console.log(tweet);
});

app.use("/", express.static("dist"));
app.listen(port, () => {
    console.log(`server listening at port ${port}`);
})