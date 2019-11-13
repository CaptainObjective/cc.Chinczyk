import Pawn from './Pawn';

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
      //dodajemy event pionka przy renderwaniu Home
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

  move(diceRoll) {
    const pawnToMove = this.getPawn();

    //każemy graczowi wskazać pionek
    if (!pawnToMove) {
      console.log('Musisz wskazać pionka');
      return false;
    }

    if (pawnToMove.isOnMap()) {
      pawnToMove.move(diceRoll, pawnToMove.position);
    } else {
      this.leaveHome(diceRoll, pawnToMove);
    }
    console.log(`ruch pionkiem: ${pawnToMove.num}`);
    return true;
  }

  leaveHome(diceRoll, pawnToMove) {
    if (pawnToMove.isHome()) {
      if (diceRoll == 6) {
        pawnToMove.move(0, this.startPos);
        pawnToMove.setOnMap();
        console.log('start pionka');
      } else {
        console.log('Musisz wyrzucic 6 by wyjsc z domku');
      }
    }
    this.renderHome();
  }

}

export default Player;
