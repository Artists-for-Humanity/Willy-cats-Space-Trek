import Phaser from 'phaser';
import Lazer from '../Sprites/Lazer';
export default class TestingScene extends Phaser.Scene {
  spacebar;
  Lazer;
  lasers;
  constructor() {
    super({
      key: 'TestingScene',
    });
  }

  preload() {
    this.load.image('henry', new URL('../../assets/person.png', import.meta.url).href);
    this.load.image('lazer', new URL('../../assets/lazerbeam.png', import.meta.url).href);
  }

  create() {
    this.superman = this.physics.add.image(430, 430, 'henry').setScale(0.2).setDepth(1000);

    this.lazers = this.add.group({
      classType: Lazer,
      maxSize: 30,
      runChildUpdate: true,
    });
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.lazer = this.lazers.get();

      if (this.Lazer) {
        this.Lazer.fire(this.superman.x, this.superman.y);
      }
    }
  }
}
