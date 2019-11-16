import Player from './Player';
import Field from './Field';
import { rollValue } from './Dice'
import Toastify from 'toastify-js'

export const colors = ['green', 'red', 'blue', 'yellow'];

class Game {
  constructor(numberOfPlayers) {
    this.players = [];
    this.numberOfPlayers = numberOfPlayers;
    this.diceResult = 0;
    this.counter = 2;
    for (let i = 0; i < numberOfPlayers; i++) {
      this.players.push(new Player(`Gracz ${i}`, colors[i], i * 10));
    }
    this.fields = [];
    for (let i = 0; i < 40; i++) {
      this.fields.push(new Field(i));
    }    

    this.currentPlayerIndex = -1;
    this.switchToNextPlayer();
    this.registerListeners();
    this.toMovePawn();
  }

  //metoda do rzucania kostką
  makeThrow() {
    this.diceResult = rollValue();
    this.popUpPlayer(this.popUpText = `Wyrzuciłeś ${this.diceResult}`)
    console.log(`--> wynik rzutu kostką: ${this.diceResult}`);
    document.querySelector('#throwDice').disabled = true;
    document.querySelector('#pawnMove').disabled = false;
  }

  //metoda do ruszania pionka
  makeMove() {
    //jeżeli gracz nie wskazał pionka to czekamy, aż wskarze pionka
    if (!this.players[this.currentPlayerIndex].move(this.diceResult, this.fields)) {
      return;
    }

    // gracz ma dodatkowy rzut, gdy wypadnie 6
    if (this.diceResult === 6) {
      this.popUpPlayer(this.popUpText = `Brawo dodatkowy rzut kostką!`);
      console.log('Brawo! Dodatkowy rzut kostką')
      document.querySelector('#throwDice').disabled = false;
      document.querySelector('#pawnMove').disabled = true;
      return;
    }

    // wszyscy pionki w domku, możliwość trzech rzutów
    if (this.players[this.currentPlayerIndex].isAllHome()) {
      if (this.counter > 0) {
        this.popUpPlayer(this.popUpText = `Masz dodatkowy rzut, aby wyjść z domku`);
        console.log(`Masz dodatkowy rzut, aby wyjść z domku`);
        this.counter--;
        document.querySelector('#throwDice').disabled = false;
        document.querySelector('#pawnMove').disabled = true;
        return;
      }
    }

    //wszystko ok, zmieniamy gracza
    this.switchToNextPlayer();
    document.querySelector('#throwDice').disabled = false;
    document.querySelector('#pawnMove').disabled = true;
  }

  //restartuje counter do pierwotnej wartości
  switchToNextPlayer() {
    this.currentPlayerIndex++;
    if (this.currentPlayerIndex == this.numberOfPlayers) this.currentPlayerIndex = 0;
    console.log(`----> kolej gracza: ${this.players[this.currentPlayerIndex].color}`)
    this.counter = 2;
  }
  //przycisk tylko do rzutu kostką
  registerListeners() {
    const throwDiceButton = document.querySelector('#throwDice');
    throwDiceButton.disabled = false;
    throwDiceButton.addEventListener('click', () => this.makeThrow());
  }
  //dodanie przycisku do przesuwania
  toMovePawn() {
    const pawnMove = document.querySelector('#pawnMove');
    pawnMove.disabled = true;
    pawnMove.addEventListener('click', () => {
      this.makeMove();
    });
  }

  popUpPlayer(popUpText) {
    Toastify({
      text: popUpText,
      duration: 2500,
      newWindow: true,
      gravity: "top", 
      position: 'right',
      backgroundColor: this.players[this.currentPlayerIndex].color,
      stopOnFocus: true,
    }).showToast();
  }


}

export default Game;


