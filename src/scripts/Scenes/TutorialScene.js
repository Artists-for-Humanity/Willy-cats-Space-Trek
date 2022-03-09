import Phaser from 'phaser';
import Player from '../Sprites/Player';
import alien1 from '../Sprites/alien1';

export default class TutorialScene extends Phaser.Scene {
   player;

    constructor() {
        super ({
            key: 'TutorialScene'
        });
        this.projectileImg;
        this.projectileState = 'ready';  
    // enemies;
    // let enemies;
    //variable for toggleMove = off
    
    //variable for toggleShoot = off
    //this.toggleShoot = false;
    }

    
    
    preload(){
        this.load.image('willy', new URL('../../assets/PlayerHolder.png', import.meta.url).href);    
        // console.log('REACHME 00')
        this.load.image('L1', new URL('../../assets/LevelOne.png', import.meta.url).href);
        this.load.image('border', new URL ('../../assets/Hborder.png', import.meta.url).href);
        //enemy files enemy//
        this.load.image('alien1', new URL('../../assets/alien1.png',import.meta.url).href);
        this.load.image('projectile', new URL('../../assets/projectile.png', import.meta.url).href);
    }
    
    create(){
        this.l1bg = this.add.sprite((this.game.config.width / 2) , (this.game.config.height /2), 'L1' );
        this.player = new Player(this, 1000, 380);
        this.borders = this.physics.add.staticGroup();
        this.alien1 = new alien1(this, 300, 400);
        this.projectileImg = this.physics.add.sprite(-920, -780, 'projectile');
        this.projectileImg.visible = false
        
        // this.physics.add.collider(this.projectileImg, this.alien1, this.onProjectileHitalien1);
        this.physics.add.collider(this.projectileImg, this.alien1, () => {
            console.log('hello', this.alien1);
            // this.alien1.getChildren().map(child => child.destroy())
            this.alien1.destroyAliens();
            // alien1.disableBody(true, true);
            // projectileImg.body.enable = false;
            this.resetProjectile();
            this.score += 1;
            // this.scoreText.setText(`Score: ${this.score}`);
        });

    }

    
    update(){ 
        this.player.update();
        this.alien1.update();
        this.input.on('pointerdown', pointer =>{
            if (this.projectileState == 'ready') {
                this.fireProjectile();
            }
            if (this.projectileImg.y <= 25 || this.projectileImg.y >= 695 || this.projectileImg.x <= 25 || this.projectileImg.x >= 1255 ) {
                this.resetProjectile();
            }
          })
    }

    playerXH1border(player){
        player.y = 90;
        }
    playerXH2border(player){
        player.y = 650;
    }

    playerXLborder(player){
        player.x = 100;
    }
    playerXRborder(player){
        player.x = 1180;
    }
    makeInvisible(){
        for (let i = 1; i < this.borders.children.entries.length; i++) {
            this.borders.children.entreis[i].setVisible(false);
        }

    }
    fireProjectile() {
        this.projectileState = 'fire';
        this.projectileImg.visible = true;
        this.projectileImg.body.enable = true;
        this.projectileImg.x = this.player.x;
        this.projectileImg.y = this.player.y;
        this.physics.moveTo(this.projectileImg, this.game.input.mousePointer.x,
            this.game.input.mousePointer.y, 800);
    }
    // onProjectileHitalien1() {
    //     console.log('hello', this.alien1);
    //     this.alien1.destroy();
    //     // alien1.disableBody(true, true);
    //     // projectileImg.body.enable = false;
    //     this.resetProjectile();
    //     this.score += 1;
    //     // this.scoreText.setText(`Score: ${this.score}`);
    // }
    resetProjectile() {
        if (this.projectileState === 'ready') {
            return;
        }
        this.projectileState = 'ready';
        this.projectileImg.setVelocityY(0);
        this.projectileImg.visible = false;
    }

}
