const data = require('./data')
const prototypeQuestions = data.prototypeData
const util = require('./util')
const Deck = require('./Deck')
const Card = require('./Card')
const Round = require('./Round')

class Game {
  constructor() {}

  printMessage(deck) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)

  }

  printQuestion(round) {
    util.main(round);
  }

  start() {
    let cards = prototypeQuestions.map(card => {
      card = new Card(card.id, card.question, card.answers, card.correctAnswer)
      return card
    })
    const deck = new Deck(cards)
    const round = new Round(deck)
    this.printMessage(deck)
    this.printQuestion(round)
    return cards
  }
}

module.exports = Game;