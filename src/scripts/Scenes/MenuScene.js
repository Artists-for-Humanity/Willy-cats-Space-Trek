import Phaser from 'phaser';
import WebFont from 'webfontloader';
import { colors } from '../constants';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    //background image for start menu//
    //image for start button//
  }

  create() {
    //start button//
    //background image//
    //place both image and start button on the center//
    //when space is press game will start//
    this.input.keyboard.on('keydown-SPACE', () => {
      //switches scene to game//
      this.scene.start('GameScene');
    });
  }
}
