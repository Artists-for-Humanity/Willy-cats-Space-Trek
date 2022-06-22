import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'MenuScene',
    });
  }

  preload() {
    //start screen
    this.load.image('start-screen', new URL('../../assets/start-screen.png', import.meta.url).href);

    //start menu
    this.load.image('start-button', new URL('../../assets/start-button.png', import.meta.url).href);

    this.load.spritesheet(
      'willyRunSide',
      new URL('../../assets/willyRunSide.png', import.meta.url).href,
      {
        frameWidth: 70,
        frameHeight: 90,
      }
    );

    this.load.spritesheet(
      'willyRunBack',
      new URL('../../assets/willyRunBack.png', import.meta.url).href,
      {
        frameWidth: 70,
        frameHeight: 90,
      }
    );

    this.load.spritesheet(
      'willyRunFront',
      new URL('../../assets/willyRunFront.png', import.meta.url).href,
      {
        frameWidth: 70,
        frameHeight: 90,
      }
    );

    this.load.spritesheet(
      'alienRunFront',
      new URL('../../assets/alienRunFront.png', import.meta.url).href,
      {
        frameWidth: 52,
        frameHeight: 62,
      }
    );

    this.load.spritesheet(
      'alienRunBack',
      new URL('../../assets/alienRunBack.png', import.meta.url).href,
      {
        frameWidth: 52,
        frameHeight: 62,
      }
    );

    this.load.spritesheet(
      'alienRunSide',
      new URL('../../assets/alienRunSide.png', import.meta.url).href,
      {
        frameWidth: 52,
        frameHeight: 62,
      }
    );

    this.load.spritesheet('health', new URL('../../assets/spritesheet.png', import.meta.url).href, {
      frameWidth: 30,
      frameHeight: 30,
    });
  }

  create() {
    //add start screen
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'start-screen');

    //add start button
    const gameStartBtnX = this.game.config.width / 2 - 320;
    const gameStartBtnY = this.game.config.height / 2 + 160;
    const startButton = this.add
      .image(gameStartBtnX, gameStartBtnY, 'start-button')
      .setInteractive({
        useHandCursor: true,
      })
      .on('pointerdown', () => {
        this.scene.start('BunkerScene');
      });

    //willy animations
    this.anims.create({
      key: 'idle',
      frames: [
        {
          key: 'willyRunSide',
          frame: 4,
        },
      ],
      frameRate: 20,
    });

    this.anims.create({
      key: 'willyRunBack',
      frames: [
        {
          key: 'willyRunBack',
          frame: 1,
        },
        {
          key: 'willyRunBack',
          frame: 2,
        },
        {
          key: 'willyRunBack',
          frame: 3,
        },
        {
          key: 'willyRunBack',
          frame: 4,
        },
        {
          key: 'willyRunBack',
          frame: 5,
        },
        {
          key: 'willyRunBack',
          frame: 6,
        },
        {
          key: 'willyRunBack',
          frame: 7,
        },
        {
          key: 'willyRunBack',
          frame: 8,
        },
      ],
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'willyRunFront',
      frames: [
        {
          key: 'willyRunFront',
          frame: 0,
        },
        {
          key: 'willyRunFront',
          frame: 1,
        },
        {
          key: 'willyRunFront',
          frame: 2,
        },
        {
          key: 'willyRunFront',
          frame: 3,
        },
        {
          key: 'willyRunFront',
          frame: 4,
        },
        {
          key: 'willyRunFront',
          frame: 5,
        },
        {
          key: 'willyRunFront',
          frame: 6,
        },
        {
          key: 'willyRunFront',
          frame: 7,
        },
      ],
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'willyRunSide',
      frames: [
        {
          key: 'willyRunSide',
          frame: 0,
        },
        {
          key: 'willyRunSide',
          frame: 1,
        },
        {
          key: 'willyRunSide',
          frame: 2,
        },
        {
          key: 'willyRunSide',
          frame: 3,
        },
        {
          key: 'willyRunSide',
          frame: 4,
        },
        {
          key: 'willyRunSide',
          frame: 5,
        },
        {
          key: 'willyRunSide',
          frame: 6,
        },
        {
          key: 'willyRunSide',
          frame: 7,
        },
      ],
      frameRate: 20,
      repeat: -1,
    });

    //alien animations
    this.anims.create({
      key: 'alienRunFront',
      frames: [
        {
          key: 'alienRunFront',
          frame: 0,
        },
        {
          key: 'alienRunFront',
          frame: 1,
        },
        {
          key: 'alienRunFront',
          frame: 2,
        },
        {
          key: 'alienRunFront',
          frame: 3,
        },
        {
          key: 'alienRunFront',
          frame: 4,
        },
        {
          key: 'alienRunFront',
          frame: 5,
        },
        {
          key: 'alienRunFront',
          frame: 6,
        },
        {
          key: 'alienRunFront',
          frame: 7,
        },
      ],
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'alienRunBack',
      frames: [
        {
          key: 'alienRunBack',
          frame: 0,
        },
        {
          key: 'alienRunBack',
          frame: 1,
        },
        {
          key: 'alienRunBack',
          frame: 2,
        },
        {
          key: 'alienRunBack',
          frame: 3,
        },
        {
          key: 'alienRunBack',
          frame: 4,
        },
        {
          key: 'alienRunBack',
          frame: 5,
        },
        {
          key: 'alienRunBack',
          frame: 6,
        },
        {
          key: 'alienRunBack',
          frame: 7,
        },
      ],
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'alienRunSide',
      frames: [
        {
          key: 'alienRunSide',
          frame: 0,
        },
        {
          key: 'alienRunSide',
          frame: 1,
        },
        {
          key: 'alienRunSide',
          frame: 2,
        },
        {
          key: 'alienRunSide',
          frame: 3,
        },
        {
          key: 'alienRunSide',
          frame: 4,
        },
        {
          key: 'alienRunSide',
          frame: 5,
        },
        {
          key: 'alienRunSide',
          frame: 6,
        },
        {
          key: 'alienRunSide',
          frame: 7,
        },
      ],
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'full',
      frames: [
        {
          key: 'health',
          frame: 0,
        },
      ],
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: '-1',
      frames: [
        {
          key: 'health',
          frame: 1,
        },
      ],
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: '-2',
      frames: [
        {
          key: 'health',
          frame: 2,
        },
      ],
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'empty',
      frames: [
        {
          key: 'health',
          frame: 3,
        },
      ],
      frameRate: 20,
      repeat: -1,
    });
  }
}
