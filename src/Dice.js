let roll = 0;

class Dice {
  static throwDice() {
    if (roll >= 1 && roll <= 6) return roll;
    return Math.floor(Math.random() * 6 + 1);
  }
}

document.getElementById('test').addEventListener('change', e => (roll = Number(e.target.value)));

// przy wartości Math.random wychodziły wartości = 7//

export default Dice;
