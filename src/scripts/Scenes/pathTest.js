import Phaser from 'phaser';
export default class pathTest extends Phaser.Scene {
  constructor() {
    super({ key: 'pathTest' });
    this.points = [
      //   new Phaser.Math.Vector2(30,300),
      new Phaser.Math.Vector2(540, 360),
      new Phaser.Math.Vector2(300, 290),
      new Phaser.Math.Vector2(270, 318),
      new Phaser.Math.Vector2(300, 345),
      new Phaser.Math.Vector2(360, 380),
      new Phaser.Math.Vector2(690, 250),
      new Phaser.Math.Vector2(750, 290),
      new Phaser.Math.Vector2(780, 317),
      new Phaser.Math.Vector2(540, 360),
    ];
    this.path;
  }

  preload() {
    this.load.image('alien', new URL('../../assets/lazerbeam.png', import.meta.url).href);
  }

  create() {
    this.makepath();
  }

  makepath() {
    this.curve = new Phaser.Curves.Path(540, 360);
    this.curve.splineTo(this.points);
    this.alien = this.add.follower(this.curve, 540, 360, 'alien').setScale(0.1);
    this.alien.startFollow({
      duration: 2500,
      repeat: -1,
      rotateToPath: true,
    });
  }
  //   plot() {
  //     // draw the spline in WHITE
  //     this.graphics.lineStyle(1, 0xffffff, 1);
  //     this.curve.draw(this.graphics, 64);
  //     // plot points using getPoint with t equally spaced out at 1/5, in GREEN
  //     this.graphics.fillStyle('0x00FF00');
  //     for (let p = 0; p <= 1; p += 1 / 5) {
  //       const point = this.curve.getPoint(p);
  //       this.graphics.fillRect(point.x, point.y, 6, 6);
  //     }
  //     // draw equally space points in BLUE
  //     this.graphics.fillStyle('0x0000FF');
  //     this.curve.getSpacedPoints(5).forEach((p) => this.graphics.fillRect(p.x + 3, p.y + 3, 6, 6));
  //   }
}
