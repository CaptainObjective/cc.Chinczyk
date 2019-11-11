import Player from './Player';
import Dice from './Dice';

export const colors = ['green', 'red', 'blue', 'yellow'];

class Game {
  constructor(numberOfPlayers) {
    this.players = [];
    this.numberOfPlayers = numberOfPlayers;

    for (let i = 0; i < numberOfPlayers; i++) {
      this.players.push(new Player(`Gracz ${i}`, colors[i], i * 10));
    }
    this.currentPlayerIndex = 0;

    this.registerListeners();
  }

  makeMove() {
    let diceRoll = 0;
    // this.players[this.currentPlayerIndex].move(diceRoll);
    do {
      diceRoll = Dice.throwDice();
      this.players[this.currentPlayerIndex].move(diceRoll);
    } while (diceRoll === 6);
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
