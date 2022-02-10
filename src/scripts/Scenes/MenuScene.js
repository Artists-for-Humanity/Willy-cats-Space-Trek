
import Phaser from 'phaser';
import WebFont from 'webfontloader';
import { colors } from '../constants';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    //start screen
    this.load.image(
      'start-screen',
      new URL('../../assets/start-screen.png', import.meta.url).href
    );

    //start menu
    this.load.image(
      'start-button',
      new URL('../../assets/start-button.png', import.meta.url).href
    );
  }

  create() {
    //add start screen
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'start-screen');
    
    //add start button
    const gameStartBtnX = this.game.config.width / 2 -240;
    const gameStartBtnY = this.game.config.height / 2 + 160;
    const startButton = this.add.image(gameStartBtnX, gameStartBtnY, 'start-button')
    .setInteractive({ useHandCursor: true })
    .on('pointerdown',  () => {
      this.scene.start('TutorialScene');
    })

    // WebFont.load({
    //   custom: {
    //     families: ['Space Mono'],
    //   },
    //   active: () => {
    //     this.add
    //       .text(
    //         this.game.config.width / 2,
    //         this.game.config.height * (2 / 3),
    //         'text',
    //         {
    //           fontFamily: 'Space Mono',
    //           fontSize: '32px',
    //           fontStyle: 'bold',
    //           fill: colors.white,
    //           align: 'center',
    //         }
    //       )
    //       .setOrigin(0.5);
    //   },
    // });

    //when space is pressed tutorialScene starts//
    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('TutorialScene');
    });
  }
}