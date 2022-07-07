import Phaser from 'phaser';

export default class WillyScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'WillyScene',
    });
  }
  spacebar;
  preload() {
    this.load.image('henry', new URL('../../assets/person.png', import.meta.url).href);
    this.load.image('lazer', new URL('../../assets/lazerbeam.png', import.meta.url).href);
  }

  create() {
    this.superman = this.physics.add.image(430, 430, 'henry').setScale(0.2).setDepth(1000);

    this.Lazer = new Phaser.Class({
      Extends: Phaser.GameObjects.Image,

      initialize: function Lazer(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'lazer');

        this.speed = Phaser.Math.GetSpeed(600, 1);
      },

      fire: function (x, y) {
        this.setPosition(x, y);

        this.setActive(true);
        this.setVisible(true);
      },

      update: function (time, delta) {
        this.x += this.speed * delta;

        if (this.x > 820) {
          this.setActive(false);
          this.setVisible(false);
        }
      },
    });
    this.Lazer = this.add.group({
      classType: Lazer,
      maxSize: 30,
      runChildUpdate: true,
    });
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.Lazer = Lazer.get();

      if (Lazer) {
        Lazer.fire(superman.x, superman.y);
      }
    }
  }
}
