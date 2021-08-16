import { connect, play } from './Networking';
import { startGameDraw, stopGameDraw } from './Draw';
import { startCapturingInput, stopCapturingInput } from './Input';
import { downloadAssets } from './AssetLoader';
import { initState } from './State';
import { hideLeaderboard } from './Leaderboard';
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
    play(usernameInput.value);
    playMenu.classList.add('hidden');
    initState();
    startCapturingInput();
    startGameDraw();
    hideLeaderboard(false);
    Chat.prototype.setChatHidden(false);
  };
}).catch(console.error);

function onGameOver() {
  stopCapturingInput();
  stopGameDraw();
  playMenu.classList.remove('hidden');
}
