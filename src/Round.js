'use strict'

const Turn = require('../src/Turn')
// const Deck = require('../src/Deck')
// const Card = require('../src/Card')

class Round {
  constructor(deck) {
    this.deck = deck;
    this.currentCard = deck.currentDeck[0]
    this.turns = 0;
    this.rightAnswers = 0;
    this.incorrectGuesses = []
  }

  returnCurrentCard() {
    return this.currentCard
  }

  takeTurn(guess) {
    const turn = new Turn(guess, this.currentCard)
    this.turn = turn
    this.turns++
    turn.evaluateGuess()
    const feedback = turn.giveFeedback()
    if (feedback === 'correct!') {
      this.rightAnswers++
    }
    if (!turn.evaluateGuess()) {
      this.incorrectGuesses.push(this.currentCard.id)
    }
    this.currentCard = this.deck.currentDeck[this.turns]
    return feedback
  }

  calculatePercentCorrect() {
    return ((this.rightAnswers / this.turns) * 100).toFixed(0)
  }

  endRound() {
    console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`)
  }
}

module.exports = Round