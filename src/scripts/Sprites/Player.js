import Phaser from 'phaser';
import TutorialScene from '../Scenes/TutorialScene';
import { colors } from '../constants';


export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, vertMovement = true, mapBorder = true) {
    super(scene, x, y, 'willyRunSide');

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.vertMovement = vertMovement;
    this.mapBorder = mapBorder;
    this.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    return this;
  }

  //player movement//
  update() {
    this.resetPlayerPosition();  
    this.move();

  }
  
  move() {      
      if (this.up.isDown && this.vertMovement) {
        this.y -= 5;
        this.anims.play('willyRunBack', true);
        return;
        //up and walking up animation//
      }
      if (this.down.isDown && this.vertMovement) {
        this.y += 5;
        this.anims.play('willyRunFront', true);
        return;
      //down and walking down animation//
      }
      if (this.left.isDown) {
        this.x -= 5;
        this.flipX = true;
        this.anims.play('willyRunSide', true);
        return;
        //left and walking left animation//
      }
      if (this.right.isDown) {
        this.x += 5;
        this.flipX = false;
        this.anims.play('willyRunSide', true);
        return;
      //right and walking right animation//
      }
    
     this.anims.play('idle', true);
  }
 

  
  resetPlayerPosition(){
   //console.log(this.x,this.y)
    if (this.mapBorder) {
      if (this.y <= 130){
        this.y = 130;
      }
      if (this.y >= 700){
        this.y = 700;
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
