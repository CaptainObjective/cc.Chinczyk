class Pawn {
  constructor(color) {
    this.position = null;
    this.color = color;
  }

  move(diceRoll, from = this.position) {
    const oldField = document.getElementById(from);
    //Wyczyscic poprzednie pole
    if (oldField.children[0]) oldField.removeChild(oldField.children[0]);
    //Ustaw pionka na nowym
    this.position = from + diceRoll;
    document.getElementById(this.position).appendChild(this.render());
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('pawn', `pawn-${this.color}`);
    return element;
  }
}

export default Pawn;
