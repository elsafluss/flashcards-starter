const Turn = require('../src/Turn')

class Round {
  constructor(currentCard, currentTurn) {
    this.currentCard = currentCard;
    this.currentTurn = currentTurn;
    // this.currentGuess = currentGuess;
    this.turnCount = 0;
    this.rightAnswers = 0;
  }

  returnCurrentCard() {
    return this.currentCard
  }

  takeTurn(currentGuess, currentCard) {
    const currentTurn = new Turn(currentGuess, currentCard)
    this.currentTurn = currentTurn
    this.turnCount++
    currentTurn.evaluateGuess(this.currentGuess)
    const feedback = currentTurn.giveFeedback()
    if (feedback === 'correct!') {
      this.rightAnswers++
    }
    currentCard.cardId++
    return feedback
  }

  calculatePercentCorrect() {
    return (this.rightAnswers / this.turnCount) * 100
  }

  endRound() {
    return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`
  }

}

module.exports = Round