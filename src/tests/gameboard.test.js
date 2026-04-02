import { Gameboard } from '../modules/Gameboard.js'

// cSpell:ignore gameboard

describe('Gameboard tests', () => {
  let gameboard

  beforeEach(() => {
    gameboard = new Gameboard()
  })

  describe('Vertical placement', () => {
    test('should return true when ship is placed vertically within boundaries', () => {
      expect(gameboard.placeShip([7, 0], 3, 'vert')).toBe(true)
    })

    test('should return false when ship goes out of bottom boundary', () => {
      expect(gameboard.placeShip([9, 9], 3, 'vert')).toBe(false)
    })

    test('should return true for a single-cell ship (length 1)', () => {
      expect(gameboard.placeShip([0, 0], 1, 'vert')).toBe(true)
    })
  })

  describe('Horizontal placement', () => {
    test('should return true when ship is placed horizontally within boundaries', () => {
      expect(gameboard.placeShip([4, 4], 4, 'hor')).toBe(true)
    })

    test('should return false when ship goes out of right boundary', () => {
      expect(gameboard.placeShip([0, 8], 3, 'hor')).toBe(false)
    })
  })

  describe('Collision and Proximity', () => {
    test('should return false if placing a ship directly on top of another', () => {
      gameboard.placeShip([2, 2], 3, 'hor')
      expect(gameboard.placeShip([2, 2], 3, 'hor')).toBe(false)
    })

    test('should return false if placing a ship adjacent to another', () => {
      gameboard.placeShip([2, 2], 3, 'hor')
      expect(gameboard.placeShip([3, 2], 2, 'hor')).toBe(false)
    })
  })

  describe('Attacks', () => {
    test('should return false if hit does not touch the ship', () => {
      expect(gameboard.receiveAttack([0, 0])).toBe(false)
    })

    test('should return true if hit touches the ship', () => {
      gameboard.placeShip([0, 0], 3, 'vert')

      expect(gameboard.receiveAttack([0, 0])).toBe(true)
    })

    test('should return false if there are still functional ships', () => {
      gameboard.placeShip([0, 0], 2, 'hor')
      gameboard.placeShip([5, 5], 1, 'vert')

      gameboard.receiveAttack([5, 5])

      expect(gameboard.isLost()).toBe(false)
    })

    test('should return true when all ships are sunk', () => {
      gameboard.placeShip([0, 0], 2, 'hor')
      gameboard.placeShip([2, 2], 1, 'vert')

      gameboard.receiveAttack([0, 0])
      gameboard.receiveAttack([0, 1])

      gameboard.receiveAttack([2, 2])

      expect(gameboard.isLost()).toBe(true)
    })

    test('should return true if no ships were ever placed (edge case)', () => {
      expect(gameboard.isLost()).toBe(true)
    })
  })
})
