import io from "socket.io-client"
export default class ServerManager {
    constructor() {

        // creates client socket, connectin with same server
        this.socket = io();

    }

    onTweet(callback) {
        this.socket.on("tweet", (data) => {
            callback(data);
        });
    }
}