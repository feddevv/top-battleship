import { Ship } from '../modules/Ship.js'

describe('Ship tests', () => {
  const ship0 = new Ship(4)

  test('should return hit property', () => {
    expect(ship0.hitCount).toBe(0)
  })

  test('should increase hit property by 1', () => {
    ship0.hit()

    expect(ship0.hitCount).toBe(1)
  })

  test('should return false when ship is not sunk', () => {
    expect(ship0.isSunk()).toBe(false)
  })

  test('should return true when ship is sunk', () => {
    ship0.hit()
    ship0.hit()
    ship0.hit()

    expect(ship0.isSunk()).toBe(true)
  })
})
