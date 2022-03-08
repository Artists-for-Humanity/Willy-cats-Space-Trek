import Phaser from 'phaser';
import Player from '../Sprites/Player';
import alien1 from '../Sprites/alien1';
export default class TutorialScene extends Phaser.Scene {
   player;

    constructor() {
        super ({
            key: 'TutorialScene'
        });
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
    }
    
    create(){
        this.l1bg = this.add.sprite((this.game.config.width / 2) , (this.game.config.height /2), 'L1' );
        this.player = new Player(this, 1000, 380);
        this.borders = this.physics.add.staticGroup();
        this.alien1 = new alien1(this, 300, 400);

        // this.border5 = this.physics.add.sprite(1250, 360, 'border').setSize(72,640)
        // this.border5.visible = false;
        // this.physics.add.overlap(this.player, this.border5, this.playerXRborder)
        
        

    }

    
    update(){
        this.player.update();
        this.alien1.update();
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

}
