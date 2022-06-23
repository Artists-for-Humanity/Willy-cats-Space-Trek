import Phaser from 'phaser';
import { colors } from '../constants';
import Alien from '../Sprites/Alien';
import Player from '../Sprites/Player';

export default class WillyScene extends Phaser.Scene {
  constructor(props) {
    super(props);
  }

  preloadImages() {
    this.load.image(
      'level-1-background',
      new URL('../../assets/LevelOne.png', import.meta.url).href
    );
    this.load.image('border', new URL('../../assets/Hborder.png', import.meta.url).href);
    this.load.image('projectile', new URL('../../assets/projectile.png', import.meta.url).href);
    this.load.image('bomb', new URL('../../assets/Bomb_Icon.png', import.meta.url).href);
    this.load.image('speed', new URL('../../assets/Boots.png', import.meta.url).href);
    this.load.image('eff', new URL('../../assets/Shield_Icon.png', import.meta.url).href);
    this.load.image('bleed', new URL('../../assets/Bleed.png', import.meta.url).href);
    this.load.image('heals', new URL('../../assets/Bandage.png', import.meta.url).href);
  }

  spawn() {
    this.gS.addUIBorder(this.scene.getIndex(this.key));
    this.add.sprite(
      this.game.config.width / 2,
      this.game.config.height / 2 + 25,
      'level-1-background'
    );
    this.borders = this.physics.add.staticGroup();
    this.player = new Player(this, 1000, 380, true, true);
    this.spawnEnemy();
    this.projectileImg = this.physics.add.sprite(-920, -780, 'projectile');
    this.projectileImg.visible = false;
  }

  drawUI() {
    this.gS.clearHealth();
    this.gS.initializeHealth(this.scene.getIndex(this.key));
    this.gS.resetScore();
    this.healthText = this.add.text(450, 12, '');
    this.scoreText = this.add.text(300, 12, '');
    this.setHealthText();
    this.setScoreText();
    this.currencyText = this.add.text(750, 12, '');
    this.setFishText();
  }

  setPowerups() {
    this.gS.setAvailablePowerUps(1);
    this.forcefield = false;
    this.forcefieldHealth = 2;
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

  update(time, delta) {
    this.gS.animateHealth();
    this.gS.iFramestime += delta;
    this.enemyCollision();
    this.enemyBulletCollision();
    this.player.update();
    this.gS.enemies.map((enemy) => {
      enemy.update();
    });

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

      if (this.gS.projState == 'ready') {
        this.fireProjectile();
      }

      const spacing = 25;
      if (
        this.projectileImg.y <= spacing ||
        this.projectileImg.y >= this.scene.scene.game.config.height - 75 ||
        this.projectileImg.x <= spacing ||
        this.projectileImg.x >= this.scene.scene.game.config.width - spacing
      ) {
        this.resetProjectile();
      }
    }

    if (this.gS.ammo > 0) {
      this.gS.setBombValue();
      this.projectileImg.setScale(2);
    } else {
      this.projectileImg.setScale(1);
    }

    //bomb powerup
    if (this.bomb) {
      this.physics.add.overlap(this.player, this.bomb, () => {
        this.gS.ammo = 2;
        this.bomb.destroy();
      });
    }

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

    //heals power up
    if (this.heals) {
      this.physics.add.overlap(this.player, this.heals, () => {
        this.heals.destroy();
        this.gS.heal();
      });
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

  spawnEnemy() {
    const enemyPosition = [];
    for (let i = 0; i < this.gS.numEnemy; i++) {
      const position = this.getRandomPosition();

      enemyPosition.push({
        x: position.x,
        y: position.y,
      });
    }
    for (let i = 0; i < this.gS.numEnemy; i++) {
      const enemy = new Alien(this, enemyPosition[i].x, enemyPosition[i].y);
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

  enemyCollision() {
    this.physics.add.overlap(this.player, this.gS.enemies, (a, b) => {
      if (this.gS.forcefield && this.gS.forcefieldHealth > 0) {
        b.destroyAliens();
        this.gS.forcefieldHealth--;
        this.gS.deadThings += 1;
        this.gS.incrementScore();
        this.setScoreText();
        this.gS.fish++;
      } else {
        this.iFramesTimer();
      }
    });
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
    if (randVal === 0) {
      //speed
      this.speed = this.physics.add.image(x, y, 'speed');
    }
    if (randVal === 2) {
      //evil force field
      this.eff = this.physics.add.image(x, y, 'eff');
    }
    if (randVal === 4) {
      //bandage (heal)
      this.heals = this.physics.add.image(x, y, 'heals');
    }
  }
}
