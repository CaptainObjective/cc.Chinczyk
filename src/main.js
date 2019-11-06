import Game from './Game';

const startGame = () => {
  new Game(4);
  console.log('Game has begun');
};

window.addEventListener('load', startGame);
