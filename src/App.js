import zombie from './sounds/zombie.mp3';
import skeleton from './sounds/skeleton.mp3';
import creeper from './sounds/creeper.mp3';
import Entity from './Entity';
export default class App {
  constructor(entities) {
    this.entities = entities;
    this.score = 0;
    this.setSounds();
    this.start();
  }
  start() {
    this.gameInterval = setInterval(() => {
      const container =
        this.entities[Math.floor(Math.random() * this.entities.length)];
      const type = this.randomType;
      const entity = new Entity(container, type, this.sounds[type]);
      this.awaitDamage(entity);
    }, 5000);
  }

  async awaitDamage(entity) {
    entity.damaged.then(() => {
      this.reset(entity.container);
      this.score++;
      this.scoreUpdate();
    }).catch(() => {
      this.reset(entity.container);
      this.healthDecrease();
    })
  }

  setSounds() {
    this.sounds = {
      zombie: new Audio(zombie),
      creeper: new Audio(creeper),
      skeleton: new Audio(skeleton),
    };
  }

  get randomType() {
    if (Math.random() < 0.05) {
      return 'creeper';
    }
    if (Math.random() < 0.1) {
      return 'skeleton';
    }
    return 'zombie';
  }

  reset(entity) {
    entity.className = entity.className.split(' ').slice(0, 2).join(' ');
  }

  scoreUpdate() {
    const scoreContainer = document.querySelector('#sign-number');
    scoreContainer.textContent = this.score;
  }

  healthDecrease() {
    const firstHeart = document.querySelector('.heart');
    if (!firstHeart) clearInterval(this.gameInterval);
    firstHeart.remove();
  }
}
