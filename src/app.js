require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const TwitterManager = require("./core/twitter/twitter.manager");
const manager = new TwitterManager();
manager.createStream("javascript", ["#javascript"], (tweet) => {
    console.log("JAVASCRIPT!");
});
manager.createStream("python", ["#python"], (tweet) => {
    console.log("PYTHON!");
});

app.use("/", express.static("dist"));
app.listen(port, () => {
    console.log(`server listening at port ${port}`);
})