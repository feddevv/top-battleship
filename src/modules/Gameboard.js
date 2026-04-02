import { Ship } from './Ship.js'

// cSpell:ignore gameboard
export class Gameboard {
  #gameboard = []
  #aliveShips = 0

  constructor() {
    for (let i = 0; i < 10; i++) {
      const row = [null, null, null, null, null, null, null, null, null, null]
      this.#gameboard.push(row)
    }
  }

  get gameboard() {
    return this.#gameboard
  }

  #checkCollision(x, y) {
    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
          if (this.#gameboard[j][i]) return false
        }
      }
    }

    return true
  }

  placeShip(coord, length, axis) {
    const [x, y] = coord

    if (!this.#checkCollision(x, y)) return false

    if (axis === 'vert' && x + length - 1 > 9) return false
    else if (axis === 'hor' && y + length - 1 > 9) return false

    const ship = new Ship(length)
    this.#gameboard[x][y] = ship

    for (let i = 1; i < length; i++) {
      this.#gameboard[axis === 'vert' ? i + x : x][axis === 'hor' ? i + y : y] =
        ship
    }

    this.#aliveShips++
    return true
  }

  receiveAttack(coord) {
    if (this.isLost()) return false

    const [x, y] = coord
    const ship = this.#gameboard[x][y]

    if (!ship) {
      this.#gameboard[x][y] = 'miss'
      return false
    }

    ship.hit()
    if (ship.isSunk()) this.#aliveShips--
    this.#gameboard[x][y] = 'hit'

    return true
  }

  isLost() {
    if (this.#aliveShips === 0) return true
    return false
  }
}
