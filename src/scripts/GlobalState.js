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

  clearHealth() {
    while (this.healthslots.length > 0) this.healthslots.pop();
  }

  initializeHealth(sceneNum) {
    for (let i = 0; i < this.slotnum; i++) {
      const health = new HealthDisplay(this.pluginManager.game.scene.scenes[sceneNum], 1200 - (65 * i), 26).setScale(1.5);
      this.healthslots.push(health);
    }
  }

  animateHealth() {
    if (this.health === 8) this.healthslots[0].anims.play('-1', true);
    if (this.health === 7) this.healthslots[0].anims.play('-2', true);
    if (this.health <= 6) this.healthslots[0].anims.play('empty', true);
    if (this.health === 5) this.healthslots[1].anims.play('-1', true);
    if (this.health === 4) this.healthslots[1].anims.play('-2', true);
    if (this.health <= 3) this.healthslots[1].anims.play('empty', true);
    if (this.health === 2) this.healthslots[2].anims.play('-1', true);
    if (this.health === 1) this.healthslots[2].anims.play('-2', true);
  }

  // addUIBorder() {
  //   let rect = this.add.rectangle(640, 25, 1280, 50)
  //   rect.setStrokeStyle(5, '#000000')
  // }
}

export default GlobalState;