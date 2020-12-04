'use strict'

const chai = require('chai')
const expect = chai.expect

const Card = require('../src/Card')
const Turn = require('../src/Turn')
const Round = require('../src/Round')
const Deck = require('../src/Deck')

describe('Round', function () {

  it('should be a function', function () {
    expect(Round).to.be.a('function')
  })

  it('should be an instance of Round', function () {
    const card = new Card(1, 'What is my name', ['Elsa', 'Matt', 'Gonzo'], 'Elsa')
    const deck = new Deck()
    deck.createDeck(card)
    const round = new Round(deck)
    expect(round).to.be.an.instanceof(Round)
  })

  it('should return the current card', function () {
    const card = new Card(1, 'What is my name', ['Elsa', 'Matt', 'Gonzo'], 'Elsa')
    const deck = new Deck()
    deck.createDeck(card)
    const round = new Round(deck)
    round.returnCurrentCard(1, 'What is my name', ['Elsa', 'Matt', 'Gonzo'], 'Elsa')
    expect(round.currentCard).to.deep.equal(card)
  })

  describe('Round.takeTurn', function () {

    it('should instantiate an instance of Turn', function () {
      const turn = new Turn('Elsa', new Card())
      expect(turn).to.be.an.instanceof(Turn);
    });

    it('should add one to the turn count', function () {
      const card = new Card(1, 'What is my name', ['Elsa', 'Matt', 'Gonzo'], 'Elsa')
      const deck = new Deck()
      deck.createDeck(card)
      const round = new Round(deck)
      const turn = new Turn('Elsa', card)
      expect(round.turns).to.equal(0)
      round.takeTurn(turn.guess)
      expect(round.turns).to.equal(1)
    })

    it('should change the current card to be the next card', function () {
      const card = new Card(1, 'What is my name', ['Elsa', 'Matt', 'Gonzo'], 'Elsa')
      const card1 = new Card(2, 'Another question', ['ok', 'maybe', 'no'], 'maybe')
      const deck = new Deck()
      deck.createDeck(card)
      deck.createDeck(card1)
      const round = new Round(deck)
      const turn = new Turn('Elsa', card)
      expect(round.currentCard.id).to.equal(1)
      round.takeTurn('Elsa')
      expect(round.currentCard.id).to.equal(2)
    })

    it('should store id of incorrect guesses', function () {
      const card = new Card(1, 'What is my name', ['Elsa', 'Matt', 'Gonzo'], 'Elsa')
      const deck = new Deck()
      deck.createDeck(card)
      const round = new Round(deck)
      const turn = new Turn('Matt', card)
      round.takeTurn('Matt')
      expect(round.incorrectGuesses).to.include(card.id)
    })

    it('should evaluate the current guess', function () {
      const card = new Card(1, 'What is my name', ['Elsa', 'Matt', 'Gonzo'], 'Elsa')
      const turn = new Turn('Elsa', card)
      expect(turn.evaluateGuess()).to.equal(true)
      const turn1 = new Turn('Matt', card)
      expect(turn1.evaluateGuess()).to.equal(false)
    })

    it('should give feedback', function () {
      const card = new Card(1, 'What is my name', ['Elsa', 'Matt', 'Gonzo'], 'Elsa')
      const card1 = new Card(2, 'Another question', ['ok', 'maybe', 'no'], 'maybe')
      const deck = new Deck()
      deck.createDeck(card)
      deck.createDeck(card1)
      const turn = new Turn('Elsa', card)
      const turn1 = new Turn('Matt', card)
      const round = new Round(deck)
      expect(round.takeTurn('Elsa')).to.equal('correct!')
      expect(round.takeTurn('Matt')).to.equal('incorrect!')
    })
  })

  it('should calculate percent correct', function () {
    const card = new Card(1, 'What is my name', ['Elsa', 'Matt', 'Gonzo'], 'Elsa')
    const deck = new Deck()
    deck.createDeck(card)
    const round = new Round(deck)
    const a = round.rightAnswers = 10
    const b = round.turns = 20
    expect(round.calculatePercentCorrect()).to.equal(50)
  })

})