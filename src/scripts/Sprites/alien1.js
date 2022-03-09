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
    this.scene.physics.moveToObject(this, this.scene.player, 175);
    // this.timer++;
  }

  destroyAliens(){
    this.body.destroy(true);
    this.disableBody(true, true);
    // this.body.visible = false;
  }
}