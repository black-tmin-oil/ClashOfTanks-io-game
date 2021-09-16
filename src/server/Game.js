//The main logic of the game on the server. Simulation of the game
const Constants = require('../lib/Constants');
const Player = require('./Player');
const Powerup = require('./Powerup');
const Utils = require('../lib/Utils');

class Game {
  constructor() {
    this.powerups = [];
    this.sockets = {};
    this.players = {};
    this.bullets = [];
    this.lastUpdateTime = Date.now();
    this.shouldSendUpdate = false;
    setInterval(this.update.bind(this), 1000 / 60);
  }
  getPlayerNameBySocketId(socketID) {
    return this.players[socketID].username
  }
  addPlayer(socket, username) {
    this.sockets[socket.id] = socket;

    // The initial random position of the player 
    const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    this.players[socket.id] = new Player(socket.id, username, x, y);
  }

  removePlayer(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }

  handleInput(socket, dir) {
    if (this.players[socket.id]) {
      this.players[socket.id].setDirection(dir);
    }
  }

  // handleShoot(socket, e) {
  //   if (this.players[socket.id]) {
  //     this.players[socket.id].fire();
  //     //console.log(this.players[socket.id].fire())
  //   }
  // }

  update() {
    // Calculate time elapsed
    const now = Date.now();
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = now;

    //update each bullet
    const bulletsToRemove = [];
    this.bullets.forEach(bullet => {
      if (bullet.update(dt)) {
        bulletsToRemove.push(bullet);
      }
    });
    this.bullets = this.bullets.filter(bullet => !bulletsToRemove.includes(bullet));

    //update each player
    Object.keys(this.sockets).forEach(playerID => {
      const player = this.players[playerID];
      const newBullet = player.update(dt);
      if (newBullet) {
        this.bullets.push(newBullet);
      }
      // const newBullet = player.fire();
      // if (newBullet) {
      //   this.bullets.push(newBullet);
      // }
    });


    //player-bullet collision
    const destroyedBullets = Utils.bulletCollisions(Object.values(this.players), this.bullets);
    destroyedBullets.forEach(b => {
      if (this.players[b.parentID]) {
        this.players[b.parentID].onCreateDamage();
      }
    });
    this.bullets = this.bullets.filter(bullet => !destroyedBullets.includes(bullet));
    
    //player-powerup collision
    const destroyedPowerups = Utils.powerupCollisions(Object.values(this.players), this.powerups)
    this.powerups = this.powerups.filter(powerup => !destroyedPowerups.includes(powerup))

    //update powerups on canvas
    while (this.powerups.length < Constants.POWERUP_MAX_COUNT) {
      this.powerups.push(Powerup.prototype.create())
    }
    // Check if anyone was killed 
    Object.keys(this.sockets).forEach(playerID => {
      const socket = this.sockets[playerID];
      const player = this.players[playerID];
      if (player.hp <= 0) {
        socket.emit(Constants.MSG_TYPES.GAME_OVER);
        this.removePlayer(socket);
      }
    });

    // send a game update to each player
    if (this.shouldSendUpdate) {
      const leaderboard = this.getLeaderboard();
      Object.keys(this.sockets).forEach(playerID => {
        const socket = this.sockets[playerID];
        const player = this.players[playerID];
        socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player, leaderboard));
      });
      this.shouldSendUpdate = false;
    } else {
      this.shouldSendUpdate = true;
    }
  }

  getLeaderboard() {
    return Object.values(this.players)
      .sort((p1, p2) => p2.score - p1.score)
      .slice(0, 5)
      .map(p => ({ username: p.username, score: Math.round(p.score) }));
  }

  createUpdate(player, leaderboard) {
    const nearbyPlayers = Object.values(this.players).filter(
      p => p !== player && p.distanceTo(player) <= Constants.MAP_SIZE / 2,
    );
    const nearbyBullets = this.bullets.filter(
      b => b.distanceTo(player) <= Constants.MAP_SIZE / 2,
    );

    return {
      t: Date.now(),
      me: player.serializeForUpdate(),
      others: nearbyPlayers.map(p => p.serializeForUpdate()),
      bullets: nearbyBullets.map(b => b.serializeForUpdate()),
      powerups: this.powerups,
      leaderboard,
    };
  }
}

module.exports = Game;
