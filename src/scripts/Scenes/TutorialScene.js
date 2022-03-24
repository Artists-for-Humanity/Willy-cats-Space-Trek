import Phaser from 'phaser';
import { colors } from '../constants';
import Player from '../Sprites/Player';
import alien1 from '../Sprites/alien1';

export default class TutorialScene extends Phaser.Scene {
    player;
    scoreText;
    numEnemy = 6;
    deadThings = 0
    projectileState = 'ready';
    projectileImg;
    enemies = [];

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
        this.iFramesTime = 0;
    }
    
    preload(){
        this.load.image('L1', new URL('../../assets/LevelOne.png', import.meta.url).href);
        this.load.image('border', new URL ('../../assets/Hborder.png', import.meta.url).href);
        //aliens
        this.load.image('alien1', new URL('../../assets/alien1.png',import.meta.url).href);
        //bullets
        this.load.image('projectile', new URL('../../assets/projectile.png', import.meta.url).href);
    }
    
    create(time, delta){
        this.l1bg = this.add.sprite((this.game.config.width / 2) , (this.game.config.height /2), 'L1' );
        this.borders = this.physics.add.staticGroup();

        this.player = new Player(this, 1000, 380);
        this.SpawnEnemy();
        this.projectileImg = this.physics.add.sprite(-920, -780, 'projectile');
        this.projectileImg.visible = false;


        this.scoreText = this.add.text(16, 12, '', {
            fontFamily: 'Space Mono',
            fontSize: '24px',
            fontStyle: 'bold',
            fill: colors.black,
            align: 'center',
          });
        
        this.globalState.resetScore();
        this.setScoreText();

        this.projectileImg = this.physics.add.sprite(-920, -780, 'projectile');
        this.projectileImg.visible = false;
        
        // bullet enemy collision
        this.physics.add.overlap(this.projectileImg, this.enemies, (a, b) => {
            b.destroyAliens();
            this.resetProjectile();
            this.globalState.incrementScore();
            this.setScoreText();
            this.deadThings += 1;
            // console.log(this.score);
        });


    }

    update(time, delta){ 
        this.iFramesTime += delta;
        this.timer();
        
        this.player.update();
        // console.log(this.enemies, 'enemies')
        this.enemies.map((enemy) => {
            enemy.update();
        });

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
        if (this.player.pHealth === 0){
            this.gameOver()
        }
    }

    setScoreText() {
        this.scoreText.setText(`SCORE: ${this.globalState.score}`);
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
        this.physics.add.overlap(this.player, this.enemies, () => {
            if (this.iFrames === false){
                console.log(this.player.pHealth)
                this.player.pHealth -= 1;
                this.iFrames = true;
            }
            if(this.iFrames === true){
                // console.log('REACHME 00')
                while (this.iFramesTime > 1000){
                    this.iFramesTime -= 2000;
                    this.iFrames = false;
                    // console.log(this.iFramesTime, this.iFrames);
                }
            }
        });

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

    // weapon mechanics
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

    gameOver(){
    this.pHealth = 9;
    this.scene.start ('Gameover');     
    }
        
    
    projectileEnemyHit() {
        b.destroyAliens();
        this.resetProjectile();
        this.globalState.incrementScore();
        this.setScoreText();
        this.deadThings += 1;
    }
}
