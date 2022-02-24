import Phaser from 'phaser';
import Player from '../Sprites/Player';
import { colors } from '../constants';
import GameRule from '../GameRule';
export default class BunkerScene extends Phaser.Scene {
  player; 
  constructor() {
    super({
      key: 'BunkerScene',
    });
    
  }

  preload() {
    this.load.image('willy', new URL('../../assets/PlayerHolder.png', import.meta.url).href);
    this.load.image('background', new URL('../../assets/RealBunker.png', import.meta.url).href);
    this.load.image('tutorialdoor', new URL('../../assets/door.png', import.meta.url).href);
    this.load.image('border', new URL('../../assets/Hborder.png', import.meta.url).href);
  }

  create() {
    this.background = this.add.image((this.game.config.width / 2) , (this.game.config.height /2), 'background' );
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2);
    
    
    //tutorial door physics + creation
    this.tdoor = this.physics.add.image( 300, 100, 'tutorialdoor');
    this.physics.add.overlap(this.player, this.tdoor, () => this.playerdoordetect())
    this.tdoor.visible = false;
    // borders
    this.border = this.physics.add.sprite(640,50,'border', );
    this.border.scaleX = 2;
    this.border.scaleY = 1.6;
    this.border.visible = false;
    this.physics.add.overlap(this.player, this.border, this.playerXborder);
  }

  update() {
    this.player.update();
  }
  playerdoordetect(){

    this.scene.start('TutorialScene');
    GameRule.toggleBorder = true; 
  }

  playerXborder(player,){
    player.y = 160
    
  }

}
