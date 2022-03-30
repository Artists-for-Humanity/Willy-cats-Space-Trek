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
    // this.ratHBtxtOn = false;

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
    this.background = this.add.image((this.game.config.width / 2), (this.game.config.height / 2), 'background');
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2, true, false);

    this.anims.create({
      key: 'idle',
      frames: [{
        key: 'willy',
        frame: 0
      }],
      frameRate: 20
    })
    //willy animation
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

    //rat speach and stuff
    this.ratHB = this.physics.add.image(640, 100, 'tutorialdoor')
    this.ratHB.visible = false;
    this.ratHBtext = this.add.text(640, 450, 'interact', {
      fontFamily: 'Space Mono',
      fontSize: '24px',
      fontStyle: 'bold',
      fill: colors.white,
      align: 'center',
    })
    this.ratHBtext.visible = false;

    //tutorial door physics + creation
    this.tdoor = this.physics.add.image(300, 100, 'tutorialdoor');
    this.tdoor.visible = false;

    //level selection
    this.mapDoor = this.physics.add.image(640, 720, 'tutorialdoor');
    this.mapDoor.visible = false;

    //collision detection
    this.physics.add.overlap(this.player, this.tdoor, () => this.playerdoordetect())
    this.physics.add.overlap(this.player, this.mapDoor, () => this.mapDoorDetect())
    this.ratHBtext.visible = false;

    // borders
    this.border = this.physics.add.sprite(640, 50, 'border', );
    this.border.scaleX = 2;
    this.border.scaleY = 1.6;
    this.border.visible = false;
    this.physics.add.overlap(this.player, this.border, this.playerXborder);

  }

  update() {
    this.player.update();
    this.ratmenu();
  }

  playerdoordetect() {
    // console.log('reachme 00');
    this.scene.start('TutorialScene');
    GameRule.toggleBorder = true;
    // console.log('reachme 01');
  }

  mapDoorDetect() {
    this.scene.start('MapScene');
  }

  playerXborder(player, ) {
    player.y = 160

  }

  ratText() {
    // console.log('here')
    this.ratHBtext.visible = true;

  }
  ratmenu(){
    this.physics.add.overlap(this.player, this.ratHB, () => {
      if (this.ratHBtext.visible === false) {
        console.log('hello')
        this.ratText();
      } 
      if(this.ratHBtext.visible === true){
        console.log('last')
        this.ratHBtext.visible = false;
      }
    })
    
  }
}