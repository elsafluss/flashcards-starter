'use strict'

const chai = require('chai')
const expect = chai.expect

const Card = require('../src/Card')
const Turn = require('../src/Turn')

describe('Turn', function () {
  let card, turn

  beforeEach(function () {
    card = new Card(1, 'What is my name', ['Elsa', 'Matt', 'Gonzo'], 'Elsa')
    turn = new Turn('Elsa', card)
  })

  it('should be a function', function () {
    expect(Turn).to.be.a('function');
  });

  it('should be an instance of Turn', function () {
    expect(turn).to.be.an.instanceof(Turn);
  });

  it('should accept two arguments', function () {
    expect(turn.guess).to.equal('Elsa')
    expect(turn.card).to.equal(card)
  })

  it('should return the user\'s guess', function () {
    expect(turn.returnGuess()).to.equal('Elsa')
  })

  it('should return the current card', function () {
    expect(turn.returnCard()).to.equal(card)
  })

  describe('Turn.evaluateGuess', function () {

    it('should return a boolean', function () {
      expect(turn.evaluateGuess()).to.be.a('boolean')
    })

    it('should return true when the guess is correct', function () {
      expect(turn.evaluateGuess()).to.equal(true)
    })

    it('should return false when the guess is incorrect', function () {
      const turn = new Turn('Matt', card)
      expect(turn.evaluateGuess()).to.equal(false)
    })
  })

  describe('Turn.giveFeedback', function () {

    it('should return a string', function () {
      expect(turn.giveFeedback()).to.be.a('string')
    })

    it('should return correct! when the guess is correct', function () {
      expect(turn.giveFeedback()).to.eq('correct!')
    })

    it('should return incorrect! when the guess is incorrect', function () {
      const turn = new Turn('Matt', card)
      expect(turn.giveFeedback()).to.eq('incorrect!')
    })
  })
})