require("dotenv").config();
const GameServer = require("./core/game.server");

// 1. create game server
const gameServer = new GameServer();

// 2. define hashtags to stream
gameServer.createTweetListener({
    key: "js",
    filter: ["#javascript"],
    callback: (t) => {
        console.log("JS!, " + t.id);
    }
});
gameServer.createTweetListener({
    key: "py",
    filter: ["#python"],
    callback: (t) => {
        console.log("PY!, " + t.id);
    }
});


gameServer.start();
