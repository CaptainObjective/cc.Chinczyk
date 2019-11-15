import rollADie from 'roll-a-die';
let roll = 0;

class Dice {
  static throwDice() {
    if (roll >= 1 && roll <= 6) return roll;
    return Math.floor(Math.random() * 6 + 1);
  }
}


function response(res) {
}

export function rollValue() {
  const element = document.getElementById('dice-box');
  const numberOfDice = +1;
  const throwDice = Dice.throwDice();
  const delay = 20000;
  const options = {
    element, // element to display the animated dice in.
    numberOfDice, // number of dice to use 
    callback: response,
    values: [throwDice],
    delay: delay
  }
  rollADie(options);
  return throwDice;
}

// document.getElementById('test').addEventListener('change', e => (roll = Number(e.target.value)));

// przy wartości Math.random wychodziły wartości = 7//

export default Dice;
