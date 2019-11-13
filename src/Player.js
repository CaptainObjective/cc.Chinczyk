
import Pawn from './Pawn';

class Player {
  constructor(name, color, startPos) {
    this.name = name;
    this.color = color;
    this.startPos = startPos;
    //przechowuje informację o wybranym pionku
    this.selectedPawn = 0;
    this.pawns = [];
    this.homeDiv = document.querySelector(`#home-area-${this.color}`);
    
    //dodawanie id oraz Callback do tworzenia eventListener dla pionka
    for (let i = 0; i < 4; i++) {
      this.pawns.push(new Pawn(color, i));
    }
    this.renderHome();
  }

  renderHome() {
    this.homeDiv.innerHTML = '';
    this.pawns.map(pawn => {
      (pawn.isHome()) && this.homeDiv.appendChild(pawn.render());
    pawn.myCallback();
    });
  }

  // znajdujemy pionki, które są w grze//
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

  move(diceRoll) {
    const pawnToMove = this.getPawn();
    console.log("Kolej gracza: " + this.color);
    console.log("wyrzuciles: " + diceRoll);
    console.log("ruvh pionkiem: " + pawnToMove.id);

    if (pawnToMove.isOnMap()) {
      pawnToMove.move(diceRoll, pawnToMove.position);
      // this.addPawnListener();
    } else {
      this.leaveHome(diceRoll, pawnToMove);
      // this.addPawnListener();
    }
  }

  leaveHome(diceRoll, pawnToMove) {
    if (pawnToMove.isHome()) {
      if (diceRoll == 6 || diceRoll == 1) {
        pawnToMove.move(0, this.startPos);
        pawnToMove.setOnMap();
        console.log('start pionka');
      }
    }
    this.renderHome();
  }

}

export default Player;
