import Phaser from 'phaser';
export default class JustDownTest extends Phaser.Scene {
  constructor() {
    super({
      key: 'JustDownTest',
    });
    this.xup = 0;
  }
  preload() {}

  create() {
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.xup++;
      console.log('up');
    }
  }
}
