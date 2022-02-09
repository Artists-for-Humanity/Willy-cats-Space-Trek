import Phaser from 'phaser';
export default class GameScene extends Phaser.Scene {
    constructor() {
        super ({
            key: 'Tutorial'
        });
    //variable for amount of enemies// 
    //variable for tutorial text, size and font = css//
    //variable for projectile = 'saftey'//
    //variable for dialouge check = 'd check'= fasle//
    }
    Preload(){
        //tutorial map image//
        //enemy files enemy//
    }
    
    Create(){
        //text for controls//
        //text for objectvie//
        //text size and font equal to = 'css'//
        //enemy amount equal to a 'variable'
    }
    update(){
        //when 'scene start' 'saftey equals on'
    }
    //when tutorialscene start//
    //make tutorial text appear
    // set 'd check' to true

    //when tutorial dialouge end//
    //text disapears
    //set d'check' false//
}