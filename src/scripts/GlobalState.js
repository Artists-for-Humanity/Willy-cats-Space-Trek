import Phaser from 'phaser';
import HealthDisplay from '../scripts/Sprites/HealthDisplay';

class GlobalState extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    this.score = 0;
    this.health = 9;
    this.fish = 0
    this.healthslots = [];
    this.slotnum = 3;
  }


   

  decreaseHealth() {
      this.health--;
  }

  resetHealth() {
      this.health = 9;
      
  }

  incrementScore() {
    this.score++;
  }

  lives(){
    return this.health;
  }
  resetScore() {
    this.score = 0;
  }
  morefish(){
    this.fish++;
  }
}

export default GlobalState;