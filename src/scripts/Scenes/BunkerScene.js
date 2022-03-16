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
    this.load.image('background', new URL('../../assets/RealBunker.png',
      import.meta.url).href);
    this.load.image('tutorialdoor', new URL('../../assets/door.png',
      import.meta.url).href);
    this.load.image('border', new URL('../../assets/Hborder.png',
      import.meta.url).href);
    this.load.spritesheet('willy', new URL('../../assets/willy-sheet.png',
      import.meta.url).href, {
      frameWidth: 70,
      frameHeight: 90
    });
  }

  create() {
    this.background = this.add.image((this.game.config.width / 2) , (this.game.config.height /2), 'background' );
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2);
   
    this.anims.create({
      key: 'idle',
      frames: [{
        key: 'willy',
        frame: 0
      }],
      frameRate: 20
    })

    this.anims.create({
      key: 'run',
      frames: [{
          key: 'willy',
          frame: 1
        },
        {
          key: 'willy',
          frame: 2
        },
        {
          key: 'willy',
          frame: 3
        },
        {
          key: 'willy',
          frame: 4
        },
        {
          key: 'willy',
          frame: 5
        },
        {
          key: 'willy',
          frame: 6
        },
        {
          key: 'willy',
          frame: 7
        },
        {
          key: 'willy',
          frame: 8
        }
      ],
      frameRate: 20,
      repeat: -1
    })
    
    //tutorial door physics + creation
    this.tdoor = this.physics.add.image(300, 100, 'tutorialdoor');
    this.tdoor.visible = false;

    //level selection
    this.mapDoor = this.physics.add.image(640, 720, 'tutorialdoor');
    this.mapDoor.visible = false;

    //collision detection
    this.physics.add.overlap(this.player, this.tdoor, () => this.playerdoordetect())
    this.physics.add.overlap(this.player, this.mapDoor, () => this.mapDoorDetect())

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

  mapDoorDetect(){
    this.scene.start('MapScene');
    GameRule.toggleBorder = true;
  }

  playerXborder(player,){
    player.y = 160
    
  }

}
