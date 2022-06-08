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
        this.iFramestime = 0;
        this.bleedCD = 0;
        this.scale = 1;
        this.player;
        this.scoreText;
        this.healthText;
        this.bomb;
        this.speed;
        this.heals;
        this.eff;
        this.bleedcount = 0;
        this.bleed;
        this.ammo = 0;
        this.bleedToggle = false;
        this.forcefield = false;



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
        this.healthText = this.add.text(160, 12, '')
        this.scoreText = this.add.text(16, 12, '')
        this.setHealthText();
        this.globalState.resetScore();
        this.setScoreText();

        this.projectileImg = this.physics.add.sprite(-920, -780, 'projectile');
        this.projectileImg.visible = false;

        this.globalState.setAvailablePowerUps(1);
        this.forcefield = false;
        this.forcefieldHealth = 2;
    }

    update(time, delta) {

        this.globalState.animateHealth();
        if (this.player.q.isDown) {
            setTimeout(this.qPressed(), Phaser.Timer.SECOND * 3);
        }

        //spacebar tp
        if (this.projectileState === "fire") {
            if (this.player.space.isDown && this.player.tp) {
                this.player.copyPosition(this.projectileImg);
                this.resetProjectile();
            }
        }

        if (this.game.input.mousePointer.isDown) {
            this.physics.moveTo(this.projectileImg, this.game.input.mousePointer.x,
                this.game.input.mousePointer.y, 500);
        }

        //bomb powerup
        if (this.bomb) {
            this.physics.add.overlap(this.player, this.bomb, () => {
                this.ammo = 2;
                this.globalState.bombHP = 2;
                this.bomb.destroy();
            });
        }
        if (this.ammo > 0) {
            this.projectileImg.setScale(2);
        } else this.projectileImg.setScale(1);

        //speed powerup
        if (this.speed) {
            this.physics.add.overlap(this.player, this.speed, () => {
                this.speed.destroy();
                this.player.playerSpeed += this.globalState.speedIter;
            })
        }

        //bleed power up
        if (this.bleed) {
            this.physics.add.overlap(this.player, this.bleed, () => {
                this.bleed.destroy();
                this.bleedToggle = true;
            });
        }

        //eff functiion
        if (this.eff) {
            this.physics.add.overlap(this.player, this.eff, () => {
                this.eff.destroy();
                this.forcefield = true;
            })
        }

        this.iFramestime += delta;
        this.enemyCollision();
        this.enemyBulletCollision();
        this.player.update();
        this.enemies.map((enemy) => {
            enemy.update();
        });

        //heals power up
        if (this.heals) {
            this.physics.add.overlap(this.player, this.heals, () => {
                this.heals.destroy();
                this.globalState.heal();
            })
        }
        this.input.on('pointerdown', pointer => {
            if (this.projectileState == 'ready') {
                this.fireProjectile();
            }
            if (this.projectileImg.y <= 25 || this.projectileImg.y >= 695 || this.projectileImg.x <= 25 || this.projectileImg.x >= 1255) {
                this.resetProjectile();
            }
        });

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
            // fontFamily: '',
            fontSize: '25px',
            // fontStyle: 'bold',
            fill: colors.black,
            align: 'center',
        });
        this.scoreText.setText(`SCORE: ${this.globalState.score}`);
    }

    setHealthText() {
        this.healthText.setStyle({
            // fontFamily: '',
            fontSize: '25px',
            // fontStyle: 'bold',
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
            b.alienHP -= this.globalState.bulletDMG;
            this.globalState.bombHP -= 1;
            if (this.bleedToggle === true) {
                const bleedchance = this.globalState.getRandomInt(this.bleedcount)
                console.log(bleedchance, 'bleedchance');
                if (bleedchance === 0) {
                    b.alienHP -= this.globalState.bleedDmg;
                    this.bleedcount++;
                    console.log('bleed');
                }
            }
            if (b.alienHP <= 0) {
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
            if (this.globalState.bombHP <= 0) {
                this.resetProjectile();
                this.globalState.bombHP = 2;
            }
            if (this.ammo < 1) {
                this.resetProjectile();
            }
            this.setScoreText();
            this.globalState.morefish();
        });
    }

    enemyCollision(time, delta) {
        this.physics.add.overlap(this.player, this.enemies, (a, b) => {
            if (this.forcefield && this.globalState.forcefieldHealth > 0) {
                b.destroyAliens();
                this.globalState.forcefieldHealth--;
                this.deadThings += 1;
                this.globalState.incrementScore();
                this.setScoreText();
            } else this.iFramesTimer();
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
        this.ammo--;
    }
    resetGame() {
        this.enemies = [];
        this.numEnemy = 6;
        this.deadThings = 0;
        this.player.playerSpeed = 5;
        this.globalState.clearHealth();
        this.bleedToggle = false;
        this.bleedcount = 0;
    }
    dropPowerUp(x, y) {
        console.log(x, y, 'drop');
        const randVal = this.globalState.getRandomInt(0);
        if (randVal === 1) {
            //bomb
            this.bomb = this.physics.add.image(x, y, 'bomb');
            this.globalState.availablePowerUps--;
            this.globalState.ammo = 2;
        }
        if (randVal === 2) {
            //bleed
            this.bleed = this.physics.add.image(x, y, 'bleed');
        }
        if (randVal === 3) {
            //speed
            this.speed = this.physics.add.image(x, y, 'speed');

        }
        if (randVal === 0) {
            //evil force field
            this.eff = this.physics.add.image(x, y, 'eff');

        }
        if (randVal === 4) {
            //bandage (heal)
            this.heals = this.physics.add.image(x, y, 'heals');

        }
    }
    iFramesTimer() {
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
}