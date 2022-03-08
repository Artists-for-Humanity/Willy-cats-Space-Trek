import Phaser, { Physics } from 'phaser';
//import TutorialScene from '../Scenes/TutorialScene';
//import { colors } from '../constants';
import Player from '../Scenes/TutorialScene';
export default class alien1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'alien1');
    this.player = Player; 
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);
    // player = Player
    return this;
  }
  //movement ai for the enemies
  update(){
    console.log(this.x, this.y)
    
    if (this.scene.player.x >= this.x){
       
      this.x += 3;
      
    }
    if (this.scene.player.x <= this.x){
      this.x -= 3;
    }
    if (this.scene.player.y >= this.y){
      this.y += 3;
    }
    if (this.scene.player.y <= this.y){
      this.y -= 3;
    }
    if(this.scene.player.x == 0) {
      this.x += 3;
    }

  }
}