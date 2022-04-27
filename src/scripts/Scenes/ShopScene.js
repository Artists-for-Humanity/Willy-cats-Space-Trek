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
    this.load.image('XBtn', new URL('../../assets/X.png', import.meta.url).href);
    this.load.image('InvBG', new URL('../../assets/Menu_Screen.png', import.meta.url).href);
    this.load.image('ItemDesc', new URL('../../assets/itemDesc.png', import.meta.url).href);



  }

  create() {
    this.background = this.add.image((this.game.config.width / 2), (this.game.config.height / 2), 'background');
    this.XBtn = this.add.image(900,200, 'XBtn')
    this.XBtn.setInteractive();
    this.XBtn.on('pointerdown', () => {
      this.scene.start('BunkerScene');
    });
    this.InvBG =  this.add.image(635, 360, 'InvBG' ).setScale(.85)
    this.ItemDesc = this.add.image(250, 360, 'ItemDesc').setScale(.80)

  
    
  }

  update() {

  }
}