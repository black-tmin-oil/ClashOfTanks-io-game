//файл содержит вспомогательные функции используемые на клиенте и сервере
const Constants = require('./Constants')

//возвращает рандомный элемент из массива
const choiceArray = array => {
  return array[randRangeInt(0, array.length)]
}

const bulletCollisions = (players, bullets) => {
  const destroyedBullets = []
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < players.length; j++) {
      const bullet = bullets[i]
      const player = players[j]
      if (
        bullet.parentID !== player.id &&
        player.distanceTo(bullet) <= Constants.PLAYER_RADIUS + Constants.BULLET_RADIUS
      ) {
        destroyedBullets.push(bullet)
        player.healthDamage()
        break
      }
    }
  }
  return destroyedBullets
}

//нарушен принцип DRY. потом исправлю
const powerupCollisions = (players, powerups) => {
  const destroyedPowerups = []
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < powerups.length; j++) {
      const player = players[i]
      const powerup = powerups[j]
      if (player.distanceTo(powerup) <= Constants.PLAYER_RADIUS + Constants.POWERUP_HITBOX_SIZE) {
        destroyedPowerups.push(powerup)
        powerup.destroyed = true
        player.applyPowerup(powerup)
        break
      }  
    }
  }
  return destroyedPowerups
}

const randRange = (min, max) => {
  if (min >= max) {
    return Math.random() * (min - max) + max
  }
  return Math.random() * (max - min) + min
}

const randRangeInt = (min, max) => {
  if (min > max) {
    return Math.floor(Math.random() * (min - max)) + max
  }
  return Math.floor(Math.random() * (max - min)) + min
}

module.exports = {
  bulletCollisions,
  choiceArray,
  powerupCollisions,
  randRange,
  randRangeInt
}
