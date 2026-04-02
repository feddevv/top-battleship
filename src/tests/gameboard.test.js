import { Gameboard } from '../modules/Gameboard.js'

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
})
