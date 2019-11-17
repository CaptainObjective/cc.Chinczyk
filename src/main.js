import Game from './Game';

const numberOfPlayers = document.getElementById('numbers');

//ustawianie liczby graczy
function startGame() {
  let players = 0;
  document.querySelector('.pop-up').style.display = 'none';
  if(numberOfPlayers.value == 1 || numberOfPlayers.value == '') {
    players = 2;
  } else {
    players = numberOfPlayers.value
  }
  new Game(players);
};

document.getElementById('startGame').onclick = startGame;