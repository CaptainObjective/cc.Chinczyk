class Pawn {
  constructor(color) {
    this.position = null;
    this.color = color;
    this.status = 'in_home';
    this.diceRollSum = 0;
  }

  // dodanie statusów umożliwi identyfikację pionków w domu, na planszy i na finiszu//

  move(diceRoll, from = this.position) {
    //Pionki mogą "krążyć" wokół planszy
    if (this.position + diceRoll > 39 && this.color !== 'green') this.position = (this.position + diceRoll) % 10;
    else this.position = from + diceRoll;
    //Sumowanie wyrzuconych oczek dla każdego pionka
    this.diceRollSum = this.diceRollSum + diceRoll;
    console.log(this.diceRollSum);
    //Za duża liczba oczek wyrzucona przy próbie wejścia do bazy
    if(this.diceRollSum > 43) {
      this.position = this.position - diceRoll;
      this.diceRollSum = this.diceRollSum - diceRoll;
      from = this.position;
      console.log('Wyrzuciłeś za dużo!')
    }
    // Próba wejścia na zajęte miesjce w bazie
    else if (this.diceRollSum > 39 && this.diceRollSum < 44 && document.getElementById(`finish-${String(this.color)}-${this.diceRollSum % 10}`).children.length > 0){
      this.position = this.position - diceRoll;
      this.diceRollSum = this.diceRollSum - diceRoll;
      from = this.position;
      console.log('Miejsce w bazie jest zajęte');
    }
    //Warunek wejścia do bazy
    else if(this.diceRollSum > 39 && this.diceRollSum < 44 && document.getElementById(`finish-${String(this.color)}-${this.diceRollSum % 10}`).children.length == 0) {
      this.clearField(from)
      document.getElementById(`finish-${String(this.color)}-${this.diceRollSum % 10}`).appendChild(this.render());
      this.status ='finished';
      console.log('Pionek w bazie!');
    }
    else { 
      this.clearField(from)
      document.getElementById(this.position).appendChild(this.render());
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

}

export default Pawn;
