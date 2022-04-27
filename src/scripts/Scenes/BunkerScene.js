import Phaser from 'phaser';
import Player from '../Sprites/Player';
import {
  colors
} from '../constants';
import GameRule from '../GameRule';
export default class BunkerScene extends Phaser.Scene {
  player;
  constructor() {
    super({
      key: 'BunkerScene',

    });
    this.interact = false;
  }

  preload() {
    this.load.image('background', new URL('../../assets/RealBunker.png',
      import.meta.url).href);
    this.load.image('tutorialdoor', new URL('../../assets/door.png',
      import.meta.url).href);
    this.load.image('border', new URL('../../assets/Hborder.png',
      import.meta.url).href);
  }

  create() {
    // this.globalState.addUIBorder();
    this.globalState.addUIBorder(this.scene.getIndex(this.key));
    this.background = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 25, 'background');
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2, true, false);
    this.globalState.clearHealth();
    this.globalState.initializeHealth(this.scene.getIndex(this.key));

    //rat speach and stuff
    this.ratHB = this.physics.add.staticImage(640, 150, 'tutorialdoor')
    this.ratHB.visible = false;
    
    //tutorial door physics + creation
    this.tdoor = this.physics.add.image(300, 150, 'tutorialdoor');
    this.tdoor.visible = false;

    //level selection
    this.mapDoor = this.physics.add.image(640, 770, 'tutorialdoor');
    this.mapDoor.visible = false;

    //collision detection 
    this.physics.add.overlap(this.player, this.tdoor, () => this.playerdoordetect())
    this.physics.add.overlap(this.player, this.mapDoor, () => this.mapDoorDetect())

    this.physics.add.overlap(this.player, this.ratHB, () => this.ratmenu())


    // borders
    this.border = this.physics.add.sprite(640, 100, 'border', );
    this.border.scaleX = 2;
    this.border.scaleY = 1.6;
    this.border.visible = false;
    this.physics.add.overlap(this.player, this.border, this.playerXborder);

  }

  update() {
    this.globalState.animateHealth();
    this.player.update();
  }

  playerdoordetect() {
    this.scene.start('TutorialScene');
    GameRule.toggleBorder = true;
  }

  mapDoorDetect() {
    this.scene.start('MapScene');
    // this.globalState.clearHealth();
  }

  ratmenu() {
    this.scene.start('ShopScene')
    // this.globalState.clearHealth();
  }
  
  playerXborder(player) {
    player.y = 210
  }
}