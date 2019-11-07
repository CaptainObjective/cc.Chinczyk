import Game from './Game';

const startGame = (numberOfPlayers = 4) => {
  new Game(numberOfPlayers);
};

window.addEventListener('load', () => startGame());
