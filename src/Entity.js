export default class Entity {
  constructor(container, type, sound) {
    this.container = container;
    this.type = type;
    this.sound = sound;
    this.init();
  }

  init() {
    const animation = this.container.animate(
      [{ transform: 'translateY(100px)' }, { transform: 'translateY(0)' }],
      {
        duration: 500,
        fill: 'forwards',
      }
    );
    this.container.classList.add(this.type);
    this.sound.play();
    animation.finished.then(() => this.container.classList.add('wonky'));
  }

  get damaged() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.hide().finished.then(reject);
    
      }, 1500);
      this.container.addEventListener('click', () => {
        this.hide().finished.then(resolve)
      });
    });
  }

  hide() {
    return this.container.animate(
      [{ transform: 'translateY(0)' }, { transform: 'translateY(100px)' }],
      {
        duration: 300,
        fill: 'forwards',
      }
    );
  }
}
