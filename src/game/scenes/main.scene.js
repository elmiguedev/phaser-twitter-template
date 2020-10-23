import Phaser from "phaser";
import ServerManager from "../core/server.manager";
import io from "socket.io-client";

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
    createPlayers() {
        this.angular = this.add.sprite(100, 100, "angular").setScale(0.6);
        this.vue = this.add.sprite(100, 300, "vue").setScale(0.6);
        this.react = this.add.sprite(100, 500, "react").setScale(0.6);

        this.anims.create({
            key: "angular_anim",
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers("angular",
                { frames: [0, 1, 2, 3,4,3,2,1] }
            )
        })
        this.anims.create({
            key: "vue_anim",
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers("vue",
                { frames: [0, 1, 2, 3,4,3,2,1] }
            )
        })
        this.anims.create({
            key: "react_anim",
            repeat: -1,
            frameRate: 8,

            frames: this.anims.generateFrameNumbers("react",
                { frames: [0, 1, 2, 3,4,3,2,1] }
            )
        })
    }

    /**
     * creates keys for example entity
     */
    createKeys() {
        this.teclas = {
            a: this.input.keyboard.addKey("a"),
            r: this.input.keyboard.addKey("r"),
            v: this.input.keyboard.addKey("v"),
        }
    }

    /**
     * creates io listener for tweets, through ServerManager instance
     */
    createTwitterListener() {
        // this.serverManager = new ServerManager();
        // this.serverManager.onTweet((data) => {
        // });
        const socket = io();
        socket.on("vue_tweet", (tweet) => {
            this.moveVue();
            console.log(tweet.user);
        })
        socket.on("angular_tweet", (tweet) => {
            this.moveAngular();
            console.log(tweet.user);
        })
        socket.on("react_tweet", (tweet) => {
            this.moveReact();
            console.log(tweet.user);
        })

        /**
         * hola migue, aca va toda la logica del io 
         */
    }

    /**
     * creates a random text, depending on the received key
     */

    // check methods
    // --------------------------

    moveAngular() {
        this.angular.x += 5;
        this.angular.anims.play("angular_anim",true);
    }
    moveReact() {
        this.react.x += 5;
        this.react.anims.play("react_anim",true);
    }
    moveVue() {
        this.vue.x += 5;
        this.vue.anims.play("vue_anim",true);
    }

    checkKeys() {
        if (this.teclas.a.isDown) {
            this.moveAngular();
        }
        if (this.teclas.r.isDown) {
            this.moveReact();
        }
        if (this.teclas.v.isDown) {
            this.moveVue();
        }
        
    }


    // main loop methods
    // ----------------------------

    init() {
        this.cameras.main.setBackgroundColor("#FFFFFF")
        this.createPlayers();
        this.createKeys();
        this.createTwitterListener();
    }

    update() {
        this.checkKeys();
    }
}