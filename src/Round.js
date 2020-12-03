'use strict'

const Turn = require('../src/Turn')
// const Deck = require('../src/Deck')
// const Card = require('../src/Card')

class Round {
  constructor(deck) {
    this.deck = deck; // array of card objects
    this.currentCard = deck[0] // test this default
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
    this.currentCard = this.deck[this.turns] // test this again
    if (!turn.evaluateGuess()) {
      this.incorrectGuesses.push(this.currentCard.id)
    }
    return feedback
  }

  calculatePercentCorrect() {
    return (this.rightAnswers / this.turns) * 100
  }

  endRound() {
    console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`)
  }
}

module.exports = Round