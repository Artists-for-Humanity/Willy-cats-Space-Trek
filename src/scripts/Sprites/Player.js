import Phaser from 'phaser';
import TutorialScene from '../Scenes/TutorialScene';
import { colors } from '../constants';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'willy');

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard.createCursorKeys();

    return this;
  }

  //player movement//
  update() {

      if (this.cursors.left.isDown) {
        this.x -= 5;
        //left and walking left animation//
      }
    
      if (this.cursors.right.isDown) {
        this.x += 5;
      //right and walking right animation//
      }
    
      if (this.cursors.up.isDown) {
        this.y -= 5;
        //up and walking up animation//
      }
    
      if (this.cursors.down.isDown) {
        this.y += 5;
      //down and walking down animation//
    }

  }

 
}