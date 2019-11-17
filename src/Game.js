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
    const asianWiggle1 = document.querySelector('#facebox');
    asianWiggle1.style.transform = "scaleX(-1)";
    this.diceResult = rollValue();
    this.popUpPlayer(`Wyrzuciłeś ${this.diceResult}`)
    console.log(`--> wynik rzutu kostką: ${this.diceResult}`);
    document.querySelector('#throwDice').disabled = true;
    document.querySelector('#pawnMove').disabled = false;
  }

  //metoda do ruszania pionka
  makeMove() {
    const asianWiggle2 = document.querySelector('#facebox');
    asianWiggle2.style.transform = "scaleX(1)";
    //jeżeli gracz nie wskazał pionka to czekamy, aż wskaże pionka
    if (!this.players[this.currentPlayerIndex].move(this.diceResult, this.fields)) {
      return;
    }

    // gracz ma dodatkowy rzut, gdy wypadnie 6
    if (this.diceResult === 6) {
      this.popUpPlayer(`Brawo dodatkowy rzut kostką!`, 'right');
      console.log('Brawo! Dodatkowy rzut kostką')
      document.querySelector('#throwDice').disabled = false;
      document.querySelector('#pawnMove').disabled = true;
      return;
    }

    // wszyscy pionki w domku, możliwość trzech rzutów
    if (this.players[this.currentPlayerIndex].isAllHome()) {
      if (this.counter > 0) {
        this.popUpPlayer(`Dodatkowy rzut!`, 'right');
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
    this.popUpPlayer(`Kolej gracza ${this.players[this.currentPlayerIndex].color}`, 'center');
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

  popUpPlayer(text, position) {
    Toastify({
      text: text,
      duration: 2000,
      newWindow: true,
      gravity: 'center',
      position: position,
      backgroundColor: this.players[this.currentPlayerIndex].color,
      stopOnFocus: true,
    }).showToast();
  }


}

export default Game;


