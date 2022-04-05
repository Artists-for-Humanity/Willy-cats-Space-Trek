import Phaser from 'phaser';
import GlobalState from '../GlobalState';
import {colors} from '../constants';
export default class ShopScene extends Phaser.Scene {
  player;
  constructor() {
    super({
      key: 'ShopScene',

    });
    this.interact = false;
  }

  preload() {
    this.load.image('background', new URL('../../assets/RealBunker.png', import.meta.url).href);
    this.load.image('BunkerBtn', new URL('../../assets/start-button.png', import.meta.url).href);

  }

  create() {
    this.background = this.add.image((this.game.config.width / 2), (this.game.config.height / 2), 'background');
    this.bunkerBtn = this.add.image(900,300, 'BunkerBtn').setScale(0.5)
    this.bunkerBtn.setInteractive();
    this.bunkerBtn.on('pointerdown', () => {
      this.scene.start('BunkerScene');
    });

    this.ratHBtext = this.add.text(640, 450, 'interact', {
      fontFamily: 'Space Mono',
      fontSize: '24px',
      fontStyle: 'bold',
      fill: colors.white,
      align: 'center',
    })
    this.ratHBtext.visible = false;

    
  }

  update() {

  }
}