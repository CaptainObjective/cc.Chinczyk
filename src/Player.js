import Pawn from './Pawn';

class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.pawns = [];
    this.homeDiv = document.querySelector(`#home-area-${this.color}`);

    for (let i = 0; i < 4; i++) {
      this.pawns.push(new Pawn(color));
    }

    this.renderHome();
  }

  renderHome() {
    console.log(this.homeDiv);
    this.pawns.map(pawn => {
      console.log(pawn.render());
      !pawn.position && this.homeDiv.appendChild(pawn.render());
    });
  }
}

export default Player;
