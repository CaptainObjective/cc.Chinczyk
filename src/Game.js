import Player from './Player';
import Dice from './Dice';
import Field from './Field';

export const colors = ['green', 'red', 'blue', 'yellow'];

class Game {
  constructor(numberOfPlayers) {
    this.players = [];
    this.numberOfPlayers = numberOfPlayers;

    for (let i = 0; i < numberOfPlayers; i++) {
      this.players.push(new Player(`Gracz ${i}`, colors[i], i * 10));
    }
    this.currentPlayerIndex = 0;

    this.fields = [];
    for (let i = 0; i < 40; i++) {
      this.fields.push(new Field(i));
    }

    this.registerListeners();
  }

  makeMove() {
    let diceRoll = 0;
    let counter = 2;
    let allowThrowDice = false;

    // gracz ma dodatkowy rzut, gdy wypadnie 6
    do {
      allowThrowDice = false;
      diceRoll = Dice.throwDice();
      this.players[this.currentPlayerIndex].move(diceRoll, this.fields);

      // gracz w bazie ma trzy rzuty, aby wyjść
      if (this.players[this.currentPlayerIndex].isAllHome()) {
        if (counter > 0) {
          allowThrowDice = true;
          counter--;
          console.log('kolejna próba wyjścia z bazy');
        }
      }
    } while (diceRoll === 6 || allowThrowDice);
    console.log('zmiana gracza');
    this.switchToNextPlayer();
  }

  switchToNextPlayer() {
    this.currentPlayerIndex++;
    if (this.currentPlayerIndex === this.numberOfPlayers) this.currentPlayerIndex = 0;
  }

  registerListeners() {
    const throwDiceButton = document.querySelector('#throwDice');
    throwDiceButton.addEventListener('click', () => this.makeMove());
  }
}

export default Game;
