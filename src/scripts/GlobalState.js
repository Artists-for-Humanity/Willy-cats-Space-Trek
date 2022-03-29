import Phaser from 'phaser';

class GlobalState extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    this.score = 0;
    this.health = 9;
    this.fish = 0
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

  resetScore() {
    this.score = 0;
  }
  morefish(){
    this.fish++;
  }
}

export default GlobalState;