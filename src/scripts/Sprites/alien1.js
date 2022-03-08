import Phaser, { Physics } from 'phaser';
//import TutorialScene from '../Scenes/TutorialScene';
//import { colors } from '../constants';
import Player from '../Scenes/TutorialScene';
export default class alien1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'alien1');
    this.player = Player; 
    this.timer = 0;
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);
    this.px = this.scene.player.x;
    this.py = this.scene.player.y;
    // player = Player
    return this;
  }

  
  
  //movement ai for the enemies
  update(){
    console.log('hello')
    this.scene.physics.moveToObject(this, this.scene.player, 175);
    console.log('hello2')
    // this.timer++;

    // console.log(this.x, this.y)
    // if(this.timer > 20){
    //   this.timer = 0;
    //   this.px = this.scene.player.x;
    //   this.py = this.scene.player.y;
    // }
    
    // if (this.px >=  this.x){
      
    //   this.x += 2;
    // }
    // if (this.px <= this.x){
    //   this.x -= 2;
    // }
    // if (this.py >= this.y){
    //   this.y += 2;
    // }
    // if (this.py <= this.y){
    //   this.y -= 2;
    // }
    // if(this.scene.player.x == 0) {
    //   this.x += 3;
    // }

  }
}