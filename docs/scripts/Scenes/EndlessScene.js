import WillyScene from './WillyScene.js';

export default class EndlessScene extends WillyScene {
  constructor() {
    super({
      key: 'EndlessScene',
    });

    this.wave = 1;
    this.numEnemy = 6;
    this.deadThings = 0;
  }

  preload() {
    this.preloadImages();
  }

  create() {
    this.spawn();
    this.drawUI();
    this.setPowerups();
    this.physics.add.collider(this.gS.enemies, this.gS.enemies);
  }

  update(time, delta) {
    super.update(time, delta);

    if (this.deadThings === this.numEnemy) {
      while (this.enemies.length > 0) this.enemies.pop();
      while (this.enemySpawnPosition.length > 0) this.enemySpawnPosition.pop();
      this.wave++;
      this.gS.endlessWave++;
      this.numEnemy = 5 + this.wave;
      this.deadThings = 0;
      this.bleedToggle = false;
      this.player.playerSpeed = 5;
      setTimeout(this.spawnEnemy(), 3000);
      this.setWaveText();
      this.gS.setAvailablePowerUps(Math.floor(this.wave / 5 + 1));
    }
  }
}
