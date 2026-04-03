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

  #checkCollision(x, y, length, axis) {
    const xP = axis === 'hor' ? x + 1 : x + length
    const yP = axis === 'vert' ? y + 1 : y + length

    for (let i = y - 1; i <= yP; i++) {
      for (let j = x - 1; j <= xP; j++) {
        if (i >= 0 && j >= 0 && i <= 9 && j <= 9) {
          if (this.#gameboard[j][i]) return false
        }
      }
    }

    return true
  }

  placeShip(coord, length, axis) {
    const [x, y] = coord

    if (axis === 'vert' && x + length - 1 > 9) return false
    else if (axis === 'hor' && y + length - 1 > 9) return false

    if (!this.#checkCollision(x, y, length, axis)) return false

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
    if (this.isLost()) return { status: 'lost', coordinates: [] }

    const [x, y] = coord
    const ship = this.#gameboard[x][y]

    if (!ship) {
      this.#gameboard[x][y] = 'miss'
      return { status: 'miss', coordinates: [x, y] }
    }

    ship.hit()
    this.#gameboard[x][y] = 'hit'

    if (ship.isSunk()) {
      this.#aliveShips--
      return { status: 'sunk', coordinates: [x, y] }
    }

    return { status: 'hit', coordinates: [x, y] }
  }

  isLost() {
    if (this.#aliveShips === 0) return true
    return false
  }

  clearBoard() {
    this.#gameboard = []

    for (let i = 0; i < 10; i++) {
      const row = [null, null, null, null, null, null, null, null, null, null]
      this.#gameboard.push(row)
    }
  }
}
