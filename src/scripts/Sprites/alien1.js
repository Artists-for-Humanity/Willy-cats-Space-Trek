import Phaser from 'phaser';
import TutorialScene from '../Scenes/TutorialScene';
import { colors } from '../constants';
import Player from './Player';
export default class alien1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'alien1');

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);
    // player = Player
    return this;
  }
  //movement ai for the enemies
  update(){
    // console.log(player.x)
    if (Player.x >= this.x ){
        this.x += 7;
    }
    if (Player.x <= this.x){
      this.x =- 7;
    }
    if (Player.y >= this.y){
      this.y =+ 7;
    }
    if (Player.y <= this.y){
      this.y =- 7;
    }
  }
}