//менеджер загрузки ассетов перед игорой  Asset loader подглядено в mozilla MDN
const ASSET_NAMES = [
  'tank.png',
  'bullet.svg',
  'tile.png',
  'powerup.png',
  'shield.png',
  'pickups.png'
];

const assets = {};

const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

function downloadAsset(assetName) {
  return new Promise(resolve => {
    const asset = new Image();
    asset.onload = () => {
      console.log(`Downloaded ${assetName}`);
      assets[assetName] = asset;
      resolve();
    };
    asset.src = `/assets/${assetName}`;
  });
}

export const downloadAssets = () => downloadPromise;

export const getAsset = assetName => assets[assetName];
