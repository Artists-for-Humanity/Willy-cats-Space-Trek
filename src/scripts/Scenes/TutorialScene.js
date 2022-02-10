import Phaser from 'phaser';
export default class GameScene extends Phaser.Scene {
    constructor() {
        super ({
            key: 'TutorialScene'
        });
    //variable for amount of enemies// 
    let enemies = 4;
    //variable for tutorial text, size and font = css//
    //variable for toggleMove = off
    
    //variable for toggleShoot = off
    this.toggleShoot = false;
    }
    
    Preload(){
        //tutorial map image//
        //enemy files enemy//
    }
    
    Create(){
        //text for controls, toggleMove on
        //text to enter door//
        //load into tutorial map

        //load enemies (one by one)
        //this.SpawnEnemy(Math.floor((Math.random() * 1181 - 590)), Math.floor((Math.random() * 621 - 310)));

        //text for shooting, toggleShoot on
    }

    //SpawnEnemy(x, y){

      //  enemies--;
    //}

}