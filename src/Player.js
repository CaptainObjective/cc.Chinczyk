import Pawn from './Pawn';

class Player {
  constructor(name, color, startPos) {
    this.name = name;
    this.color = color;
    this.startPos = startPos;
    this.pawns = [];
    this.homeDiv = document.querySelector(`#home-area-${this.color}`);

    for (let i = 0; i < 4; i++) {
      this.pawns.push(new Pawn(color));
    }

    this.renderHome();
  }

  renderHome() {
    this.homeDiv.innerHTML = '';
    this.pawns.map(pawn => {
      !pawn.position && this.homeDiv.appendChild(pawn.render());
    });
  }

  move(diceRoll) {
    //Ta metoda jest w całości do przerobienia, trzeba poprosić gracza o wybranie pionka/pola którym się rusza i to ustawić jako from
    const pawnToMove = this.pawns[this.pawns.length - 1]; // To bedzie do zmiany
    const from = this.pawns.every(({ position }) => !position) ? this.startPos : undefined;
    pawnToMove.move(diceRoll, from);

    //Odświeżam home ponieważ istnieje szansa że gracz po ruchu wyszedł, to można zrobić lepiej: odświeżając tylko jeśli gracz wyszedł
    this.renderHome();
  }

  leaveHome() {
    //TODO
  }

  enterFinish() {
    //TODO
  }
}

export default Player;
