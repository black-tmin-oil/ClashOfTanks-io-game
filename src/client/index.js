import { connect, play } from './Networking';
import { startRendering, stopRendering, drawName } from './Draw';
import { startCapturingInput, stopCapturingInput } from './Input';
import { downloadAssets } from './AssetLoader';
import { initState } from './State';
import { setLeaderboardHidden } from './Leaderboard';
import './css/main.css';
const Chat = require('./Chat')

const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
const usernameInput = document.getElementById('username-input');

Promise.all([
  connect(onGameOver),
  downloadAssets(),
]).then(() => {
  playMenu.classList.remove('hidden');
  usernameInput.focus();
  playButton.onclick = () => {
    // Погнали!
    play(usernameInput.value);
    //пользую атрибуты дом для показа/скрытия меню уведамлений и др
    playMenu.classList.add('hidden');
    initState();
    startCapturingInput();
    startRendering();
    setLeaderboardHidden(false);
    //не самое лучшее решение
    Chat.prototype.setChatHidden(false);
  };
}).catch(console.error);

function onGameOver() {
  stopCapturingInput();
  stopRendering();
  playMenu.classList.remove('hidden');
}
