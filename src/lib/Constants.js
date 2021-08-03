//глобальные константы для клиента и сервера
module.exports = {
  PLAYER_RADIUS: 60,
  PLAYER_MAX_HP: 100,
  PLAYER_SPEED: 400,
  PLAYER_FIRE_COOLDOWN: 0.25,

  BULLET_RADIUS: 3,
  BULLET_SPEED: 800,
  BULLET_DAMAGE: 10,

  SCORE_BULLET_HIT: 20,
  SCORE_PER_SECOND: 1,
  
  SOCKET_CHAT_CLIENT_SERVER: 'chat-client-to-server',
  SOCKET_CHAT_SERVER_CLIENT: 'chat-server-to-client',
  
  MAP_SIZE: 3000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
  },
};