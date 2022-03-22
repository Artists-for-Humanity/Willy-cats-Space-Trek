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
        this.deadThings = 0
        this.enemies = [];
        this.numEnemy = 6;
        this.score = 0;
        this.iFrames = false; 
        this.iFramesTime = 100;
        

    }
    
    preload(){
        this.load.image('willy', new URL('../../assets/PlayerHolder.png', import.meta.url).href);    
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
        this.SpawnEnemy();
        this.projectileImg = this.physics.add.sprite(-920, -780, 'projectile');
        this.projectileImg.visible = false;

        this.physics.add.overlap(this.projectileImg, this.enemies, (a, b) => {
            // console.log(a, b);
            b.destroyAliens();
            this.resetProjectile();
            this.score += 1;
            this.deadThings += 1;
            // console.log(this.score);
        });

        this.physics.add.overlap(this.player, this.enemies, () => {
            // console.log(this.iFrames)
            console.log(this.iFramesTime, 'iframestime')

            if (this.iFrames === false ){
                this.player.pHealth -= 1;
                this.iFrames = true; 
                this.timer();


            } 

        });

    }

    update(){ 
        this.player.update();
        // console.log(this.enemies, 'enemies')
        this.enemies.map((enemy) => {
            enemy.update();
        });
        // console.log(this.deadThings ,'deadthings')
        this.input.on('pointerdown', pointer =>{
            if (this.projectileState == 'ready') {
                this.fireProjectile();
            }
            if (this.projectileImg.y <= 25 || this.projectileImg.y >= 695 || this.projectileImg.x <= 25 || this.projectileImg.x >= 1255 ) {
                this.resetProjectile();
            }
          })
        if (this.deadThings === this.numEnemy){
            this.enemies = [];
            this.deadThings = 0;
            this.scene.start('LevelClear');
        }
        // if (this.iFrames === true){ 
        //     this.iFramesTime -= 1;
        
       

        // if (this.iFramesTime === 0){
        //     this.iFrames = false;
        //     this.iFramesTime = 100;
        //     console.log('hello')
            
        // }  
    }
    getRandomPosition(){
        const position = {
            x: Math.floor(Phaser.Math.Between(100, 860)),
            y: Math.floor(Phaser.Math.Between(100, 720)),
        };
        return position;
    }

    SpawnEnemy(){
        const enemyPosition = [];
        for (let i = 0; i < this.numEnemy; i ++){
            const position = this.getRandomPosition();
            
            enemyPosition.push({
                x: position.x,
                y: position.y,
            });
        }
        for (let i = 0; i < this.numEnemy; i++) {
            const enemy = new alien1 (this, enemyPosition[i].x, enemyPosition[i].y, 'alien1');
            this.enemies.push(enemy);
        }
    }
   
    timer(){
        while(this.iFramesTime != 0){
            this.iFramesTime -= 1;
            console.log(this.iFramesTime)
        }
        this.iframesTime = 100;
        this.iFrames = false;

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
        this.game.input.mousePointer.y, 500);
    }

    resetProjectile() {
        if (this.projectileState === 'ready') {
            return;
        }
        this.projectileState = 'ready';
        this.projectileImg.setVelocityY(0);
        this.projectileImg.visible = false;
        this.projectileImg.disableBody(true, true);

    }

 
        
    
}
