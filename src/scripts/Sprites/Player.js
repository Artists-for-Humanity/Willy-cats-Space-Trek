import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'spraycan');

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard.createCursorKeys();

    return this;
  }

  //player movement//
  update() {
    //left and walking left animation//
    if (this.cursors.left.isDown) {
      this.x -= 5;
    }
    //right and walking right animation//
    if (this.cursors.right.isDown) {
      this.x += 5;
    }
    //up and walking up animation//
    if (this.cursors.up.isDown) {
      this.y -= 5;
    }
    //down and walking down animation//
    if (this.cursors.down.isDown) {
      this.y += 5;
    }
    //fire//
  }

  //make a function for the bullet moveing towards the player cursor= 'fire'//
  //if saftey is off -->
  //when player left mouse is down
  //read player position
  //read mouse position
  //calculate angle from player and mouse postion with tangent
}