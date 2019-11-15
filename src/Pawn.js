import Toastify from 'toastify-js'


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

  move(diceRoll, from, fields) {
    if (this.position != null)
    this.popUpPawn(this.popUpText = `Ruszyłeś się o  ${diceRoll} do przodu`);
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
      this.popUpPawn(this.popUpText = 'Wyrzuciłeś za dużo!');
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
      this.popUpPawn(this.popUpText = 'Miejsce w bazie jest zajęte');
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
      this.popUp(this.popUpText = 'Pionek w bazie!');
    } else {
      this.clearField(from);
      document.getElementById(this.position).appendChild(this.render());
      //Dodajemy event do pionka na planszy
      this.addListener();
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
    //dodajemy id do pawna
    element.setAttribute('id', this.color + this.num);
    console.log(`render ${this.color}${this.num}`);
    return element;
  }

  wasBeat() {
    this.popUpPawn(this.popUpText = 'Zbiłeś piona!')
    console.log('Bicie');
    this.status = 'in_home';
    this.diceRollSum = 0;
    this.currentFieldNode.removeChild(this.currentFieldNode.firstChild);
    // wyrenderuj go z powrotem w domu
    document.querySelector(`#home-area-${this.color}`).appendChild(this.render());
    //dodanie eventu do zbitego pionka
    console.log(this);
    this.addListener();
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

  //metoda dodająca event
  addListener() {
    const pawnId = this.color + this.num;
    const pawn = document.getElementById(pawnId);
    pawn.style.cursor = 'pointer';
    if (this.isSelected) {
      pawn.style.boxShadow = 'inset 0 0 1em black';
    }
    console.log(`dodanie eventu ${pawnId}`);
    let _this = this;

    //ustawia, które pionki zostały wskazane
    pawn.addEventListener('click', function () {
      if (!_this.isSelected) {
        pawn.style.boxShadow = 'inset 0 0 1em black';
      } else {
        pawn.style.boxShadow = 'none';
      }
      _this.isSelected = !_this.isSelected;
      console.log(`zaznaczono pionek: ${pawnId}`)
    });
  }

  //odznaczanie pionka
  unselect() {
    this.isSelected = false;
    const pawnId = this.color + this.num;
    const pawn = document.getElementById(pawnId);
    pawn.style.boxShadow = 'none';
  }

    // Pop-up
    popUpPawn(popUpText) {
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
