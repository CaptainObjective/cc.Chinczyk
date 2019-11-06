class Pawn {
  constructor(color) {
    this.position = null;
    this.color = color;
  }
  render() {
    const element = document.createElement('div');
    element.classList.add('pawn', `pawn-${this.color}`);
    return element;
  }
}

export default Pawn;
