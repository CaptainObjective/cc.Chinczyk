import rollADie from 'roll-a-die';

const diceFormula = () => {
  return Math.floor(Math.random() * 6 + 1);
}

export function rollValue() {
  const element = document.getElementById('dice-box');
  const numberOfDice = +1;
  const throwDice = diceFormula();
  const delay = 200000;
  const options = {
    element,
    numberOfDice,
    callback: response,
    values: [throwDice],
    delay: delay
  }
  rollADie(options);
  return throwDice;
}

// Niepotrzebne ale musi być
function response() {
}


// Do testów

// let roll = 0;
// const diceFormula = () => {
//   if (roll >= 1 && roll <= 6) return roll;
//   return Math.floor(Math.random() * 6 + 1);
// }
// document.getElementById('test').addEventListener('change', e => (roll = Number(e.target.value)));


