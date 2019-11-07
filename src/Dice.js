class Dice {
  static throwDice() {
    return Math.round(Math.random() * 6 + 1);
  }
}

export default Dice;
