import Phaser from 'phaser';
import {
    colors
} from '../constants';

import Player from '../Sprites/Player';
import alien from '../Sprites/alien';
export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super({
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
        this.scale = 1;
        this.player;
        this.scoreText;
        this.healthText;
        this.powerUp = [];
    }

    preload() {
        this.load.image('L1', new URL('../../assets/LevelOne.png',
            import.meta.url).href);
        this.load.image('border', new URL('../../assets/Hborder.png',
            import.meta.url).href);
        //bullets
        this.load.image('projectile', new URL('../../assets/projectile.png',
            import.meta.url).href);
    }

    create() {
        this.globalState.addUIBorder(this.scene.getIndex(this.key));
        this.l1bg = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2 + 25, 'L1');
        this.borders = this.physics.add.staticGroup();

        this.player = new Player(this, 1000, 380);
        this.SpawnEnemy();
        this.projectileImg = this.physics.add.sprite(-920, -780, 'projectile');
        this.projectileImg.visible = false;
        //HEALTH YARN
        this.globalState.clearHealth();
        this.globalState.initializeHealth(this.scene.getIndex(this.key));
        
        this.healthText = this.add.text(160, 12, '')
        this.scoreText = this.add.text(16, 12, '')

        this.setHealthText();
        this.globalState.resetScore();
        this.setScoreText();

        this.projectileImg = this.physics.add.sprite(-920, -780, 'projectile');
        this.projectileImg.visible = false;
        
        this.globalState.setAvailablePowerUps(1);
    }

    update(time, delta) {
        this.globalState.animateHealth();
        this.iFramesTime += delta;
        this.timer();
        this.enemyBulletCollision();
        this.player.update();
        this.enemies.map((enemy) => {
            enemy.update();
        });

        this.input.on('pointerdown', pointer => {
            if (this.projectileState == 'ready') {
                this.fireProjectile();
            }
            if (this.projectileImg.y <= 25 || this.projectileImg.y >= 695 || this.projectileImg.x <= 25 || this.projectileImg.x >= 1255) {
                this.resetProjectile();
            }
        })

        if (this.deadThings === this.numEnemy) {
            console.log(this.globalState.fish, 'fish')
            this.resetGame();
            this.scene.start('LevelClear');
        }
        if (this.globalState.health === 0) {
            this.resetGame();
            this.globalState.resetHealth();
            this.scene.start('GameOver');
        }
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

    getRandomPosition() {
        const position = {
            x: Math.floor(Phaser.Math.Between(100, 860)),
            y: Math.floor(Phaser.Math.Between(100, 720)),
        };
        return position;
    }

    SpawnEnemy() {
        const enemyPosition = [];
        for (let i = 0; i < this.numEnemy; i++) {
            const position = this.getRandomPosition();

            enemyPosition.push({
                x: position.x,
                y: position.y,
            });
        }
        for (let i = 0; i < this.numEnemy; i++) {
            const enemy = new alien(this, enemyPosition[i].x, enemyPosition[i].y);
            this.enemies.push(enemy);
        }
    }

    enemyBulletCollision() {
        this.physics.add.overlap(this.projectileImg, this.enemies, (a, b) => {
            b.destroyAliens();
            if (this.globalState.availablePowerUps > 0) {
                let randVal = this.globalState.getRandomInt(10);
                if ( randVal === 0) {
                    console.log(randVal);
                    this.dropPowerUp(Math.floor(b.x), Math.floor(b.y));
                    this.globalState.availablePowerUps--;
                }
            }
            this.resetProjectile();
            this.globalState.incrementScore();
            this.setScoreText();
            this.deadThings += 1;
            this.globalState.morefish();
        });
    }

    timer() {
        this.physics.add.overlap(this.player, this.enemies, () => {
            if (this.iFrames === false) {
                this.globalState.decreaseHealth();
                this.setHealthText();
                this.iFrames = true;

                this.iFramesTime = 0;
            }
            if (this.iFrames === true && this.iFramesTime > 1000) {
                this.iFramesTime -= 1000;
                this.iFrames = false;
            }
        });

    }

    playerXH1border(player) {
        player.y = 90;
    }
    playerXH2border(player) {
        player.y = 650;
    }

    playerXLborder(player) {
        player.x = 100;
    }
    playerXRborder(player) {
        player.x = 1180;
    }
    makeInvisible() {
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

    resetGame() {
        this.enemies = [];
        this.numEnemy = 6;
        this.deadThings = 0;
        this.globalState.clearHealth();
    }

    dropPowerUp(x, y) {
        console.log(x, y);
    }
}