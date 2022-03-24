import Phaser from 'phaser';
import MenuScene from './Scenes/MenuScene';
import BunkerScene from './Scenes/BunkerScene';
// import BossScene from './Scenes/BossScene';
import GlobalState from './GlobalState';
import TutorialScene from './Scenes/TutorialScene';
import GameRule from './GameRule';
import BunkerScene from './Scenes/BunkerScene';
import MapScene from './Scenes/MapScene';
import LevelClear from './Scenes/LevelClear';
import GameOver from './Scenes/gameOver';
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
      debug: true,
    },
  },
  scene: [MenuScene, BunkerScene, TutorialScene, LevelClear, GameOver, MapScene],
  audio: {
    disableWebAudio: true,
  },
  plugins: {
    global: [{
        key: 'GameRule',
        plugin: GameRule,
        start: false,
        mapping: 'GameRule'
      },
      {
        key: 'GlobalState',
        plugin: GlobalState,
        start: true,
        mapping: 'globalState'
      }
    ],
  },
};

// Initialize game instance
new Phaser.Game(config);