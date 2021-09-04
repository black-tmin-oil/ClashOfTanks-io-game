import { debounce } from 'throttle-debounce';
import { getAsset } from './AssetLoader';
import { getCurrentState } from './State';

const Constants = require('../lib/Constants');

const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants;

//создание контекста canvas
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

setCanvasDimensions();

//взято с mozilla mdn
function setCanvasDimensions() {
  // On small screens (e.g. phones), "zooming out" so players can still see at least
  // 800 in-game units of width.
  const scaleRatio = Math.max(1, 800 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}

window.addEventListener('resize', debounce(40, setCanvasDimensions));

function render() {
  const { me, others, bullets, powerups} = getCurrentState();
  if (!me) {
    return;
  }

  renderBackground(me.x, me.y);

  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

  powerups.forEach(p => renderPowerups(me, p));

  bullets.forEach(renderBullet.bind(null, me));

  renderPlayer(me, me);
  others.forEach(renderPlayer.bind(null, me));

  //renderExplosion(me, me)
}

function renderBackground(x, y) {
  context.fillStyle = '#7a7a52';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// отрисовка танка на заданной координате
function renderPlayer(me, player) {
  const { x, y, direction, username, powerups } = player;
  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;
  context.save();
  context.translate(canvasX, canvasY);

  context.textAlign = 'center';
  context.font = '14px Helvetica';
  context.fillStyle = 'black';
  context.fillText(username || 'Guest', 0, -60)
  
  context.shadowColor = 'black';
  context.shadowBlur = 40;
  context.shadowOffsetX = 40;
  context.shadowOffsetY = 20;
  context.fill();

  context.rotate(direction);
  context.drawImage(
    getAsset('tank.png'),
    -PLAYER_RADIUS,
    -PLAYER_RADIUS,
    PLAYER_RADIUS * 2,
    PLAYER_RADIUS * 2,
  );
  if (powerups[Constants.POWERUP_SHIELD]) {
    context.drawImage(
      getAsset('shield.png'),
      -PLAYER_RADIUS-10,
      -PLAYER_RADIUS-5,
      PLAYER_RADIUS * 2.5,
      PLAYER_RADIUS * 2.5,
    );
  }
  context.restore();

  context.fillStyle = 'white';
  context.fillRect(
    canvasX - PLAYER_RADIUS,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2,
    2,
  );
  context.fillStyle = 'red';
  context.fillRect(
    canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP),
    2,
  );
  
}

// function renderExplosion(me, player) {
//   const {explosion} = player;
//   const x = MAP_SIZE * (0.25 + Math.random() * 0.5)
//   const y = MAP_SIZE * (0.25 + Math.random() * 0.5)
//   const canvasX = canvas.width / 2 + x - me.x
//   const canvasY = canvas.height / 2 + y - me.y
//   if(explosion) {
//     context.drawImage(getAsset('explosion.png'), canvasX, canvasY);
//   }

// }
function renderBullet(me, bullet) {
  const { x, y } = bullet;
  context.drawImage(
    getAsset('bullet.svg'),
    canvas.width / 2 + x - me.x - BULLET_RADIUS,
    canvas.height / 2 + y - me.y - BULLET_RADIUS,
    BULLET_RADIUS * 2,
    BULLET_RADIUS * 2,
  );
}


function renderPowerups(me,powerups) {
  const {x, y} = powerups
  const canvasX = canvas.width / 2 + x - me.x
  const canvasY = canvas.height / 2 + y - me.y
  context.save()
  context.drawImage(getAsset('pickups.png'), canvasX, canvasY);
  context.restore()
}

function  drawMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  renderBackground(x, y);
}

let renderInterval = requestAnimationFrame(drawMenu, 1000 / 60);

//отвечает за отрисовку игры вместо меню
export function startGameDraw() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}

//наоборот
export function stopGameDraw() {
  clearInterval(renderInterval);
  renderInterval = setInterval(drawMenu, 1000 / 60);
}
