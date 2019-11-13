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

  // makeMove() {
  makeThrow() {
    let diceRoll = 0;
    let counter = 2;
    let allowThrowDice = false;

    // gracz ma dodatkowy rzut, gdy wypadnie 6
    do {
      allowThrowDice = false;
      diceRoll = Dice.throwDice();
      this.players[this.currentPlayerIndex].move(diceRoll);

      console.log(`wyrzuciłeś ${diceRoll}`);
      // gracz w bazie ma trzy rzuty, aby wyjść
      if (this.players[this.currentPlayerIndex].isAllHome()) {
        if (counter > 0) {
          allowThrowDice = true;
          counter--;
          console.log('kolejna próba wyjścia z bazy')
        }
      }
    } while (diceRoll === 6 || allowThrowDice);
    // return diceRoll;
    this.switchToNextPlayer();
  }

  // makeMove(pawnToMove, diceRoll) {
      // this.players[this.currentPlayerIndex].move(diceRoll);

    // this.switchToNextPlayer();

  // }

  switchToNextPlayer() {
    this.currentPlayerIndex++;
    if (this.currentPlayerIndex === this.numberOfPlayers) this.currentPlayerIndex = 0;
  }
//przycisk tylko do rzutu kostką
  registerListeners() {
    const throwDiceButton = document.querySelector('#throwDice');
    throwDiceButton.addEventListener('click', () => this.makeThrow());
  }
//dodanie przycisku do przesuwania
  toMovePown() {
    const pawnMove = document.querySelector('#pawnMove');
    pawnMove.addEventListener('click', () => 
    this.makeMove())
  }
}

export default Game;
