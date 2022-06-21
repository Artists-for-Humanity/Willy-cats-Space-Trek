import Phaser from "phaser";
export default class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameOver'
        });
    }

    preload() {
        this.load.image('gameover', new URL('../../assets/Game_Over_Placeholder.png',
            import.meta.url).href);
        this.load.image('continue', new URL('../../assets/buttonContinue.png',
            import.meta.url).href);
    }
    create() {
        this.GObg = this.add.image((this.game.config.width / 2), (this.game.config.height / 2 + 25), 'gameover');
        const continueBtnX = this.game.config.width / 2;
        const continueBtny = (this.game.config.height / 2) + 175;
        const continueBtn = this.add.image(continueBtnX, continueBtny, 'continue')
            .setInteractive({
                useHandCursor: true
            })
            .on('pointerdown', () => {
                if (this.gS.currentScene === 0) this.scene.start('BunkerScene');
                if (this.gS.currentScene === 1) this.scene.start('MapScene');
            })
    }
}