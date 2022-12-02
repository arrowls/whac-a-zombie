import zombie from './sounds/zombie.mp3';
import skeleton from './sounds/skeleton.mp3';
import creeper from './sounds/creeper.mp3';




export default class App {
  constructor(entities) {
    this.entities = entities;
    this.setSounds();
    this.start();
  }
  start() {
    setInterval(() => {
      const entity = this.entities[Math.floor(Math.random() * this.entities.length)];
      const type = this.randomType;
      const animation = entity.animate([
        {transform: 'translateY(100px)'},
        {transform: 'translateY(0)'}
      ], 1000);
      entity.classList.add(type);
      this.sounds[type].play();
      animation.finished.then(() => entity.classList.add('wonky'));

      entity.addEventListener('click', () => {
        this.reset(entity);
      })
    }, 5000)
  }

  setSounds() {
    this.sounds = {
      zombie: new Audio(zombie),
      creeper: new Audio(creeper),
      skeleton: new Audio(skeleton),
    }
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
}