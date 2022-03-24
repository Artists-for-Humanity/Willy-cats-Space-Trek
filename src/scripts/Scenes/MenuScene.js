import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'MenuScene'
    });
  }

  preload() {
    //start screen
    this.load.image(
      'start-screen',
      new URL('../../assets/start-screen.png',
        import.meta.url).href
    );

    //start menu
    this.load.image(
      'start-button',
      new URL('../../assets/start-button.png',
        import.meta.url).href
    );
  }

  create() {
    //add start screen
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'start-screen');

    //add start button
    const gameStartBtnX = this.game.config.width / 2 - 320;
    const gameStartBtnY = this.game.config.height / 2 + 160;
    const startButton = this.add.image(gameStartBtnX, gameStartBtnY, 'start-button')
      .setInteractive({
        useHandCursor: true
      })
      .on('pointerdown', () => {
        this.scene.start('BunkerScene');
      });
  }
}