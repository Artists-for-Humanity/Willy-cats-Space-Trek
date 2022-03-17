import Phaser from 'phaser';
class GameRule extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.toggleshoot = false; 
        this.toggleMovement = false;
        this.toggleBorder = false; 
    }
}
export default GameRule;