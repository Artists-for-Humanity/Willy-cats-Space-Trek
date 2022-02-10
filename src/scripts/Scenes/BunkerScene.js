import Phaser from 'phaser';
import Player from '../Sprites/Player';
import { colors } from '../constants';



export default class GameScene extends Phaser.Scene {
  player;

  constructor() {
    super({
      key: 'BunkerScene',
    });
    this.toggleMove = false;
    this.updownlock = false;
  }

  preload() {
    this.load.image('willy', new URL('../../assets/PlaceholderWilly2.png', import.meta.url).href);
    this.load.image('background', new URL('../../assets/BunkerSceneHolder2.png', import.meta.url).href);
    
  }

  create() {
    this.background = this.add.image((this.game.config.width / 2) , (this.game.config.height /2), 'background' );
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2);
    
  }

  update() {
    this.player.update();
  }
}
