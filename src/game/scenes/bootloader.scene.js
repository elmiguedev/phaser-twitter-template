import Phaser from "phaser";
import MonkeyPng from "../assets/monkey.png";
import vuePng from "../assets/vue.png";
import angularPng from "../assets/angular.png";
import reactPng from "../assets/react.png";

export default class BootloaderScene extends Phaser.Scene {
    constructor() {
        super({
            key: "BootloaderScene"
        });
    }

    preload() {

        this.load.spritesheet("vue", vuePng,{
            frameWidth:300,
            frameHeight:300
        });
        this.load.spritesheet("angular", angularPng,{
            frameWidth:300,
            frameHeight:300
        });
        this.load.spritesheet("react", reactPng,{
            frameWidth:300,
            frameHeight:300
        });

        this.load.on("complete", () => {
            this.scene.start("MainScene");
        });

    }
}