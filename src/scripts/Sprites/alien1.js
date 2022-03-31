import Phaser, { Physics } from 'phaser';

export default class alien1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'alien');
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);
    this.running = false;
  }

  //movement ai for the enemies
  update(){
    this.run()
      if(this.runnning === true) {
      this.anims.play('alienWalk', true);

    }
  }

  destroyAliens(){
    this.body.destroy();
    this.setVisible(false);
  }
  run(){
    this.scene.physics.moveToObject(this, this.scene.player, 175);
    this.running = true;
  }
}