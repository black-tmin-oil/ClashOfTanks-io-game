import Entity from '../lib/Entity';
import Bullet from './Bullet';
import Constants from '../lib/Constants';

class Player extends Entity {
  constructor(id, username, x, y) {
    super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
    this.username = username;
    this.hp = Constants.PLAYER_MAX_HP;
    this.fireCooldown = 0;
    this.score = 0;
    this.hitboxSize = Constants.PLAYER_DEFAULT_HITBOX_SIZE;
    this.powerups = {};
    this.explosion = false;
  }
  
  update(dt) {
    super.update(dt);
    this.score += dt * Constants.SCORE_PER_SECOND;

    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    this.updatePowerups()
    
    this.fireCooldown -= dt;
    if (this.fireCooldown <= 0) {
      this.fireCooldown += Constants.PLAYER_FIRE_COOLDOWN;
      return new Bullet(this.id, this.x, this.y, this.direction);
    }

    return null;
  }
  // fire() {
  //   return new Bullet(this.id, this.x, this.y, null)
  // }
  updatePowerups () {
    for (const type of Constants.POWERUP_KEYS) {
      const powerup = this.powerups[type]
      if (!powerup) {
        continue
      }
      switch (type) {
        case Constants.POWERUP_HEALTHPACK:
          this.hp = Math.min(
            this.hp + powerup.data, Constants.PLAYER_MAX_HP)
          this.powerups[type] = null
          break
        case Constants.POWERUP_SHIELD:
          this.hitboxSize = Constants.PLAYER_SHIELD_HITBOX_SIZE
          if (powerup.data <= 0) {
            this.powerups[type] = null
            this.hitboxSize = Constants.PLAYER_DEFAULT_HITBOX_SIZE
          }
          break
      }
    }
  }

  applyPowerup (powerup) {
    this.powerups[powerup.type] = powerup
  }
  healthDamage() {
    this.hp -= Constants.BULLET_DAMAGE;
    //--------------------
    this.explosion = true;
  }

  onCreateDamage() {
    this.score += Constants.SCORE_BULLET_HIT;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      hp: this.hp,
      username: this.username,
      powerups: this.powerups,
      explosion: this.explosion,
      score: this.score,
    };
  }
}

export default Player;
