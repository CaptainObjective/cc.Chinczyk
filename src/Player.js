import Pawn from './Pawn';

class Player {
  constructor(name, color, startPos) {
    this.name = name;
    this.color = color;
    this.startPos = startPos;
    this.pawns = [];
    this.homeDiv = document.querySelector(`#home-area-${this.color}`);

    for (let i = 0; i < 4; i++) {
      this.pawns.push(new Pawn(color, this.renderHome));
    }
    this.renderHome();
  }

  renderHome() {
    this.homeDiv.innerHTML = '';
    this.pawns.map(pawn => {
      pawn.isHome() && this.homeDiv.appendChild(pawn.render());
    });
  }

  // znajdujemy pionki, które są w grze//
  getPawn() {
    for (let i = 0; i < 4; i++) {
      if (!this.pawns[i].isFinished()) {
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
    console.log('Kolej gracza: ' + this.color);
    console.log('wyrzuciles: ' + diceRoll);

    if (pawnToMove.isOnMap()) {
      pawnToMove.move(diceRoll, pawnToMove.position, fields);
    } else {
      this.leaveHome(diceRoll, pawnToMove, fields);
    }
  }

  leaveHome(diceRoll, pawnToMove, fields) {
    if (pawnToMove.isHome()) {
      if (diceRoll == 6 || diceRoll == 1) {
        pawnToMove.move(0, this.startPos, fields);
        pawnToMove.setOnMap();
        console.log('start pionka');
      }
    }
    this.renderHome();
  }
}

export default Player;
