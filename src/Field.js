class Field {
  constructor(id) {
    this.id = id;
    this.pawn = null;
    this.element = document.getElementById(id);
  }
}

export default Field;
