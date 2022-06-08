import Phaser from 'phaser';
import {
  colors
} from '../constants';
import Player from '../Sprites/Player';
export default class ShopScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'ShopScene',
    });
    this.Displaynum = 0;
    this.DisplaynumPrev = 0;
  }

  preload() {
    this.load.image('background', new URL('../../assets/RealBunker.png',
      import.meta.url).href);
    this.load.image('XBtn', new URL('../../assets/X.png',
      import.meta.url).href);
    this.load.image('InvBG', new URL('../../assets/Menu_Screen.png',
      import.meta.url).href);
    //items
    this.load.image('ItemDesc', new URL('../../assets/itemDesc.png',
      import.meta.url).href);
    this.load.image('bleed', new URL('../../assets/Bleed.png',
      import.meta.url).href);
    this.load.image('Bandage', new URL('../../assets/Bandage.png',
      import.meta.url).href);
    this.load.image('Bomb', new URL('../../assets/Bomb_Icon.png',
      import.meta.url).href);
    this.load.image('speed', new URL('../../assets/Boots.png',
      import.meta.url).href);
    this.load.image('shield', new URL('../../assets/Shield_Icon.png',
      import.meta.url).href);
    this.load.image('UpBtn', new URL('../../assets/UpBtnIcon.png',
      import.meta.url).href);
    this.load.image('zerobtn', new URL('../../assets/Willy_Death.png',
      import.meta.url).href)
  }

  create() {
    this.globalState.addUIBorder(this.scene.getIndex(this.key));
    this.background = this.add.image((0), (50), 'background').setOrigin(0);
    this.globalState.clearHealth();
    this.globalState.initializeHealth(this.scene.getIndex(this.key));
    this.XBtn = this.add.image(900, 200, 'XBtn')
    this.XBtn.setInteractive();
    this.XBtn.on('pointerdown', () => {
      this.Displaynum = 0;
      this.scene.start('BunkerScene');
    });
    this.cursors = this.input.keyboard.createCursorKeys();
    this.InvBG = this.add.image(635, 360, 'InvBG').setScale(.85);
    this.graphics = this.make.graphics();
    this.graphics.fillRect(430, 155, 400, 400);
    this.mask = new Phaser.Display.Masks.GeometryMask(this, this.graphics);
    //attach an interactive to the items
    this.bandage = this.physics.add.sprite(575, 170, 'Bandage', ).setScale(4, 4).setOrigin(0)
      .setInteractive({
        useHandCursor: true
      })
      .on('pointerdown', () => {
        this.Displaynum = 1;
      });
    this.bomb = this.physics.add.sprite(575, 330, 'Bomb').setScale(4, 4).setOrigin(0)
      .setInteractive({
        useHandCursor: true
      })
      .on('pointerdown', () => {
        this.Displaynum = 2;
      });
    this.boots = this.physics.add.sprite(575, 490, 'speed').setScale(4, 4).setOrigin(0)
      .setInteractive({
        useHandCursor: true
      })
      .on('pointerdown', () => {
        this.Displaynum = 3;
      });
    this.bleed = this.physics.add.image(575, 650, 'bleed').setScale(4, 4).setOrigin(0)
      .setInteractive({
        useHandCursor: true
      })
      .on('pointerdown', () => {
        this.Displaynum = 4;
      });
    this.shield = this.physics.add.sprite(575, 810, 'shield').setScale(4, 4).setOrigin(0).setInteractive({
        useHandCursor: true
      })
      .on('pointerdown', () => {
        this.Displaynum = 5;
      });
    //masking objects
    this.bandage.setMask(this.mask);
    this.bomb.setMask(this.mask);
    this.boots.setMask(this.mask);
    this.bleed.setMask(this.mask);
    this.shield.setMask(this.mask);
  }

  displaySection(description, cost, image, callback) {
    this.description = this.add.image(250, 360, 'ItemDesc').setScale(.80);
    this.descriptionText = this.add.text(140, 190, description);
    this.descriptionImage = this.add.image(250, 360, image).setScale(2.3);
    this.descCost = this.add.text(220, 400, `COST: ${cost}`);
    this.UpBtn = this.physics.add.image(250, 450, 'UpBtn').setScale(1 / 10)
      .setInteractive({
        useHandCursor: true
      })
      .on('pointerdown', () => {
        callback();
      });
  }

  update() {
    this.globalState.animateHealth();
    //navigating the menu(scrolling)
    if (this.cursors.up.isDown) {
      this.bandage.y -= 7
      this.bomb.y -= 7
      this.boots.y -= 7
      this.bleed.y -= 7
      this.shield.y -= 7
    }
    if (this.cursors.down.isDown) {
      this.bandage.y += 7
      this.bomb.y += 7
      this.boots.y += 7
      this.bleed.y += 7
      this.shield.y += 7
    }
    //making the descriptions
    //bandage card

    if (this.Displaynum !== this.DisplaynumPrev) {
      this.description && this.description.destroy();
      this.descriptionText && this.descriptionText.destroy();
      this.descCost && this.descCost.destroy();

      if (this.Displaynum === 1) {
        this.printHeal();
      }
      //bomb card
      if (this.Displaynum === 2) {
        this.printBomb();
      }
      //speedcard
      if (this.Displaynum === 3) {
        this.printSpeed();
      }
      //bleedcard
      if (this.Displaynum === 4) {
        this.printBleed();
      }

      //effcard
      if (this.Displaynum === 5) {
        this.printEff();
      }
      this.DisplaynumPrev = this.Displaynum;
    }
  }


  scrolling() {
    if (this.cursors.up.isDown) {
      this.cam1.scrollY -= 6;
    }
    if (this.cursors.down.isDown) {
      this.cam1.scrollY += 6;
    }
  }

  printHeal() {
    this.displaySection('more Regen', this.globalState.price1, 'Bandage', () => {
      if (this.globalState.fish >= this.globalState.price1) {
        console.log('money')
        this.globalState.fish -= this.globalState.price1;
        this.globalState.price1 *= 2;
        this.printbleed();
        //filler code
      }
    });
  }

  printBomb() {
    this.displaySection('more ammunition', this.globalState.price2, 'Bomb', () => {
      if (this.globalState.fish >= this.globalState.price2) {
        this.globalState.fish -= this.globalState.price2;
        this.globalState.price2 *= 2;
        this.printBomb();
        this.globalState.bombHPvalue += 1;
      }
    });
  }

  printSpeed() {
    this.displaySection('more time', this.globalState.price3, 'speed', () => {
      if (this.globalState.fish >= this.globalState.price3) {
        this.globalState.fish -= this.globalState.price3;
        this.globalState.price3 *= 2
        this.printSpeed();
        //fillercode
      }
    });
  }

  printBleed() {
    this.displaySection('more bleed damage', this.globalState.price4, 'bleed', () => {
      if (this.globalState.fish >= this.globalState.price4) {
        this.globalState.fish -= this.globalState.price4;
        this.globalState.price4 *= 2
        this.printbleed();
        //upgrade bleed time or dmg or somth
      }
    });
  }

  printEff() {
    this.displaySection('More Duration', this.globalState.price5, 'shield', () => {
      if (this.globalState.fish >= this.globalState.price5) {
        this.globalState.fish -= this.globalState.price5;
        this.globalState.price5 *= 2
        this.printEff();
        //filler code
      }
    });
  }
}