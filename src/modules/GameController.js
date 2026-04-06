import { Computer, Player } from './Player.js'
import { DOMController } from './DOMController.js'

// cSpell:ignore gameboard
export class GameController {
  #player
  #computer
  #dom
  #turn
  #isActive = false

  constructor() {
    this.#player = new Player('real')
    this.#computer = new Computer('computer')
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

    setTimeout(() => {
      this.computerMove()
    }, 600)
  }

  playerMove(x, y) {
    if (!this.#isActive) return

    const isHit = this.#computer.gameboard.receiveAttack([x, y])
    this.render()

    if (this.#computer.gameboard.isLost()) {
      this.#dom.showWinPopUp(
        'Victory!',
        'You win!',
        'Enemy fleet has been sunk!',
      )
      return true
    }

    if (isHit && isHit.status === 'sunk') {
      this.#dom.animateShipSinking(isHit.coordinates, '.enemy-board')
      return true
    } else if (isHit && isHit.status === 'hit') {
      return true
    } else {
      this.#turn = this.#computer
    }
  }

  computerMove(
    coord = this.#computer.makeRandomMove(this.#player.gameboard.gameboard),
  ) {
    if (!this.#isActive) return

    const isHit = this.#player.gameboard.receiveAttack(coord)

    this.render()

    if (this.#player.gameboard.isLost()) {
      this.#dom.showWinPopUp(
        'Defeat!',
        'You lost!',
        'Your fleet has been sunk.',
      )
      return
    }

    if (isHit && isHit.status === 'sunk') {
      this.#dom.animateShipSinking(isHit.coordinates, '.player-board')
      setTimeout(() => {
        this.computerMove()
      }, 600)
    } else if (isHit && isHit.status === 'hit') {
      setTimeout(() => {
        const enemyBoard = this.#player.gameboard.gameboard
        this.computerMove(this.#computer.findRandomNeighbor(coord, enemyBoard))
      }, 600)
    } else {
      this.#turn = this.#player
    }
  }

  randomFilling(target) {
    const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]

    target.clearBoard()

    let i = 0
    while (i <= 9) {
      const randCoord = this.#computer.makeRandomMove(target.gameboard)
      const randDirection = Math.random() < 0.5 ? 'vert' : 'hor'
      if (!target.placeShip(randCoord, ships[i], randDirection)) {
        continue
      }

      i++
    }
  }

  resetGame() {
    this.#player.gameboard.clearBoard()
    this.#computer.gameboard.clearBoard()
    this.render()

    this.#isActive = false
    this.#turn = this.#player

    document.querySelector('.btn.random').disabled = false
  }

  initEventListeners() {
    const playerBoard = document.querySelector('.enemy-board')
    const randomButton = document.querySelector('.btn.random')
    const resetButton = document.querySelector('.btn.reset')

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
      this.#isActive = true
      console.log(this.#isActive)
    })

    resetButton.addEventListener('click', () => {
      this.resetGame()
    })
  }
}
