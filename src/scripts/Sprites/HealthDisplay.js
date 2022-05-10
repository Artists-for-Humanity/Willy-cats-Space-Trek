import Phaser from 'phaser';

export default class HealthDisplay extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'health');

    scene.add.existing(this);
    
   
    return this;
  }


  update() {
  }
}
  
  