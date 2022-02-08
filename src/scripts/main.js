import Phaser from 'phaser';
import MenuScene from './Scenes/MenuScene';
import GameScene from './Scenes/GameScene';
import MapScene from './Scenes/MapScene';
import BossScene from './Scenes/BossScene';
import TutorialScene from './Scenes/TutorialScene';

// Set configuration for phaser game instance
const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 720,

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
  scene: [MenuScene, GameScene, MapScene, BossScene, TutorialScene],
  audio: {
    disableWebAudio: true,
  },
};

// Initialize game instance
new Phaser.Game(config);
