import Phaser from 'phaser';
import {
    colors
} from '../constants';

import Player from '../Sprites/Player';
import alien from '../Sprites/alien';
import HealthDisplay from '../Sprites/HealthDisplay';
export default class TutorialScene extends Phaser.Scene {
    player;
    scoreText;
    healthText;


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
        this.l1bg = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2 + 25, 'L1');
        this.borders = this.physics.add.staticGroup();

        this.player = new Player(this, 1000, 380);
        this.SpawnEnemy();
        this.projectileImg = this.physics.add.sprite(-920, -780, 'projectile');
        this.projectileImg.visible = false;
        //HEALTH YARN
        console.log(this);
        this.globalState.initializeHealth(this.scene.getIndex(this.key));

        this.scoreText = this.add.text(16, 12, '', {
            fontFamily: 'Space Mono',
            fontSize: '24px',
            fontStyle: 'bold',
            fill: colors.black,
            align: 'center',
        });

        this.healthText = this.add.text(160, 12, '', {
            fontFamily: 'Space Mono',
            fontSize: '24px',
            fontStyle: 'bold',
            fill: colors.black,
            align: 'center',
        });
        this.globalState.resetHealth();
        this.setHealthText();

        this.globalState.resetScore();
        this.setScoreText();

        this.projectileImg = this.physics.add.sprite(-920, -780, 'projectile');
        this.projectileImg.visible = false;
    }

    update(time, delta) {
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
            this.enemies = [];
            this.deadThings = 0;
            console.log(this.globalState.fish, 'fish')
            this.resetGame();
            this.scene.start('LevelClear');
        }
        if (this.globalState.health === 0) {
            this.resetGame();
            this.scene.start('GameOver');
        }
    }

    setScoreText() {
        this.scoreText.setText(`SCORE: ${this.globalState.score}`);
    }

    setHealthText() {
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
                this.animateHealth();
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

    animateHealth() {
        if (this.globalState.health === 8) this.globalState.healthslots[0].anims.play('-1', true);
        if (this.globalState.health === 7) this.globalState.healthslots[0].anims.play('-2', true);
        if (this.globalState.health <= 6) this.globalState.healthslots[0].anims.play('empty', true);
        if (this.globalState.health === 5) this.globalState.healthslots[1].anims.play('-1', true);
        if (this.globalState.health === 4) this.globalState.healthslots[1].anims.play('-2', true);
        if (this.globalState.health <= 3) this.globalState.healthslots[1].anims.play('empty', true);
        if (this.globalState.health === 2) this.globalState.healthslots[2].anims.play('-1', true);
        if (this.globalState.health === 1) this.globalState.healthslots[2].anims.play('-2', true);
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
        this.globalState.resetHealth();
        this.globalState.clearHealth();
    }

    projectileEnemyHit() {
        b.destroyAliens();
        this.resetProjectile();
        this.globalState.incrementScore();
        this.setScoreText();
        this.deadThings += 1;
    }
}