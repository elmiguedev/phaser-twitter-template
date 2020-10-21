import Phaser from "phaser";
import ServerManager from "../core/server.manager";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene"
        });
    }

    // creation methods
    // ----------------------------

    /**
     * Just an example entity which can move around the screen
     */
    createMonkey() {
        this.monkey = this.add.image(100, 100, "monkey");
    }

    /**
     * creates keys for example entity
     */
    createKeys() {
        this.teclas = {
            left: this.input.keyboard.addKey("left"),
            right: this.input.keyboard.addKey("right"),
            up: this.input.keyboard.addKey("up"),
            down: this.input.keyboard.addKey("down"),
        }
    }

    /**
     * creates io listener for tweets, through ServerManager instance
     */
    createTwitterListener() {
        this.serverManager = new ServerManager();
        this.serverManager.onTweet((data) => {
            this.createRandomText(data.key);
        });
    }

    /**
     * creates a random text, depending on the received key
     */
    createRandomText(key) {
        let text = "";
        switch (key) {
            case "js":
                text = "Javascript!"
                break;
            case "py":
                text = "Python!";
                break;
            default:
                break;
        }

        this.add.text(
            Phaser.Math.Between(10, 630),
            Phaser.Math.Between(10, 470),
            text
        );
    }

    // check methods
    // --------------------------

    checkKeys() {
        if (this.teclas.right.isDown) {
            this.monkey.x += 3;
        }
        if (this.teclas.left.isDown) {
            this.monkey.x -= 3;
        }
        if (this.teclas.up.isDown) {
            this.monkey.y -= 3;
        }
        if (this.teclas.down.isDown) {
            this.monkey.y += 3;
        }
    }


    // main loop methods
    // ----------------------------

    init() {
        this.createMonkey();
        this.createKeys();
        this.createTwitterListener();
    }

    update() {
        this.checkKeys();
    }
}