import { finished } from "stream";

class Pawn {
  constructor(color, num) {
    this.position = null;
    this.color = color;
    this.status = 'in_home';
    this.diceRollSum = 0;
    // przekazany do nadania id pionka
    this.num = num;
    // wskazanie czy pionek został wybrany 
    this.isSelected = false;
  }

  // dodanie statusów umożliwi identyfikację pionków w domu, na planszy i na finiszu//

  move(diceRoll, from = this.position) {
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
    else if (this.diceRollSum > 39 && this.diceRollSum < 44 && document.getElementById(`finish-${this.color}-${this.diceRollSum % 10}`).children.length > 0) {
      this.position = this.position - diceRoll;
      this.diceRollSum = this.diceRollSum - diceRoll;
      from = this.position;
      console.log('Miejsce w bazie jest zajęte');
    }
    // Warunek wejścia do bazy
    else if (this.diceRollSum > 39 && this.diceRollSum < 44 && document.getElementById(`finish-${(this.color)}-${this.diceRollSum % 10}`).children.length == 0) {
      this.clearField(from)
      document.getElementById(`finish-${this.color}-${this.diceRollSum % 10}`).appendChild(this.render());
      this.status = 'finished';
      console.log('Pionek w bazie!');
    }
    else {
      this.clearField(from)
      document.getElementById(this.position).appendChild(this.render());
      //??????
      this.myCallback();
    }

    //  // bicie do przemyślenia - jak zmienić this.status zbitego piona na "in_home" ?
    // if (document.getElementById(this.position).children.length > 1) {
    //   document.getElementById(this.position).removeChild(document.getElementById(this.position).children[0]);
    // }
  }

  clearField(from) {
    const oldField = document.getElementById(from);
    if (oldField.children[0]) oldField.removeChild(oldField.children[0]);
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('pawn', `pawn-${this.color}`);
    element.setAttribute('id', this.color + this.num);
    return element;
  }

  beat() {

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
    this.status = "finished";
  }

  // allPawnsFinished() {
  //   if(document.getElementById(`finish-${this.color}-0`).children.length == 1 && document.getElementById(`finish-${this.color}-1`).children.length == 1 && document.getElementById(`finish-${this.color}-2`).children.length == 1 && document.getElementById(`finish-${this.color}-3`).children.length == 1 &&
  //   return
  // }

  // pawnAddEvent(obiect) {
  // console.log(this);
  // const pawnId = obiect.color + obiect.num;
  // const pawn = document.getElementById(pawnId);
  // pawn.style.boxShadow = 'inset 0 0 1em black';
  // obiect.isSelected = !obiect.isSelected;
  // }
  
  //Callback dodający eventListener
  myCallback() {
    const pawnId = this.color + this.num;
    const pawn = document.getElementById(pawnId);
    pawn.style.cursor = 'pointer';
    let _this = this;

    pawn.addEventListener('click', function () {
      pawn.style.boxShadow = 'inset 0 0 1em black';
      _this.isSelected = !_this.isSelected;
      console.log(pawnId)
    });
  }

}

export default Pawn;
