class Dice {
  static throwDice() {
    return Math.floor(Math.random() * 6 + 1);
  }
}

//przy wartości Math.random wychodziły wartości = 7//

export default Dice;
