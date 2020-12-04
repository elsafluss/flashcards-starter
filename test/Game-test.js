'use strict'

const chai = require('chai')
const expect = chai.expect

const Card = require('../src/Card')
const Round = require('../src/Round')
const Deck = require('../src/Deck')
const Game = require('../src/Game')

describe('Game', function () {
  let card, deck, round, game

  beforeEach(function () {
    card = new Card(1, 'Have a question', ['nope', 'yes', 'not this'], 'yes')
    deck = new Deck([card])
    round = new Round(deck)
    game = new Game(round)
  })

  it('should be a function', function () {
    expect(Game).to.be.a('function')
  })

  it('should be an instance of Game', function () {
    expect(game).to.be.an.instanceof(Game)
  })

  it('should create cards', function () {
    game.start()
    expect(round.currentCard.id).to.equal(1)
    expect(round.currentCard.question).to.equal('Have a question')
    expect(round.currentCard.answers).to.deep.equal(['nope', 'yes', 'not this'])
    expect(round.currentCard.correctAnswer).to.equal('yes')
  })

  it('should put cards in a deck', function () {
    game.start()
    expect(round.currentCard).to.deep.equal(card)
  })
})