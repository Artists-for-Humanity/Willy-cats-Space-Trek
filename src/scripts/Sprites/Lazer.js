import Phaser from 'phaser';
import TestingScene from '../Scenes/TestingScene';
export default class Lazer extends Phaser.GameObjects.Image {
  constructor() {
    super(this, 0, 0, 'lazer');
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);
    this.speed = Phaser.Math.GetSpeed(600, 1);
  }
  preload() {
    this.load.image('lazer', new URL('../../assets/lazerbeam.png', import.meta.url).href);
  }

  update(time, delta) {
    this.x += this.speed * delta;
    if (this.x > 820) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  fire(x, y) {
    this.setPosition(x, y);

    this.setActive(true);
    this.setVisible(true);
  }
}
