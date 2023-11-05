function rollDie(maxNum: number) {
  return Math.ceil(Math.random() * maxNum);
}

function rollMultipleDice(diceType: number, diceAmount: number) {
  return Array(diceAmount).fill('').reduce((acc, _) => {
    return acc + rollDie(diceType);
  }, 0);
}

export function rollDiceWithModifier(diceType: number, diceAmount: number, modifier: number) {
  return rollMultipleDice(diceType, diceAmount) + modifier;
}
