'use strict'

const chai = require('chai')
const expect = chai.expect

const Card = require('../src/Card')
const Turn = require('../src/Turn')
const Round = require('../src/Round')
const Deck = require('../src/Deck')

describe('Round', function () {
  let card, card1, deck, deck1, round, turn, turn1

  beforeEach(function () {
    card = new Card(1, 'What is my name', ['Elsa', 'Matt', 'Gonzo'], 'Elsa')
    card1 = new Card(2, 'Another question', ['ok', 'maybe', 'no'], 'maybe')
    deck = new Deck([card])
    deck1 = new Deck([card, card1])
    round = new Round(deck)
    turn = new Turn('Elsa', card)
    turn1 = new Turn('Matt', card)
  })

  it('should be a function', function () {
    expect(Round).to.be.a('function')
  })

  it('should be an instance of Round', function () {
    expect(round).to.be.an.instanceof(Round)
  })

  it('should return the current card', function () {
    round.returnCurrentCard(1, 'What is my name', ['Elsa', 'Matt', 'Gonzo'], 'Elsa')
    expect(round.currentCard).to.deep.equal(card)
  })

  describe('Round.takeTurn', function () {

    it('should instantiate an instance of Turn', function () {
      expect(turn).to.be.an.instanceof(Turn);
    });

    it('should add one to the turn count', function () {
      expect(round.turns).to.equal(0)
      round.takeTurn(turn.guess)
      expect(round.turns).to.equal(1)
    })

    it('should change the current card to be the next card', function () {
      const round = new Round(deck1)
      expect(round.currentCard.id).to.equal(1)
      round.takeTurn('Elsa')
      expect(round.currentCard.id).to.equal(2)
    })

    it('should store id of incorrect guesses', function () {
      round.takeTurn('Matt')
      expect(round.incorrectGuesses).to.include(card.id)
    })

    it('should evaluate the current guess', function () {
      expect(turn.evaluateGuess()).to.equal(true)
      expect(turn1.evaluateGuess()).to.equal(false)
    })

    it('should give feedback', function () {
      const round = new Round(deck1)
      expect(round.takeTurn('Elsa')).to.equal('correct!')
      expect(round.takeTurn('Matt')).to.equal('incorrect!')
    })
  })

  it('should calculate percent correct', function () {
    const a = round.rightAnswers = 10
    const b = round.turns = 20
    expect(round.calculatePercentCorrect()).to.equal('50')
  })
})