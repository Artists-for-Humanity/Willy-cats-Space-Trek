import Phaser from 'phaser';
import GlobalState from '../GlobalState';
export default class HealthDisplay extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'health');
    this.globalState = GlobalState;
    scene.add.existing(this);
    
   
    return this;
  }


  update() {
  }
}
  
  