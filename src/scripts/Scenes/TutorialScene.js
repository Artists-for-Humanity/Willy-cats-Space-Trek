import Phaser from 'phaser';
import { colors } from '../constants';

import Player from '../Sprites/Player';
import alien from '../Sprites/alien';
export default class TutorialScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TutorialScene',
    });
  }

  preload() {
    this.load.image('L1', new URL('../../assets/LevelOne.png', import.meta.url).href);
    this.load.image('border', new URL('../../assets/Hborder.png', import.meta.url).href);
    //bullets
    this.load.image('projectile', new URL('../../assets/projectile.png', import.meta.url).href);

    //powerup
    this.load.image(
      'bomb',
      new URL(
        '../../assets/Bomb_Icon.png',

        import.meta.url
      ).href
    );

    this.load.image('speed', new URL('../../assets/Boots.png', import.meta.url).href);

    this.load.image('eff', new URL('../../assets/Shield_Icon.png', import.meta.url).href);

    this.load.image('bleed', new URL('../../assets/Bleed.png', import.meta.url).href);

    this.load.image('heals', new URL('../../assets/Bandage.png', import.meta.url).href);
  }

  create() {
    //SPAWNING STUFF
    this.gS.addUIBorder(this.scene.getIndex(this.key));
    this.l1bg = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2 + 25, 'L1');
    this.borders = this.physics.add.staticGroup();
    this.player = new Player(this, 1000, 380, true, true);
    this.SpawnEnemy();

    //HEALTH & UI
    this.gS.clearHealth();
    this.gS.initializeHealth(this.scene.getIndex(this.key));
    this.healthText = this.add.text(450, 12, '');
    this.scoreText = this.add.text(300, 12, '');
    this.setHealthText();
    this.gS.resetScore();
    this.setScoreText();
    this.currencyText = this.add.text(750, 12, '');
    this.setFishText();
    this.projectileImg = this.physics.add.sprite(-920, -780, 'projectile');
    this.projectileImg.visible = false;

    this.gS.setAvailablePowerUps(1);
    this.gS.forcefield = false;
    this.gS.forcefieldHealth = 2;

    this.physics.add.collider(this.gS.enemies, this.gS.enemies, () => {});
  }

  update(time, delta) {
    this.gS.animateHealth();
    if (this.gS.projState === 'fire') {
      if (this.player.space.isDown && this.player.tp) {
        this.player.copyPosition(this.projectileImg);
        this.resetProjectile();
      }
    }

    //follow mouse when down
    if (this.game.input.mousePointer.isDown) {
      this.physics.moveTo(
        this.projectileImg,
        this.game.input.mousePointer.x,
        this.game.input.mousePointer.y,
        500
      );
    }

    //bomb powerup
    if (this.bomb) {
      this.physics.add.overlap(this.player, this.bomb, () => {
        this.gS.ammo = 2;
        this.bomb.destroy();
      });
    }
    if (this.gS.ammo > 0) {
      this.gS.setBombValue();
      this.projectileImg.setScale(2);
    } else this.projectileImg.setScale(1);

    //speed powerup
    if (this.speed) {
      this.physics.add.overlap(this.player, this.speed, () => {
        this.speed.destroy();
        this.player.playerSpeed += this.gS.speedIter;
      });
    }

    //bleed power up
    if (this.bleed) {
      this.physics.add.overlap(this.player, this.bleed, () => {
        this.bleed.destroy();
        this.gS.bleedToggle = true;
      });
    }

    //forcefield
    if (this.eff) {
      this.physics.add.overlap(this.player, this.eff, () => {
        this.eff.destroy();
        this.gS.forcefield = true;
        this.gS.forcefieldHealth = this.gS.FFHvalue;
      });
    }

    //bandage
    if (this.heals) {
      this.physics.overlap(this.player, this.heals, () => {
        this.heals.destroy();
        this.gS.health++;
      });
    }

    this.gS.iFramestime += delta;
    this.enemyCollision();
    this.enemyBulletCollision();
    this.player.update();
    this.gS.enemies.map((enemy) => {
      enemy.update();
    });

    //heals power up
    if (this.heals) {
      this.physics.add.overlap(this.player, this.heals, () => {
        this.heals.destroy();
        this.gS.heal();
      });
    }
    this.input.on('pointerdown', (pointer) => {
      if (this.gS.projState == 'ready') {
        this.fireProjectile();
      }
      if (
        this.projectileImg.y <= 25 ||
        this.projectileImg.y >= 695 ||
        this.projectileImg.x <= 25 ||
        this.projectileImg.x >= 1255
      ) {
        this.resetProjectile();
      }
    });

    if (this.gS.deadThings === this.gS.numEnemy) {
      this.gS.resetGame();
      this.player.playerSpeed = 5;

      this.scene.start('LevelClear');
    }
    if (this.gS.health === 0) {
      this.gS.resetGame();
      this.player.playerSpeed = 5;
      this.gS.resetHealth();
      this.scene.start('GameOver');
    }
  }

  setScoreText() {
    this.scoreText.setStyle({
      fontSize: '25px',
      fill: colors.black,
      align: 'center',
    });
    this.scoreText.setText(`SCORE: ${this.gS.score}`);
  }

  setHealthText() {
    this.healthText.setStyle({
      fontSize: '25px',
      fill: colors.black,
      align: 'center',
    });
    this.healthText.setText(`HEALTH: ${this.gS.health}`);
  }

  getRandomPosition() {
    const position = {
      x: Math.floor(Phaser.Math.Between(100, 860)),
      y: Math.floor(Phaser.Math.Between(100, 720)),
    };
    return position;
  }

  setFishText() {
    this.currencyText.setStyle({
      fontSize: '25px',
      fill: colors.black,
      align: 'center',
    });
    this.currencyText.setText(`Fish: ${this.gS.fish}`);
  }

  SpawnEnemy() {
    const enemyPosition = [];
    for (let i = 0; i < this.gS.numEnemy; i++) {
      const position = this.getRandomPosition();

      enemyPosition.push({
        x: position.x,
        y: position.y,
      });
    }
    for (let i = 0; i < this.gS.numEnemy; i++) {
      const enemy = new alien(this, enemyPosition[i].x, enemyPosition[i].y);
      this.gS.enemies.push(enemy);
    }
  }

  enemyBulletCollision() {
    this.physics.add.overlap(this.projectileImg, this.gS.enemies, (a, b) => {
      b.alienHP -= this.gS.playerDmg;

      if (this.gS.bleedToggle === true) {
        const bleedchance = this.gS.getRandomInt(1);
        if (bleedchance === 0) {
          this.gS.bleedRNG += 1;
          b.alienHP -= this.gS.bleedDMG;
        }
      }
      if (b.alienHP <= 0) {
        b.destroyAliens();
        this.gS.deadThings += 1;
        console.log('deadThings = ' + this.gS.deadThings);

        this.gS.incrementScore();
        this.gS.morefish();

        if (this.gS.availablePowerUps > 0) {
          let randVal = this.gS.getRandomInt(2);
          if (randVal === 0) {
            this.dropPowerUp(Math.floor(b.x), Math.floor(b.y));
            this.gS.availablePowerUps--;
          }
        }
      }
      if (this.gS.bombHP > 0) {
        this.gS.bombHP -= 1;
      }
      if (this.gS.bombHP === 0) {
        this.resetProjectile();
      }
      if (this.gS.ammo > 0 && this.gS.bombHP === 0) {
        this.gS.ammo--;
      }
      this.setScoreText();
      this.setFishText();
    });
  }

  enemyCollision(time, delta) {
    this.physics.add.overlap(this.player, this.gS.enemies, (a, b) => {
      if (this.gS.forcefield && this.gS.forcefieldHealth > 0) {
        b.destroyAliens();
        this.gS.forcefieldHealth--;
        this.gS.deadThings += 1;
        this.gS.incrementScore();
        this.setScoreText();
        this.gS.fish++;
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

  fireProjectile() {
    this.gS.projState = 'fire';
    this.projectileImg.visible = true;
    this.projectileImg.body.enable = true;
    this.projectileImg.x = this.player.x;
    this.projectileImg.y = this.player.y;
    this.physics.moveTo(
      this.projectileImg,
      this.game.input.mousePointer.x,
      this.game.input.mousePointer.y,
      500
    );
  }

  resetProjectile() {
    if (this.gS.projState === 'ready') {
      return;
    }
    this.gS.projState = 'ready';
    this.projectileImg.setVelocityY(0);
    this.projectileImg.visible = false;
    this.projectileImg.disableBody(true, true);
  }

  dropPowerUp(x, y) {
    const randVal = this.gS.getRandomInt(0);
    if (randVal === 1) {
      //bomb
      this.bomb = this.physics.add.image(x, y, 'bomb');
      this.gS.availablePowerUps--;
    }
    if (randVal === 1) {
      //bleed
      this.bleed = this.physics.add.image(x, y, 'bleed');
    }
    if (randVal === 2) {
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
    if (this.gS.iFrames === false) {
      this.gS.decreaseHealth();
      this.setHealthText();
      this.gS.iFrames = true;
      this.gS.iFramestime = 0;
    }
    if (this.gS.iFrames === true && this.gS.iFramestime > 1000) {
      this.gS.iFramestime -= 1000;
      this.gS.iFrames = false;
    }
    return;
  }
}
