import Phaser from 'phaser';
import {
    colors
} from '../constants';

import Player from '../Sprites/Player';
import alien from '../Sprites/alien';
export default class EndlessScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'EndlessScene'
        });
        this.player;
        this.wave = 1;;

        this.projectileImg;
        this.projectileState = 'ready';
        this.deadThings = 0
        this.enemies = [];
        this.enemySpawnPosition = [];
        this.numEnemy = 6;
        this.score = 0;
        this.scoreText;
        this.healthText;
        this.waveText;
        this.scale = 1;

        this.iFrames = false;
        this.iFramestime = 0;
        
        this.bleedCD = 0; 
        this.bomb;
        this.speed;
        this.heals;
        this.eff;
        this.bleed;
        this.ammo = 0;
        this.bleedToggle = false; 
        this.forcefield = false;
        this.forcefieldHealth;
    }

    preload() {
        this.load.image('L1', new URL('../../assets/LevelOne.png',
            import.meta.url).href);
        this.load.image('border', new URL('../../assets/Hborder.png',
            import.meta.url).href);

        //bullets
        this.load.image('projectile', new URL('../../assets/projectile.png',
            import.meta.url).href);

        //powerup
        this.load.image('bomb', new URL('../../assets/Bomb_Icon.png',
            import.meta.url).href);

        this.load.image('speed', new URL('../../assets/Boots.png',
            import.meta.url).href);

        this.load.image('eff', new URL('../../assets/Shield_Icon.png',
            import.meta.url).href);

        this.load.image('bleed', new URL('../../assets/Bleed.png',
            import.meta.url).href);

        this.load.image('heals', new URL('../../assets/Bandage.png',
            import.meta.url).href);
    }


    create() {
        //INITIALIZING GAME RULES AND SPAWNING STUFF
        this.globalState.addUIBorder(this.scene.getIndex(this.key));
        this.l1bg = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2 + 25, 'L1');
        this.borders = this.physics.add.staticGroup();
        this.player = new Player(this, 1000, 380, true, true);
        this.SpawnEnemy();

        //HEALTH & UI
        this.globalState.clearHealth();
        this.globalState.initializeHealth(this.scene.getIndex(this.key));
        this.globalState.resetScore();
        this.healthText = this.add.text(180, 12, '') 
        this.setHealthText();
        this.scoreText = this.add.text(16, 12, '')
        this.setScoreText();
        this.waveText = this.add.text(354, 12, '');
        this.setWaveText();

        this.projectileImg = this.physics.add.sprite(-920, -780, 'projectile');
        this.projectileImg.visible = false;

        this.globalState.setAvailablePowerUps(1);
        this.forcefield = false;
        this.forcefieldHealth = 2;
    }

    update(time, delta) {
        this.globalState.animateHealth();

        this.player.update();
        this.enemies.map((enemy) => {
            enemy.update();
        });

        //spacebar tp
        if (this.projectileState === "fire") {
            if (this.player.space.isDown && this.player.tp) {
                this.player.copyPosition(this.projectileImg);
                this.resetProjectile();
            }
        }

        //follow mouse when down
        if (this.game.input.mousePointer.isDown) {
            this.physics.moveTo(this.projectileImg, this.game.input.mousePointer.x,
                 this.game.input.mousePointer.y, 500);
        }

        //fire
        this.input.on('pointerdown', pointer => {
            if (this.projectileState == 'ready') {
                this.fireProjectile();
            }
            if (this.projectileImg.y <= 25 || this.projectileImg.y >= 695 || this.projectileImg.x <= 25 || this.projectileImg.x >= 1255) {
                this.resetProjectile();
            }
        })

        this.enemyCollision();
        this.enemyBulletCollision();

        this.iFramestime += delta;

        if (this.deadThings === this.numEnemy) {
            while (this.enemies.length > 0) this.enemies.pop();
            while (this.enemySpawnPosition.length > 0) this.enemySpawnPosition.pop();
            this.wave++;
            this.globalState.endlessWave++;
            this.numEnemy = 5 + this.wave * 1;
            this.deadThings = 0;
            this.bleedToggle = false;
            this.player.playerSpeed = 5;
            setTimeout(this.SpawnEnemy(), 3000);
            this.setWaveText();
            this.globalState.setAvailablePowerUps(Math.floor(this.wave/5 + 1));
        }

        if (this.globalState.health === 0) {
            this.resetGame();
            this.globalState.resetHealth();
            this.scene.start('GameOver');
        }

        //bomb powerup
        if (this.bomb) {
            this.physics.add.overlap(this.player, this.bomb, () => {
                this.ammo = 2;
                this.bomb.destroy();
            });
        }
        if (this.ammo > 0) {
            this.projectileImg.setScale(2);
        } else this.projectileImg.setScale(1);

        //speed powerup
        if (this.speed){
            this.physics.add.overlap(this.player, this.speed, () => {
                this.speed.destroy(); 
                this.player.playerSpeed += 2;
            })
        }

        //bleed power up
        if(this.bleed){
            this.physics.add.overlap(this.player , this.bleed, ()=>{
                this.bleed.destroy();
                this.bleedToggle = true; 
            })
        }

        //shield
        if (this.eff){
            this.physics.add.overlap(this.player , this.eff, ()=>{
                this.eff.destroy();
                this.forcefield = true;
            })
        }
        if (this.forcefieldHealth === 0) this.forcefield = false;

        //bandage
        if (this.heals){
            this.physics.overlap(this.player, this.heals, ()=> {
                this.heals.destroy();
                this.globalState.health++;
            });
        }
    }

    setHealthText() {
        this.healthText.setStyle({
            fontFamily: 'Space Mono',
            fontSize: '24px',
            fontStyle: 'bold',
            fill: colors.black,
            align: 'center',
        });
        this.healthText.setText(`HEALTH: ${this.globalState.health}`)
    }

    setScoreText() {
        this.scoreText.setStyle({
            fontFamily: 'Space Mono',
            fontSize: '24px',
            fontStyle: 'bold',
            fill: colors.black,
            align: 'center',
        });
        this.scoreText.setText(`SCORE: ${this.globalState.score}`);
    }

    setWaveText() {
        this.waveText.setStyle({
            fontFamily: 'Space Mono',
            fontSize: '24px',
            fontStyle: 'bold',
            fill: colors.black,
            align: 'center',
        });
        this.waveText.setText(`WAVE: ${this.globalState.endlessWave}`);
    }

    SpawnEnemy() {
        for (var i = 0; i < this.numEnemy; i++) {
            const position = this.getRandomPosition();

            this.enemySpawnPosition.push({
                x: position.x,
                y: position.y,
            });
        }
        for (var i = 0; i < this.numEnemy; i++) {
            const enemy = new alien(this, this.enemySpawnPosition[i].x, this.enemySpawnPosition[i].y);
            this.enemies.push(enemy);
        }
    }

    getRandomPosition() {
            const position = {
                x: Math.floor(Phaser.Math.Between(100, 860)),
                y: Math.floor(Phaser.Math.Between(100, 720)),
            };
            return position;
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
        this.ammo--;
    }

    enemyBulletCollision() {
        this.physics.add.overlap(this.projectileImg, this.enemies, (a, b) => {
            b.alienHP -= 1;
            if (this.bleedToggle === true){
                const bleedchance = this.globalState.getRandomInt(1)
                if (bleedchance === 0){
                    let a = false;
                    if (a === false){
                        b.alienHP -= .5;
                        a = true;
                    }
                    if(a === true && this.bleedCD > 0 )
                        this.bleedCD -= 1000;
                        a = false; 
                }
            }
            if(b.alienHP <= 0 ){
                b.destroyAliens();
                this.deadThings += 1;
                this.globalState.incrementScore();
            
                if (this.globalState.availablePowerUps > 0) {

                    let randVal = this.globalState.getRandomInt(2);
                    if (randVal === 0) {

                    this.dropPowerUp(Math.floor(b.x), Math.floor(b.y));
                    this.globalState.availablePowerUps--;
                    }
                }
            }
            this.resetProjectile();         
            this.setScoreText();
            this.globalState.morefish();
        });
    }

    enemyCollision(time, delta) {
        this.physics.add.overlap(this.player, this.enemies, (a, b) => {
            if (this.forcefield && this.forcefieldHealth > 0) {
                b.destroyAliens();
                this.forcefieldHealth--;
                this.deadThings += 1;
                this.globalState.incrementScore();
                this.setScoreText();
            }
            else this.iFramesTimer();
        });

    }

    iFramesTimer(){
        if (this.iFrames === false) {
            this.globalState.decreaseHealth();
            this.setHealthText();
            this.iFrames = true;
            this.iFramestime = 0;
        }
        if (this.iFrames === true && this.iFramestime > 1000) {
            this.iFramestime -= 1000;
            this.iFrames = false;
        }
        return;
    }

    dropPowerUp(x, y) {
        const randVal = this.globalState.getRandomInt(5);
        if (randVal === 0){
            //bomb
            this.bomb = this.physics.add.image(x, y, 'bomb');
            this.globalState.availablePowerUps--;
            this.globalState.ammo = 2;
        }
        if (randVal === 1){
            //bleed
            this.bleed = this.physics.add.image(x , y, 'bleed');
            this.globalState.availablePowerUps--;
        }
        if (randVal === 2){
            //speed
            this.speed = this.physics.add.image(x, y, 'speed');
            this.globalState.availablePowerUps--;
        }
        if (randVal === 3){
            //evil force field
            this.eff = this.physics.add.image(x, y, 'eff');
            this.globalState.availablePowerUps--;
        }
        if (randVal === 4){
            //bandage (heal)
            this.heals = this.physics.add.image(x, y, 'heals');
            this.globalState.availablePowerUps--;
        }
    }

    resetGame() {
        this.enemies = [];
        this.numEnemy = 6;
        this.deadThings = 0;
        this.player.playerSpeed = 5;
        this.globalState.clearHealth();
        this.bleedToggle = false;
    }
}