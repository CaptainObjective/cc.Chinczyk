
import Pawn from './Pawn';
import Toastify from 'toastify-js'

class Player {
  constructor(name, color, startPos) {
    this.name = name;
    this.color = color;
    this.startPos = startPos;
    this.pawns = [];
    this.homeDiv = document.querySelector(`#home-area-${this.color}`);

    //dodawanie numery id do tworzenia eventów dla pionka
    for (let i = 0; i < 4; i++) {
      this.pawns.push(new Pawn(color, i));
    }
    this.renderHome();
  }

  renderHome() {
    this.homeDiv.innerHTML = '';
    this.pawns.map(pawn => {
      (pawn.isHome()) && this.homeDiv.appendChild(pawn.render());
      //dodawanie eventu do pionków przy renderowaniu domu
      if (pawn.isHome())
        pawn.addListener();
    });
  }

  // znajdujemy pionki, które są w grze i które są zaznaczone//
  getPawn() {
    for (let i = 0; i < 4; i++) {
      if (!this.pawns[i].isFinished() && this.pawns[i].isSelected) {
        return this.pawns[i];
      }
    }
  }

  // zwraca TRUE, gdy wszystkie pionki gracza są w bazie
  isAllHome() {
    for (let pawn of this.pawns) {
      if (!pawn.isHome()) {
        return false;
      }
    }
    return true;
  }

  move(diceRoll, fields) {
    const pawnToMove = this.getPawn();

    //każemy graczowi wskazać pionek
    if (!pawnToMove) {
      console.log('Musisz wskazać pionka');
      return false;
    }

    if (pawnToMove.isOnMap()) {
      pawnToMove.move(diceRoll, pawnToMove.position, fields);
    } else {
      this.leaveHome(diceRoll, pawnToMove, fields);
    }
    console.log(`ruch pionkiem: ${pawnToMove.color + pawnToMove.num}`);

    //po ruchu odznaczamy pionki gracza
    this.unselectAll();
    return true;
  }

  leaveHome(diceRoll, pawnToMove, fields) {
    if (pawnToMove.isHome()) {
      if (diceRoll == 6) {
        pawnToMove.move(0, this.startPos, fields);
        pawnToMove.setOnMap();
        console.log('start pionka');
      } else {
        console.log('Musisz wyrzucic 6 by wyjsc z domku');
      }
    }
    this.renderHome();
  }

  //odznaczanie wszystkich pionków gracza na planszy
  unselectAll() {
    for (let pawn of this.pawns) {
      if (!pawn.isHome()) {
        pawn.unselect();
      }
    }
  }
  popUpHome(popUpText) {
    Toastify({
      text: popUpText,
      duration: 2500,
      newWindow: true,
      gravity: "top", 
      position: 'right',
      backgroundColor: this.color,
      stopOnFocus: true,
    }).showToast();
  }
}

export default Player;
