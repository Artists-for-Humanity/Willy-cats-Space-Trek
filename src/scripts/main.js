import Phaser from 'phaser';
import MenuScene from './Scenes/MenuScene';
import BunkerScene from './Scenes/BunkerScene';
// import BossScene from './Scenes/BossScene';
import GlobalState from './GlobalState';
import TutorialScene from './Scenes/TutorialScene';
import GameRule from './GameRule';
import MapScene from './Scenes/MapScene';
import LevelClear from './Scenes/LevelClear';
import GameOver from './Scenes/gameOver';
import ShopScene from './Scenes/ShopScene';
import EndlessScene from './Scenes/EndlessScene';

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
      debug: false,
    },
  },
  scene: [MenuScene, BunkerScene, TutorialScene, LevelClear, GameOver, MapScene, ShopScene, EndlessScene],
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
      start: false,
      mapping: 'globalState'
    }
    ],
  },
};

// Initialize game instance
new Phaser.Game(config);