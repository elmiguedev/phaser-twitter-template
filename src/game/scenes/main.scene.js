import Phaser from "phaser";
import io from "socket.io-client"

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene"
        });
    }

    // creation methods
    // ----------------------------

    /**
     * creamos las imagenes base del juego
     */
    createBase() {
        this.fondo = this.add.image(0,0,"fondo").setOrigin(0);
        this.ballsGroup = this.physics.add.group();
        this.aJs = this.add.image(40,450,"aJs").setOrigin(0);
        this.aPy = this.add.image(340,450,"aPy").setOrigin(0);
        this.base = this.physics.add.sprite(5, 450, "base").setOrigin(0).setImmovable(true);
        this.c1 = this.physics.add.sprite(5, 260, "c1").setOrigin(0).setImmovable(true);
        this.c2 = this.physics.add.sprite(266, 260, "c2").setOrigin(0).setImmovable(true);
        this.c3 = this.physics.add.sprite(564, 260, "c3").setOrigin(0).setImmovable(true);
        this.baseGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false,
        });
        this.baseGroup.add(this.base);
        this.baseGroup.add(this.c1);
        this.baseGroup.add(this.c2);
        this.baseGroup.add(this.c3);


    }

    /**
     * creamos las teclas de prueba
     */
    createKeys() {
        this.teclas = {
            js: this.input.keyboard.addKey("j"),
            py: this.input.keyboard.addKey("p"),
        }
    }

    /**
     * creamos el controlador de twitter
     */
    createTwitterListener() {
        this.socket = io();
        this.socket.on("tweet", (tweet) => {

                console.log(tweet);
                this.createRandomText(tweet.user);
                this.createBall(tweet.key)
        })
    }

    /**
     * crea un texto random del usuario
     */
    createRandomText(user) {
        let text = "🐦" + user;
        const t = this.add.text(
            Phaser.Math.Between(10, 600),
            Phaser.Math.Between(10, 240),
            text
        );
        setTimeout(() => {
            t.destroy();
        }, 2000)
    }

    // check methods
    // --------------------------

    createBall(type) {
        if (type == "javascript") {
            const b = this.physics.add.sprite(160,160,"js");
            this.ballsGroup.add(b);
                b.setGravityY(1000);
                b.setVelocityX(Phaser.Math.Between(-50,50));
                b.lang = "js"
        }
        else {
            const b = this.physics.add.sprite(400,160,"python");
            this.ballsGroup.add(b);
            b.setGravityY(1000);
            b.lang = "py";
            b.setVelocityX(Phaser.Math.Between(-50,50));
        }
        
    }
    checkKeys() {
        if (this.teclas.js.isDown) {
            const b = this.physics.add.sprite(160,160,"js");
            this.ballsGroup.add(b);
            b.setGravityY(1000);
            b.setVelocityX(Phaser.Math.Between(-50,50));
            b.lang = "js"
        }
        if (this.teclas.py.isDown) {
            const b = this.physics.add.sprite(400,160,"python");
            this.ballsGroup.add(b);
            b.setGravityY(1000);
            b.lang = "py";
            b.setVelocityX(Phaser.Math.Between(-50,50));
            
        }
    }


    // main loop methods
    // ----------------------------

    init() {
        this.createKeys();
        this.createBase();
        this.createTwitterListener();
    }

    update() {
        this.checkKeys();
        this.physics.collide(this.baseGroup,this.ballsGroup,(base,ball) => {
            ball.destroy();
            if (ball.lang == "js")
                {
                if (this.aJs.y >= 265)
                this.aJs.y--;
                
            }
            else 
            if (this.aPy.y >= 265)
                this.aPy.y--;
        });   
    }
}