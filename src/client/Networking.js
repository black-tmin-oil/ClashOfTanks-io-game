//client server connection

import io from 'socket.io-client';
import { processGameUpdate } from './State';

import Constants from '../lib/Constants';
import Chat from './Chat';


const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });

const connected = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});

export const connect = onGameOver => (
  connected.then(() => {
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

export const updateDirection = (dir) => {
  socket.emit(Constants.MSG_TYPES.INPUT, dir);
};

// export const updateShoot = (dir) => {
//   socket.emit(Constants.MSG_TYPES.SHOOT, dir);
// };





