import Phaser from 'phaser';
import MenuScene from './Scenes/MenuScene';
import BunkerScene from './Scenes/BunkerScene';
//import MapScene from './Scenes/MapScene';
// import BossScene from './Scenes/BossScene';
import TutorialScene from './Scenes/TutorialScene';
import GameRule from './GameRule';
import BunkerScene from './Scenes/BunkerScene';
import MapScene from './Scenes/MapScene';
// Set configuration for phaser game instance
const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,

  // Add physics, arcade, scene, and audio
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
      },
      debug: false,
    },
  },
  scene: [MenuScene, BunkerScene, TutorialScene, MapScene],
  audio: {
    disableWebAudio: true,
  },
  Plugins: {
    global: [{ key: 'GameRule', plugin: GameRule, start: false, mapping: 'GameRule'}],
    },
  };

// Initialize game instance
new Phaser.Game(config);