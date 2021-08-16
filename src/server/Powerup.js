const Constants = require('../lib/Constants')
const Utils = require('../lib/Utils')

class Powerup {
  constructor (type, data, duration, x, y) {
    this.type = type
    this.data = data
    this.duration = duration
    this.x = x
    this.y = y
    this.destroyed = false
  }

  create () {
    const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5)
    const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5)
    //рандомный выбор типа паверапа
    const type = Utils.choiceArray(Constants.POWERUP_KEYS)
    const dataRanges = Constants.POWERUP_DATA[type]
    let data = null

    switch (type) {
      case Constants.POWERUP_HEALTHPACK:
        data = Utils.randRangeInt(dataRanges.MIN, dataRanges.MAX + 1)
        break
      case Constants.POWERUP_SHIELD:
        data = Utils.randRangeInt(dataRanges.MIN, dataRanges.MAX + 1)
        break
    }
    const duration = Utils.randRange(
      Constants.POWERUP_MIN_DURATION, Constants.POWERUP_MAX_DURATION)

    return new Powerup(type, data, duration, x, y)
  }
}

module.exports = Powerup

// при коллизии танка и паверапа, исходя из типа и нагрузки(data) последнего,
// игрок получает какой либо апгрейд
