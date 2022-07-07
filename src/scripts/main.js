import Phaser from 'phaser';
import WillyScene from './Scenes/WillyScene';
// import BossScene from './Scenes/BossScene';

// import gameTemp from './gameTemp';

// Set configuration for phaser game instance
const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 770,
  backgroundColor: '#808080',

  // Add physics, arcade, scene, and audio
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
      },
      debug: true,
    },
  },
  scene: [WillyScene],
  audio: {
    disableWebAudio: true,
  },
  plugins: {
    global: [{}, {}],
  },
};

// Initialize game instance
new Phaser.Game(config);
