//общение с сервером

import io from 'socket.io-client';
import { processGameUpdate } from './State';

const Constants = require('../lib/Constants');
const Chat = require('./Chat')


const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });
const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});

export const connect = onGameOver => (
  connectedPromise.then(() => {
    // Register callbacks
    socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    Chat.create(socket, 'chat', 'chat-input')
    socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);
    socket.on('disconnect', () => {
      document.getElementById('disconnect-modal').classList.remove('hidden');
      document.getElementById('reconnect-button').onclick = () => {
        window.location.reload();
      };
    });
  })
);

export const play = username => {
  socket.emit(Constants.MSG_TYPES.JOIN_GAME, username);
};
//takes care of messaging the server, which handles the input event and updates the game state accordingly.
export const updateDirection = (dir) => {
  socket.emit(Constants.MSG_TYPES.INPUT, dir);
};





