const data = require('./data')
const prototypeQuestions = data.prototypeData
const util = require('./util')
const Deck = require('./Deck')
const Card = require('./Card')
const Turn = require('./Turn')
const Round = require('./Round')

class Game {
  constructor() {}

  printMessage(deck, round) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)

  }

  printQuestion(round) {
    util.main(round);
  }

  start() {
    const card = prototypeQuestions.map(card => {
      return new Card(card.id, card.question, card.answers, card.correctAnswer)
    })
    const turn = new Turn(0, card)
    const deck = new Deck()
    const currentDeck = deck.createDeck(card)
    const round = new Round(card)
    this.printMessage(deck, round)
    this.printQuestion(round)
    return currentDeck
  }
}

module.exports = Game;