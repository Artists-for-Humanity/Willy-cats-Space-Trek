import Phaser from 'phaser';
import Player from '../Sprites/Player';
import { colors } from '../constants';


export default class GameScene extends Phaser.Scene {
  player;

  constructor() {
    super({
      key: 'BunkerScene',
    });
  }

  preload() {
    this.load.image('willy', new URL('../../assets/PlaceholderWilly.png', import.meta.url).href);
  }

  create() {
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2);
    
  }

  update() {
    this.player.update();
  }
}
