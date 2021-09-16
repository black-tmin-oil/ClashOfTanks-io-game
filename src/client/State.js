// Primitive implementation of the status update on the client, excluding so-called game lag
// that may lead to rare game delays for a few milisec
// In order to avoid this, it is necessary to implement a game buffer. later. 

import { updateLeaderboard } from './Leaderboard';
import { save } from './Statistic';
let lastGameUpdate = 0;

export function initState() {
  lastGameUpdate = 0
}

export function processGameUpdate(update) {
  lastGameUpdate = update;
  updateLeaderboard(update.leaderboard);
  save(update.me)
}

export function getCurrentState() {
  return lastGameUpdate;
}