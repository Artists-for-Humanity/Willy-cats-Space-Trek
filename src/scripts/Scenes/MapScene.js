
import Phaser from 'phaser';
import Player from '../Sprites/Player';
export default class MapScene extends Phaser.Scene {
    player;
    constructor() {
        super ({
            key: 'MapScene'
        });
    }
    
    preload(){
        this.load.image('mapscene', new URL('../../assets/Map.png',
            import.meta.url).href);
    }
    
    create(){
        this.background = this.add.image((this.game.config.width / 2) , (this.game.config.height /2), 'mapscene' );
        this.player = new Player(this, 50, 340);
    }
}