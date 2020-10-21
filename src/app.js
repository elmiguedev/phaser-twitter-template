require("dotenv").config();
const GameServer = require("./core/game.server");
const gameServer = new GameServer();
gameServer.start();
