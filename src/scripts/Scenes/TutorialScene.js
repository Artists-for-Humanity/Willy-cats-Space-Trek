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
    enemies;
    let enemies;
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

        // this.border5 = this.physics.add.sprite(1250, 360, 'border').setSize(72,640)
        // this.border5.visible = false;
        // this.physics.add.overlap(this.player, this.border5, this.playerXRborder)
        
        this.physics.add.overlap(this.projectileImg, this.enemies, this.onProjectileHitalien1(), null, this);

    }

    
    update(){ 
        this.player.update();
        this.alien1.update();
        this.input.on('pointerdown', pointer =>{
            if (this.projectileState == 'ready') {
                this.fireProjectile();
            }
            if (this.projectileImg.y <= -16) {
                this.resetProjectile();
            }
            
        
       
          })
    }
    //SpawnEnemy(x, y){

      //  enemies--;
    //}
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
        // this.projectileImg.setVelocityY(-600);
        this.physics.moveTo(this.projectileImg, this.game.input.mousePointer.x,
            this.game.input.mousePointer.y, 500);
    }
    onProjectileHitalien1() {
        console.log('hello')
        // alien1.disableBody(true, true);
        // projectileImg.body.enable = false;
        this.resetProjectile();
        this.score += 1;
        // this.scoreText.setText(`Score: ${this.score}`);
    }
    resetProjectile() {
        if (this.projectileState === 'ready') {
            return;
        }
        this.projectileState = 'ready';
        this.projectileImg.setVelocityY(0);
        this.projectileImg.visible = false;
    }

}
