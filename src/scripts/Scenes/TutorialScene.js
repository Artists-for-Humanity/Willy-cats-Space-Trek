import Phaser from 'phaser';
export default class GameScene extends Phaser.Scene {
    constructor() {
        super ({
            key: 'Tutorial'
        });
    //variable for amount of enemies// 
    //variable for tutorial text, size and font = css//
    //variable for toggleMove 
    //variable for toggleShoot 
    }
    Preload(){
        //tutorial map image//
        //enemy files enemy//
    }
    
    Create(){
        //load into bunker
        //text for controls, toggleMove on
        //text to enter door//
        //load into tutorial map
        //load enemies
        //text for shooting, toggleShoot on
    }

    //create movementLock function using toggleMove
    //create weaponLock function using toggleShoot
}