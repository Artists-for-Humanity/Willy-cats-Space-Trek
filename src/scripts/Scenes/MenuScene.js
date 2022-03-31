import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'MenuScene'
    });
  }

  preload() {
    //start screen
    this.load.image(
      'start-screen',
      new URL('../../assets/start-screen.png',
        import.meta.url).href
    );

    //start menu
    this.load.image(
      'start-button',
      new URL('../../assets/start-button.png',
        import.meta.url).href
    );

    this.load.spritesheet('willy', new URL('../../assets/willy-sheet.png',
      import.meta.url).href, {
      frameWidth: 70,
      frameHeight: 90
    });

    this.load.spritesheet('alien', new URL('../../assets/enemy-spritesheet.png',
            import.meta.url).href, {
            frameWidth: 52,
            frameHeight: 62
        });
  }

  create() {
    //add start screen
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'start-screen');

    //add start button
    const gameStartBtnX = this.game.config.width / 2 - 320;
    const gameStartBtnY = this.game.config.height / 2 + 160;
    const startButton = this.add.image(gameStartBtnX, gameStartBtnY, 'start-button')
    .setInteractive({
      useHandCursor: true
    })
    .on('pointerdown', () => {
      this.scene.start('BunkerScene');
    });
    
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
    }
}