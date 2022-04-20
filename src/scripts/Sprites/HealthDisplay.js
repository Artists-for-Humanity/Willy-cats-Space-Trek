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
    if (this.globalState.health === 8) {
      console.log(this.globalState.healthslots, 'health')
        this.globalState.healthslots[0].forEach(() => {
        this.anims.play( '-1', true);
      });
      

  
    }
  }
}
  
  