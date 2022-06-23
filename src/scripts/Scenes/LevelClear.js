import Phaser from 'phaser';
import GameRule from '../GameRule';

export default class LevelClear extends Phaser.Scene {
  constructor() {
    super({
      key: 'LevelClear',
    });
  }

  preload() {
    this.load.image(
      'LevelClearBG',
      new URL('../../assets/Level_Clear_Placeholder.png', import.meta.url).href
    );
    this.load.image('continue', new URL('../../assets/buttonContinue.png', import.meta.url).href);
  }
  create() {
    this.LCBG = this.add.sprite(
      this.game.config.width / 2,
      this.game.config.height / 2 + 25,
      'LevelClearBG'
    );
    const continueBtnX = this.game.config.width / 2;
    const continueBtny = this.game.config.height / 2 + 175;
    const continueBtn = this.add
      .image(continueBtnX, continueBtny, 'continue')
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.scene.start('BunkerScene');
      });
  }
}
