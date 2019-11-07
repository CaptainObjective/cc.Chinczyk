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

  // musiałam zmienić na status pionka, bo zielony po wyjściu miał pozycję 0, co powodowało, że nie znikał z homeDiv //
  renderHome() {
    this.homeDiv.innerHTML = '';
    this.pawns.map(pawn => {
      (pawn.status == 'home') && this.homeDiv.appendChild(pawn.render());
    });
  }

  // znajdujemy pionki, które są w grze//
  getPawn() {
    for (let i = 0; i < 4; i++) {
      if (this.pawns[i].status != 'finished') {
        return this.pawns[i];
      }
    }
  }

  move(diceRoll) {
    //Ta metoda jest w całości do przerobienia, trzeba poprosić gracza o wybranie pionka/pola którym się rusza i to ustawić jako from

    // const pawnToMove = this.pawns[this.pawns.length - 1]; // To bedzie do zmiany

    const pawnToMove = this.getPawn();
    console.log("Kolej gracza: " + this.color);
    console.log("wyrzuciles: " + diceRoll);
    
    if (pawnToMove.status == 'on_map'){
      pawnToMove.move(diceRoll, pawnToMove.position);
    } else {
      this.leaveHome(diceRoll, pawnToMove);
    };

    // // const from = this.pawns.every(({ position }) => !position) ? this.startPos : undefined;
    // pawnToMove.move(diceRoll, from);

    //Odświeżam home ponieważ istnieje szansa że gracz po ruchu wyszedł, to można zrobić lepiej: odświeżając tylko jeśli gracz wyszedł
    // this.renderHome();
  }

  leaveHome(diceRoll, pawnToMove) {

    if (pawnToMove.status == 'home') {
      if (diceRoll == 6 || diceRoll == 1) {
        pawnToMove.move(0, this.startPos);
        pawnToMove.status = 'on_map';
        console.log('start pionka');
      }
    }
    this.renderHome();
  }

  enterFinish() {
    //TODO
  }
}

export default Player;
