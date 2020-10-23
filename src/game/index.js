import Phaser from "phaser";
import BootloaderScene from "./scenes/bootloader.scene"
import MainScene from "./scenes/main.scene"

export default class Game extends Phaser.Game {
    constructor() {
        super({
            type: Phaser.AUTO,
            parent: "divGame",
            width: 800,
            height: 600,
            scene: [
                BootloaderScene,
                MainScene
            ]
        });
    }
}

const game = new Game();