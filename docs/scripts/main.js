import Phaser from '../snowpack/pkg/phaser.js';
import MenuScene from './Scenes/MenuScene.js';
import BunkerScene from './Scenes/BunkerScene.js';
// import BossScene from './Scenes/BossScene';
import GlobalState from './GlobalState.js';
import TutorialScene from './Scenes/TutorialScene.js';
import GameRule from './GameRule.js';
import MapScene from './Scenes/MapScene.js';
import LevelClear from './Scenes/LevelClear.js';
import GameOver from './Scenes/gameOver.js';
import ShopScene from './Scenes/ShopScene.js';
import EndlessScene from './Scenes/EndlessScene.js';

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
  scene: [
    MenuScene,
    BunkerScene,
    TutorialScene,
    LevelClear,
    GameOver,
    MapScene,
    ShopScene,
    EndlessScene,
  ],
  audio: {
    disableWebAudio: true,
  },
  plugins: {
    global: [
      {
        key: 'GameRule',
        plugin: GameRule,
        start: false,
        mapping: 'GameRule',
      },
      {
        key: 'gS',
        plugin: GlobalState,
        start: false,
        mapping: 'gS',
      },
    ],
  },
};

// Initialize game instance
new Phaser.Game(config);
