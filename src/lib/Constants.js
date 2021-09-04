//глобальные константы для клиента и сервера
module.exports = {
  PLAYER_RADIUS: 60,
  PLAYER_MAX_HP: 100,
  PLAYER_SPEED: 400,
  PLAYER_FIRE_COOLDOWN: 0.25,
  PLAYER_DEFAULT_HITBOX_SIZE: 20,
  PLAYER_SHIELD_HITBOX_SIZE: 45,

  BULLET_RADIUS: 3,
  BULLET_SPEED: 800,
  BULLET_DAMAGE: 10,

  SCORE_BULLET_HIT: 20,
  SCORE_PER_SECOND: 1,
  
  SOCKET_CHAT_CLIENT_SERVER: 'chat-client-to-server',
  SOCKET_CHAT_SERVER_CLIENT: 'chat-server-to-client',
  POWERUP_HITBOX_SIZE: 5,
  POWERUP_MAX_COUNT: 20,
  POWERUP_MIN_DURATION: 5000,
  POWERUP_MAX_DURATION: 15000,
  POWERUP_HEALTHPACK: 'healthpack',
  POWERUP_SHIELD: 'shield',
  POWERUP_KEYS: [
    'healthpack',
    'shield'
  ],
  POWERUP_DATA: {
    healthpack: { MIN: 40, MAX: 60 },
    shield: { MIN: 1, MAX: 4 }
  },
  MAP_SIZE: 3000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
  },
};