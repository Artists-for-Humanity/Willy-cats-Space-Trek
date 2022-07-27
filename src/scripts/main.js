import Phaser from 'phaser';
import TestingScene from './Scenes/TestingScene';
import JustDownTest from './Scenes/JustDownTest';
import StartAtTest from './Scenes/StartAtTest';
// import BossScene from './Scenes/BossScene';
import pathTest from './Scenes/pathTest';
// import gameTemp from './gameTemp';

// Set configuration for phaser game instance
const config = {
  type: Phaser.AUTO,
  width: 1080,
  height: 720,
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
  scene: [pathTest, StartAtTest, JustDownTest, TestingScene],
  audio: {
    disableWebAudio: true,
  },
  plugins: {
    global: [{}, {}],
  },
};

// Initialize game instance
new Phaser.Game(config);
