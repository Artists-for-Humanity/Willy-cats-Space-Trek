import Phaser from 'phaser';
import Player from '../Sprites/Player';
export default class MapScene extends Phaser.Scene {
  player;
  keySpace;
  constructor() {
    super({
      key: 'MapScene'
    });
  }

  preload() {
    this.load.image('mapscene', new URL('../../assets/Map.png',
      import.meta.url).href);
  }

  create() {
    this.gS.addUIBorder(this.scene.getIndex(this.key));
    this.background = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 25, 'mapscene');
    this.player = new Player(this, this.gS.mapSceneX, 390, false, false);

    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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
  }

  update() {
    this.player.update();
    if (this.player.x <= 50) {
      this.player.x = 50;
    }
    if (this.keySpace.isDown) {
      this.select();
    }
  }

  select() {
    if (this.player.x <= 80) {
      this.gS.mapSceneX = this.player.x;
      this.scene.start("BunkerScene");
    }
    if (this.player.x <= 310 && this.player.x >= 240) {
      this.gS.mapSceneX = this.player.x;
      this.scene.start("EndlessScene");
    }
  }

}