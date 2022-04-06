import Phaser, { Physics } from 'phaser';

export default class alien extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'alienRunSide');
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);
    this.running = false;
  }

  //movement ai for the enemies
  update() {
    this.scene.physics.moveToObject(this, this.scene.player, 175);
    this.animate();
    // console.log(this.getVelocityY());
  }

  destroyAliens() {
    this.body.destroy();
    this.clearAlpha();
    this.setVisible(false);
  }

  animate() {
    // horizontal animations
    if (Math.abs(this.getVelocityX()) > Math.abs(this.getVelocityY())) {
      if (this.getVelocityX() > 0) {
        this.anims.play('alienRunSide', true);  // right
        this.flipX = false;
        return;
      }
      if (this.getVelocityX() < 0) {
        this.anims.play('alienRunSide', true);  // left
        this.flipX = true;
        return;
      }
    }

    // vertical animations
    else {
      if (this.getVelocityY() > 0) {
        this.anims.play('alienRunFront', true); // front
        return;
      }
      if (this.getVelocityY() < 0) {
        this.anims.play('alienRunBack', true); // back
        return;
      }
    }
  }

  getVelocityX() {
    return this.body.velocity.x;
  }

  getVelocityY() {
    return this.body.velocity.y;
  }

}