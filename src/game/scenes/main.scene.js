import Phaser from "phaser";
import io from "socket.io-client";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene"
        });
    }

    init() {
        this.monkey = this.add.image(100, 100, "monkey");
        this.teclas = {
            left: this.input.keyboard.addKey("left"),
            right: this.input.keyboard.addKey("right"),
            up: this.input.keyboard.addKey("up"),
            down: this.input.keyboard.addKey("down"),
        }

        this.socket = io();
        this.socket.on("tweet", (data) => {
            console.log(data);
            this.add.text(
                Phaser.Math.Between(10, 630),
                Phaser.Math.Between(10, 470),
                data.tag
            );
        })

    }

    update() {
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
}