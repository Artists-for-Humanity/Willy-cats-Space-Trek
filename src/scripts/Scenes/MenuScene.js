
import Phaser from 'phaser';
import WebFont from 'webfontloader';
import { colors } from '../constants';
import TutorialScene from './BunkerScene'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    //background image for start menu//
    //image for start button//
  
    this.load.image(
      'menu-scene-text',
      new URL('../../assets/menu-scene-text.png', import.meta.url).href
    );
  }

  create() {
        //start button//
    //background image//
    //place both image and start button on the center//
    //when space is press game will start//
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'menu-scene-text');

    WebFont.load({
      custom: {
        families: ['Space Mono'],
      },
      active: () => {
        this.add
          .text(
            this.game.config.width / 2,
            this.game.config.height * (2 / 3),
            'You can change me in MenuScene.js',
            {
              fontFamily: 'Space Mono',
              fontSize: '32px',
              fontStyle: 'bold',
              fill: colors.white,
              align: 'center',
            }
          )
          .setOrigin(0.5);
      },
    });

    this.input.keyboard.on('keydown-SPACE', () => {
      //switches scene to tutorial //
      this.scene.start('BunkerScene');
      console.log(this.updownlock);
      console.log(this.togglemove);
      this.updownlock = true;
      this.togglemove = true;
    });
  }
}