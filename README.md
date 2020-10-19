# Phaser 3 Twitter Game Template

A Phaser 3 project template, configurated with ParcelJs to run server and client (game) both at the same time. It includes hot-reloading for development and production-ready builds.
Also, include classes for twitter management and server sockets, for game mechanics.


## Requirements
Node.js is required to install dependencies and run scripts via npm.

## Available Commands

| Command          | Description           
| ---------------- |------------------|
| npm install      | install project dependencies  |
| npm run build-game   | bundle game js and assets with parcel      |  |
| npm run watch-game   | prepare game bundle with hot-reload |
| npm run run-server   | execute node server |
| npm run watch-server | execute node server with nodemon, to reboot on server changes |
| npm run dev | execute watch-game and watch-server with concurrently, great for game development :D |
| npm start | build phaser game and run the node server |

## Getting started

1. Clone this repo
2. Run npm install from your project directory
3. Start the local development server by running npm run dev. (After that you can edit any files in the src folder and Parcel/Nodemon will automatically recompile and reload your game and server (available at http://localhost:8080 by default).
4. Code!!





