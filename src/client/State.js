//примитивная реализация обновления состояния на клиенте без учета так называймого игрового лага 
//что приводит к редким задержкам игры на несколько милисекунд
//дабы избежать этого нужно реализовать так наз игровой буфер. позже.
import { updateLeaderboard } from './Leaderboard';

let lastGameUpdate = 0;

export function initState() {
  lastGameUpdate = 0
}

export function processGameUpdate(update) {
  lastGameUpdate = update;
  updateLeaderboard(update.leaderboard);
}

export function getCurrentState() {
  return lastGameUpdate;
}