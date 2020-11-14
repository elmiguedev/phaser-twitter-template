import Phaser from "phaser";
import c1Png from "../assets/c1.png";
import c2Png from "../assets/c2.png";
import c3Png from "../assets/c3.png";
import basePng from "../assets/base.png";
import pythonPng from "../assets/python.png";
import jsPng from "../assets/js.png";
import fondoPng from "../assets/fondo.png";
import aJsPng from "../assets/aJs.png";
import aPyPng from "../assets/aPy.png";

export default class BootloaderScene extends Phaser.Scene {
    constructor() {
        super({
            key: "BootloaderScene"
        });
    }

    preload() {

        this.load.image("c1", c1Png);
        this.load.image("c2", c2Png);
        this.load.image("c3", c3Png);
        this.load.image("base", basePng);
        this.load.image("python", pythonPng);
        this.load.image("js", jsPng);
        this.load.image("fondo", fondoPng);
        this.load.image("aJs", aJsPng);
        this.load.image("aPy", aPyPng);

        this.load.on("complete", () => {
            this.scene.start("MainScene");
        });

    }
}