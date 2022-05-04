import Phaser from 'phaser';
import GlobalState from '../GlobalState';
import {
  colors
} from '../constants';
export default class ShopScene extends Phaser.Scene {
  
  constructor() {
    super({
      key: 'ShopScene',


    });

    this.interact = false;
    this.iter = 0;

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
    this.InvBG = this.add.image(635, 360, 'InvBG').setScale(.85)
    this.ItemDesc = this.add.image(250, 360, 'ItemDesc').setScale(.80)

    
    this.graphics = this.make.graphics();
    this.graphics.fillRect(430, 155, 400, 400);
    this.mask = new Phaser.Display.Masks.GeometryMask(this, this.graphics);

    this.bandage = this.physics.add.sprite(575, 170, 'Bandage').setScale(4, 4).setOrigin(0)
    this.bomb = this.physics.add.sprite(575, 330, 'Bomb').setScale(4, 4).setOrigin(0)
    this.boots = this.physics.add.sprite(575,490, 'speed').setScale(4,4).setOrigin(0)
    console.log('You should see me');
    //masking objects
    this.bandage.setMask(this.mask);
    this.bomb.setMask(this.mask);
    this.boots.setMask(this.mask);

    //scroll thingy
    this.zone = this.add.zone(450,155, 400, 400).setOrigin(0).setInteractive();

    this.zone.on('pointermove', (pointer) => {

      if (pointer.isDown)
      {
          this.bandage.y += (pointer.velocity.y / 8);

        
          this.bomb.y += (pointer.velocity.y / 8);
          this.boots.y += (pointer.velocity.y/8);

        
        
      }
    
  });


  let rect = this.add.rectangle(450, 155, 400, 400).setOrigin(0);
  rect.setStrokeStyle(6, '#000000');

  }

  update() {
    this.globalState.animateHealth();
    // console.log(this.image)
    // var halfHeight = this.InvBG.texture.source[0].height / 2;
    // var quarterHeight = halfHeight / 2;
    // this.cam1.scrollY = (halfHeight - quarterHeight + (Math.sin(this.iter) * quarterHeight))|0;
    // this.iter += 0.02;

    // this.scrolling();
  }

  scrolling() {
    if (this.cursors.up.isDown) {
      this.cam1.scrollY -= 1;

    }
    if (this.cursors.down.isDown) {
      this.cam1.scrollY += 1;
    }
  }

}