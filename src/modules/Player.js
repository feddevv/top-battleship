import { Gameboard } from './Gameboard.js'
// cSpell:ignore gameboard

export class Player {
  constructor(type) {
    this.type = type
    this.gameboard = new Gameboard()
  }
}

export class Computer extends Player {
  constructor(type) {
    super(type)
  }

  makeRandomMove(enemyBoard) {
    let x, y
    do {
      x = Math.floor(Math.random() * 10)
      y = Math.floor(Math.random() * 10)
    } while (enemyBoard[x][y] === 'miss' || enemyBoard[x][y] === 'hit')

    return [x, y]
  }

  findRandomNeighbor(coord, enemyBoard) {
    const [x, y] = coord
    const res = []

    for (let i = x - 1; i <= x + 1; i++) {
      if (
        i < 0 ||
        i > 9 ||
        enemyBoard[i][y] === 'hit' ||
        enemyBoard[i][y] === 'miss'
      )
        continue

      res.push([i, y])
    }

    for (let i = y - 1; i <= y + 1; i++) {
      if (
        i < 0 ||
        i > 9 ||
        enemyBoard[x][i] === 'hit' ||
        enemyBoard[x][i] === 'miss'
      )
        continue

      res.push([x, i])
    }

    return res[Math.floor(Math.random() * res.length)]
  }
}
