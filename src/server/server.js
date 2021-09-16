const express = require('express');
const webpack = require('webpack');
//Use webpack-dev-middleware to automatically rebuild development bundles
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');

const Constants = require('../lib/Constants');
const Game = require('./Game');
const webpackConfig = require('../../webpack.dev.js');

const app = express();
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
  // Setup Webpack for development
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve the dist/ folder in production which is where Webpack will write our files after a production build.
  app.use(express.static('dist'));
}

const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);


const io = socketio(server);

io.on('connection', socket => {
  console.log('Player connected!', socket.id);

  socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  socket.on(Constants.MSG_TYPES.INPUT, handleInput);

  // socket.on(Constants.MSG_TYPES.SHOOT, handleShoot);

  socket.on(Constants.SOCKET_CHAT_CLIENT_SERVER, data => {
    io.sockets.emit(Constants.SOCKET_CHAT_SERVER_CLIENT, {
      username: game.getPlayerNameBySocketId(socket.id),
      message: data
    })
  })
  socket.on('disconnect', onDisconnect);
});

const game = new Game();

function joinGame(username) {
  game.addPlayer(this, username);
}

function handleInput(dir) {
  game.handleInput(this, dir);
}

// function handleShoot(e) {
//   game.handleShoot(this, e);
//   console.log(e)
// }
function onDisconnect() {
  game.removePlayer(this);
}
