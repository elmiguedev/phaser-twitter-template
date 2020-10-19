import Phaser from "phaser";
import MonkeyPng from "../assets/monkey.png";

export default class BootloaderScene extends Phaser.Scene {
    constructor() {
        super({
            key: "BootloaderScene"
        });
    }

    preload() {

        this.load.image("monkey", MonkeyPng);

        this.load.on("complete", () => {
            this.scene.start("MainScene");
        });

    }
}