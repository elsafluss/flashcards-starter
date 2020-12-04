'use strict'

class Deck {
  constructor(cards = []) {
    this.currentDeck = cards;
  }

  countCards() {
    return this.currentDeck.length
  }
}

module.exports = Deck