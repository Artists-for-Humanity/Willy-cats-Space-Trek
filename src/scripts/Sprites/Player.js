import Phaser from 'phaser';
import TutorialScene from '../Scenes/TutorialScene';
import { colors } from '../constants';
import GameRule from '../GameRule';
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'willy');

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.rule = GameRule; 
    
    return this;
  }

  //player movement//
  update() {
    this.resetPlayerPosition();
    this.move();
  }

  move() {
    //walking left
    if (this.cursors.left.isDown) {
      this.x -= 5
      this.flipX = true;
      this.anims.play('run', true);
      return;
    }
    //walking right
    if (this.cursors.right.isDown) {
      this.x += 5
      this.flipX = false;
      this.anims.play('run', true);
      return;
    }
    //walking up
    if (this.cursors.up.isDown) {
      this.y -= 5;
      return;
    }
    //walking down
    if (this.cursors.down.isDown) {
      this.y += 5;
      return;
    }

    this.anims.play('idle', true);
  }
  
  // getPosition(){ 

  
  resetPlayerPosition(){
   //console.log(this.x,this.y)
    if (this.rule.toggleBorder === true) {
      if (this.y <= 80){
        this.y = 85;
      }
      if (this.y >= 650){
        this.y = 645;
      }
      if (this.x <= 95){
        this.x = 100;
  
      }
      if (this.x >= 1185){
        this.x = 1180;
      }
    }
  }

}
