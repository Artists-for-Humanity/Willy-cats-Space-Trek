import Phaser from 'phaser';
export default class StartAtTest extends Phaser.Scene {
  constructor() {
    super({
      key: 'StartAtTest',
    });
  }
  preload() {}

  create() {
    this.text = this.add.text(32, 32);

    //  A 10 second delay, but the first time it begins it'll start 5 seconds in, then on repeat will repeat for the full 10 seconds
    this.timedEvent = this.time.addEvent({
      delay: 10000,
      callback: this.onEvent(),
      callbackScope: this,
      repeat: 3,
      startAt: 5000,
    });
    this.input.on('pointerdown', () => {
      this.timedEvent.paused = !this.timedEvent.paused;
    });
  }
  update() {
    this.text.setText(
      'Event.progress: ' +
        this.timedEvent.getProgress().toString().substr(0, 4) +
        '\nEvent.repeatCount: ' +
        this.timedEvent.repeatCount
    );
  }
  onEvent() {
    console.log('start');
  }
}
