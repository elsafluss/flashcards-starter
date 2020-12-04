'use strict'

const chai = require('chai')
const expect = chai.expect

const Round = require('../src/Round')
const Turn = require('../src/Turn')
const Card = require('../src/Card')
const Deck = require('../src/Deck')
const Game = require('../src/Game')

describe('Game', function () {

  it('should be a function', function () {
    expect(Game).to.be.a('function')
  })

  it('should be an instance of Game', function () {
    const card = new Card(1, 'Have a question', ['nope', 'yes', 'not this'], 'yes')
    const deck = new Deck()
    deck.createDeck(card)
    const round = new Round(deck)
    const game = new Game(round)
    expect(game).to.be.an.instanceof(Game)
  })

  it('should create cards', function () {
    const card = new Card(1, 'Have a question', ['nope', 'yes', 'not this'], 'yes')
    const deck = new Deck()
    deck.createDeck(card)
    const round = new Round(deck)
    const turn = new Turn('yes', card)
    const game = new Game(round)
    game.start()
    expect(round.currentCard.id).to.equal(1)
    expect(round.currentCard.question).to.equal('Have a question')
    expect(round.currentCard.answers).to.deep.equal(['nope', 'yes', 'not this'])
    expect(round.currentCard.correctAnswer).to.equal('yes')
  })

  it('should put cards in a deck', function () {
    const card = new Card(1, 'Have a question', ['nope', 'yes', 'not this'], 'yes')
    const deck = new Deck()
    deck.createDeck(card)
    const round = new Round(deck)
    const turn = new Turn('yes', card)
    const game = new Game(round)
    game.start()
    expect(round.deck.cards[0]).to.deep.equal(card)
  })
})