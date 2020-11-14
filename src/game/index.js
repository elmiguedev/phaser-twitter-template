import Phaser, { Physics } from "phaser";
import BootloaderScene from "./scenes/bootloader.scene"
import MainScene from "./scenes/main.scene"

export default class Game extends Phaser.Game {
    constructor() {
        super({
            type: Phaser.AUTO,
            parent: "divGame",
            width: 640,
            height: 480,
            scene: [
                BootloaderScene,
                MainScene
            ],
            physics: {
                default: "arcade",
                
            }
        });
    }
}

const game = new Game();