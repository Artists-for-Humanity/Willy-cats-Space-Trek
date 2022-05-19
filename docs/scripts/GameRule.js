import Phaser from '../snowpack/pkg/phaser.js';
class GameRule extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.toggleshoot = false; 
        this.toggleMovement = false;
        this.toggleBorder = false; 

    }
}
export default GameRule;