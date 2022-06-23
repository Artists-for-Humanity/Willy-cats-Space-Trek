import * as __SNOWPACK_ENV__ from '../../snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

export const preloadLevelImages = (load) => {
  load.image('level-1-background', new URL('../../assets/LevelOne.png', import.meta.url).href);
  load.image('border', new URL('../../assets/Hborder.png', import.meta.url).href);
  load.image('projectile', new URL('../../assets/projectile.png', import.meta.url).href);
  load.image('bomb', new URL('../../assets/Bomb_Icon.png', import.meta.url).href);
  load.image('speed', new URL('../../assets/Boots.png', import.meta.url).href);
  load.image('eff', new URL('../../assets/Shield_Icon.png', import.meta.url).href);
  load.image('bleed', new URL('../../assets/Bleed.png', import.meta.url).href);
  load.image('heals', new URL('../../assets/Bandage.png', import.meta.url).href);
};
