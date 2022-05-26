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
    this.interact = false;
    this.iter = 0;
    this.displaynum = 0; 
    this.descriptionText;

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
  }

  create() {
    this.globalState.addUIBorder(this.scene.getIndex(this.key));
    this.background = this.add.image((0), (50), 'background').setOrigin(0);
    this.globalState.clearHealth();
    this.globalState.initializeHealth(this.scene.getIndex(this.key));
    this.XBtn = this.add.image(900, 200, 'XBtn')
    this.XBtn.setInteractive();
    this.XBtn.on('pointerdown', () => {
      this.scene.start('BunkerScene');
    });
    this.cursors = this.input.keyboard.createCursorKeys();
    this.InvBG = this.add.image(635, 360, 'InvBG').setScale(.85);
    this.graphics = this.make.graphics();
    this.graphics.fillRect(430, 155, 400, 400);
    this.mask = new Phaser.Display.Masks.GeometryMask(this, this.graphics);
    //attach an interactive to the items
    this.bandage = this.physics.add.sprite(575, 170, 'Bandage', ).setScale(4, 4).setOrigin(0)
      .setInteractive({useHandCursor: true})
      .on('pointerdown', () => {
        this.Displaynum = 1;
      });
    this.bomb = this.physics.add.sprite(575, 330, 'Bomb').setScale(4, 4).setOrigin(0)
    .setInteractive({useHandCursor: true})
    .on('pointerdown', () => {
      this.Displaynum = 2;
    });
    this.boots = this.physics.add.sprite(575,490, 'speed').setScale(4,4).setOrigin(0)
    .setInteractive({useHandCursor: true })
    .on('pointerdown', () => {
      this.Displaynum = 3; 
    });
    this.bleed = this.physics.add.image(575,650, 'bleed').setScale(4,4).setOrigin(0)
    .setInteractive({useHandCursor: true })
    .on('pointerdown', () => {
      this.Displaynum = 4; 
    });
    this.shield = this.physics.add.sprite(575,810, 'shield').setScale(4,4).setOrigin(0).setInteractive({useHandCursor: true })
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
  update() {
    this.globalState.animateHealth();
  //navigating the menu(scrolling)
    if (this.cursors.up.isDown)
      {
      console.log('im moving up')
      this.bandage.y -= 4
      this.bomb.y -= 4
      this.boots.y -= 4
      this.bleed.y -= 4
      this.shield.y -= 4   
   }
   if (this.cursors.down.isDown)
      {
      console.log('im moving down')
      this.bandage.y += 4
      this.bomb.y += 4
      this.boots.y += 4
      this.bleed.y += 4
      this.shield.y += 4   
   }
  //making the descriptions
   //bandage card
   if (this.Displaynum === 1){
      this.description = this.add.image(250, 360, 'ItemDesc').setScale(.80);
      this.descriptionText = this.add.text(130, 200, 'how much health you regen');
      this.descriptionImage = this.add.image( 250, 360, 'Bandage').setScale(2.3);
      this.descCost = this.add.text(220, 400,  `COST: ${this.globalState.HealPrice}`);
      this.UpBtn = this.physics.add.image( 250, 450, 'UpBtn').setScale(1/10)
      .setInteractive({ useHandCursor: true})
      .on('pointerdown',  () => {
        console.log('upgrade heals function')
      });
    }
   //bomb card
   if(this.Displaynum === 2){
      this.description = this.add.image(250, 360, 'ItemDesc').setScale(.80);
      this.descriptionText = this.add.text(130, 200, 'increases your bomb ammunition');
      this.descriptionImage = this.add.image( 250, 360, 'Bomb').setScale(2.3);
      this.descCost = this.add.text(220, 400,  `COST: ${this.globalState.bombPrice}`);
      this.UpBtn = this.physics.add.image( 250, 450, 'UpBtn').setScale(1/10)
      .setInteractive({ useHandCursor: true})
      .on('pointerdown',  () => {
        console.log('bomb')
      });
    }
    //speedcard
    if(this.Displaynum === 3){
      this.description = this.add.image(250, 360, 'ItemDesc').setScale(.80);
      this.descriptionText = this.add.text(130, 200, 'speed boost duration');
      this.descriptionImage = this.add.image( 250, 360, 'speed').setScale(2.3);
      this.descCost = this.add.text(220, 400,  `COST: ${this.globalState.SpeedLimPrice}`);
      this.UpBtn = this.physics.add.image( 250, 450, 'UpBtn').setScale(1/10)
      .setInteractive({ useHandCursor: true})
      .on('pointerdown',  () => {
        console.log('speed')
      });
    }
    //bleedcard
    if(this.Displaynum === 4){
      this.description = this.add.image(250, 360, 'ItemDesc').setScale(.80);
      this.descriptionText = this.add.text(130, 200, 'increase bleed');
      this.descriptionImage = this.add.image( 250, 360, 'bleed').setScale(2.3);
      this.descCost = this.add.text(220, 400,  `COST: ${this.globalState.bleedPrice}`);
      this.UpBtn = this.physics.add.image( 250, 450, 'UpBtn').setScale(1/10)
      .setInteractive({ useHandCursor: true})
      .on('pointerdown',  () => {
        console.log('bleedup')
      });
    }
    //effcard
    if(this.Displaynum === 5){
      this.description = this.add.image(250, 360, 'ItemDesc').setScale(.80);
      this.descriptionText = this.add.text(130, 200, 'duration of forcefeild');
      this.descriptionImage = this.add.image( 250, 360, 'shield').setScale(2.3);
      this.descCost = this.add.text(220, 400,  `COST: ${this.globalState.effPrice}`);
      this.UpBtn = this.physics.add.image( 250, 450, 'UpBtn').setScale(1/10)
      .setInteractive({ useHandCursor: true})
      .on('pointerdown',  () => {
        console.log('eff')
      });
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
}