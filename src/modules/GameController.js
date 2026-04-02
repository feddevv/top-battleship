import { Player } from './Player.js'
import { DOMController } from './DOMController.js'

// cSpell:ignore gameboard
export class GameController {
  #player
  #computer
  #dom
  #turn

  constructor() {
    this.#player = new Player('real')
    this.#computer = new Player('computer')
    this.#dom = new DOMController()
    this.#turn = this.#player
  }

  render() {
    this.#dom.renderGrid(this.#player.gameboard.gameboard, '.player-board')
    this.#dom.renderGrid(
      this.#computer.gameboard.gameboard,
      '.enemy-board',
      true,
    )
  }

  // Temporary func
  populatePlayerFleet() {
    this.#player.gameboard.placeShip([0, 0], 4, 'hor')
    this.#player.gameboard.placeShip([2, 0], 3, 'vert')
    this.#player.gameboard.placeShip([2, 2], 3, 'hor')
    this.#player.gameboard.placeShip([2, 0], 3, 'vert')
    this.#player.gameboard.placeShip([4, 2], 2, 'hor')
    this.#player.gameboard.placeShip([6, 0], 2, 'vert')
    this.#player.gameboard.placeShip([2, 7], 2, 'hor')
    this.#player.gameboard.placeShip([9, 0], 1, 'hor')
    this.#player.gameboard.placeShip([9, 9], 1, 'hor')
    this.#player.gameboard.placeShip([0, 9], 1, 'hor')
    this.#player.gameboard.placeShip([5, 8], 1, 'hor')
  }

  populateComputerFleet() {
    this.#computer.gameboard.placeShip([0, 0], 4, 'hor')

    this.#computer.gameboard.placeShip([2, 0], 3, 'vert')
    this.#computer.gameboard.placeShip([2, 2], 3, 'hor')
    this.#computer.gameboard.placeShip([2, 0], 3, 'vert')

    this.#computer.gameboard.placeShip([4, 2], 2, 'hor')
    this.#computer.gameboard.placeShip([6, 0], 2, 'vert')
    this.#computer.gameboard.placeShip([2, 7], 2, 'hor')

    this.#computer.gameboard.placeShip([9, 0], 1, 'hor')
    this.#computer.gameboard.placeShip([9, 9], 1, 'hor')
    this.#computer.gameboard.placeShip([0, 9], 1, 'hor')
    this.#computer.gameboard.placeShip([5, 8], 1, 'hor')
  }

  playRound(x, y) {
    if (this.#turn === this.#computer) return

    if (this.playerMove(x, y)) return

    this.#turn = this.#computer

    setTimeout(() => this.computerMove(), 600)
  }

  playerMove(x, y) {
    const isHit = this.#computer.gameboard.receiveAttack([x, y])
    this.render()

    if (this.#computer.gameboard.isLost()) {
      alert('Player won!')
      return true
    }

    if (isHit) {
      return true
    } else {
      this.#turn = this.#computer
    }
  }

  computerMove() {
    const coord = this.makeRandomMove()
    const isHit = this.#player.gameboard.receiveAttack(coord)

    this.render()

    if (this.#player.gameboard.isLost()) {
      alert('Computer won!')
      return
    }

    if (isHit) {
      setTimeout(() => {
        this.computerMove()
      }, 600)
    } else {
      this.#turn = this.#player
    }
  }

  makeRandomMove() {
    const playerGameboard = this.#player.gameboard
    let x, y
    do {
      x = Math.floor(Math.random() * 9)
      y = Math.floor(Math.random() * 9)
    } while (
      playerGameboard.gameboard[x][y] === 'miss' ||
      playerGameboard.gameboard[x][y] === 'hit'
    )

    return [x, y]
  }

  initEventListeners() {
    const playerBoard = document.querySelector('.enemy-board')

    playerBoard.addEventListener('click', (e) => {
      const target = e.target
      if (target && target.matches('.cell')) {
        if (
          target.classList.contains('hit') ||
          target.classList.contains('miss')
        ) {
          return
        }

        const x = e.target.dataset.x
        const y = e.target.dataset.y
        this.playRound(x, y)
      }
    })
  }
}
