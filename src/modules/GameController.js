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

    if (isHit && isHit.status === 'sunk') {
      alert('Ship has been sunk!')
      return true
    } else if (isHit && isHit.status === 'hit') {
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

    if (isHit && isHit.status === 'hit') {
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
      x = Math.floor(Math.random() * 10)
      y = Math.floor(Math.random() * 10)
    } while (
      playerGameboard.gameboard[x][y] === 'miss' ||
      playerGameboard.gameboard[x][y] === 'hit'
    )

    return [x, y]
  }

  randomFilling(target) {
    const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]

    target.clearBoard()

    let i = 0
    while (i <= 9) {
      const randCoord = this.makeRandomMove()
      const randDirection = Math.random() < 0.5 ? 'vert' : 'hor'
      if (!target.placeShip(randCoord, ships[i], randDirection)) {
        continue
      }

      i++
    }
  }

  initEventListeners() {
    const playerBoard = document.querySelector('.enemy-board')
    const randomButton = document.querySelector('.btn.random')

    playerBoard.addEventListener('click', (e) => {
      const target = e.target
      if (target && target.matches('.cell')) {
        if (
          target.classList.contains('hit') ||
          target.classList.contains('miss')
        ) {
          return
        } else if (
          this.#computer.gameboard.isLost() ||
          this.#player.gameboard.isLost()
        )
          return

        const x = e.target.dataset.x
        const y = e.target.dataset.y
        this.playRound(x, y)
      }
    })

    randomButton.addEventListener('click', () => {
      this.randomFilling(this.#player.gameboard)
      this.randomFilling(this.#computer.gameboard)
      this.render()

      randomButton.disabled = true
    })
  }
}
