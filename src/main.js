import Game from './Game';

const startGame = (numberOfPlayers = 2) => {
  new Game(numberOfPlayers);
};

window.addEventListener('load', () => startGame());
