import Toastify from 'toastify-js'

class Pawn {
  constructor(color) {
    this.position = null;
    this.color = color;
    this.status = 'in_home';
    this.diceRollSum = 0;

  }

  // dodanie statusów umożliwi identyfikację pionków w domu, na planszy i na finiszu//

  move(diceRoll, from, fields) {
    if (this.position != null) this.popUp(this.popUpText = `Wyrzuciłeś ${diceRoll}`);
    // Pionki mogą "krążyć" wokół planszy
    if (this.position + diceRoll > 39 && this.color !== 'green') this.position = (this.position + diceRoll) % 10;
    else this.position = from + diceRoll;
    
    // Sumowanie wyrzuconych oczek dla każdego pionka
    this.diceRollSum = this.diceRollSum + diceRoll;
    // Za duża liczba oczek wyrzucona przy próbie wejścia do bazy
    if (this.diceRollSum > 43) {
      this.position = this.position - diceRoll;
      this.diceRollSum = this.diceRollSum - diceRoll;
      from = this.position;
      console.log('Wyrzuciłeś za dużo!');
    }
    
    // Próba wejścia na zajęte miejsce w bazie
    else if (
      this.diceRollSum > 39 &&
      this.diceRollSum < 44 &&
      document.getElementById(`finish-${this.color}-${this.diceRollSum % 10}`).children.length > 0
    ) {
      this.position = this.position - diceRoll;
      this.diceRollSum = this.diceRollSum - diceRoll;
      from = this.position;
      this.popUp(this.popUpText = 'Miejsce w bazie jest zajęte');
    }
    // Warunek wejścia do bazy
    else if (
      this.diceRollSum > 39 &&
      this.diceRollSum < 44 &&
      document.getElementById(`finish-${this.color}-${this.diceRollSum % 10}`).children.length == 0
    ) {
      this.clearField(from);
      document.getElementById(`finish-${this.color}-${this.diceRollSum % 10}`).appendChild(this.render());
      this.status = 'finished';
      this.popUp(this.popUpText = 'Za dużo');
    } else {
      this.clearField(from);
      document.getElementById(this.position).appendChild(this.render());
    }

    //Cokolowiek by sie nie zadzialo to :
    // Czyscimy poprzednie pole
    fields[from].pawn = null;
    if (this.position < 40) {
      //Jeżeli tam już coś jest to to zbij
      if (fields[this.position].pawn) fields[this.position].pawn.wasBeat();
      // Ustawiamy na nowe pole
      fields[this.position].pawn = this;
    }
  }

  clearField(from) {
    const oldField = document.getElementById(from);
    if (oldField.children[0]) oldField.removeChild(oldField.children[0]);
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('pawn', `pawn-${this.color}`);
    return element;
  }

  wasBeat() {
    console.log('Bicie');
    this.status = 'in_home';
    this.diceRollSum = 0;
    this.currentFieldNode.removeChild(this.currentFieldNode.firstChild);
    // wyrenderuj go z powrotem w domu
    document.querySelector(`#home-area-${this.color}`).appendChild(this.render());
  }

  get currentFieldNode() {
    return this.position !== null ? document.getElementById(this.position) : null;
  }

  isHome() {
    return this.status === 'in_home';
  }

  setHome() {
    this.status = 'in_home';
  }

  isOnMap() {
    return this.status === 'on_map';
  }

  setOnMap() {
    this.status = 'on_map';
  }

  isFinished() {
    return this.status === 'finished';
  }

  setFinished() {
    this.status = 'finished';
  }
  // Pop-up
  popUp(popUpText) {
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


export default Pawn;
