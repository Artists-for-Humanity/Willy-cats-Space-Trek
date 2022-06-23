import WillyScene from './WillyScene';

export default class TutorialScene extends WillyScene {
  constructor() {
    super({
      key: 'TutorialScene',
    });
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

    if (this.gS.deadThings === this.gS.numEnemy) {
      this.gS.resetGame();
      this.player.playerSpeed = 5;

      this.scene.start('LevelClear');
    }
  }
}
