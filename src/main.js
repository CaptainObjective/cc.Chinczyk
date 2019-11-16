import Game from './Game';

let num = 0;

const playersNumber = () => {
  const numberOfPlayers = prompt(`Witamy w grze Chińczyk! Proszę wskazać liczbę graczy`, '');
  if (numberOfPlayers){
    num = numberOfPlayers;
  } else {
    num = 4;
  }
};
// 
window.addEventListener('load', () => playersNumber());

const startGame = (numberOfPlayers = num) => {
  new Game(numberOfPlayers);
};

window.addEventListener('load', () => startGame());