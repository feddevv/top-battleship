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

  initGame() {
    this.#dom.createGrid(this.#player.gameboard.gameboard, '.player-board')
    this.#dom.createGrid(this.#computer.gameboard.gameboard, '.enemy-board')

    this.initEventListeners()
  }

  updateBoard(gameboard, container, isEnemy = false) {
    this.#dom.renderGrid(gameboard, container, isEnemy)
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
    this.updateBoard(this.#computer.gameboard.gameboard, '.enemy-board', true)

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

    this.updateBoard(this.#player.gameboard.gameboard, '.player-board')

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

    this.updateBoard(this.#player.gameboard.gameboard, '.player-board')
    this.updateBoard(this.#computer.gameboard.gameboard, '.enemy-board', true)

    this.#isActive = false
    this.#turn = this.#player

    document.querySelector('.btn.random').disabled = false
  }

  dragAndDropListeners() {
    const boardCells = document.querySelectorAll('.player-board > .cell')
    const dockShips = document.querySelectorAll('.dock-ship')
    const currentDragging = {
      length: null,
      direction: null,
    }

    const handleHighlight = (x, y, callback) => {
      const first = currentDragging.direction === 'hor' ? y : x
      const last =
        currentDragging.direction === 'hor'
          ? currentDragging.length + y
          : currentDragging.length + x

      for (let i = first; i < last; i++) {
        if (i > 9) break
        const cellToHighlight = document.querySelector(
          `.cell[data-x="${x}"][data-y="${i}"]`,
        )

        callback(cellToHighlight)
      }
    }

    dockShips.forEach((ship) => {
      ship.addEventListener('dragstart', (e) => {
        const length = Number(ship.dataset.length)

        currentDragging.length = length
        currentDragging.direction = 'hor'

        e.dataTransfer.setData('ship-length', length)
      })

      ship.addEventListener('dragend', () => {
        currentDragging.length = null
        currentDragging.direction = null
      })
    })

    // When the ship enters the cell
    boardCells.forEach((cell) => {
      cell.addEventListener('dragover', (e) => {
        e.preventDefault()

        const x = Number(cell.dataset.x)
        const y = Number(cell.dataset.y)

        handleHighlight(x, y, (cell) => this.#dom.addHighlight(cell))
      })

      // When the ship leaves the cell
      cell.addEventListener('dragleave', () => {
        const x = Number(cell.dataset.x)
        const y = Number(cell.dataset.y)

        handleHighlight(x, y, (cell) => this.#dom.removeHighlight(cell))
      })

      // When the ship is dropped
      cell.addEventListener('drop', (e) => {
        const length = Number(e.dataTransfer.getData('ship-length'))
        const x = Number(cell.dataset.x)
        const y = Number(cell.dataset.y)

        handleHighlight(x, y, (cell) => this.#dom.removeHighlight(cell))

        if (this.#player.gameboard.placeShip([x, y], length, 'hor')) {
          this.#dom.removeElement(`.dock-ship.length-${length}`)
          this.updateBoard(this.#player.gameboard.gameboard, '.player-board')
        }

        if (document.querySelector('.fleet-list').childElementCount === 0) {
          this.#isActive = true
          this.randomFilling(this.#computer.gameboard)
        }
      })
    })
  }

  initEventListeners() {
    const computerBoard = document.querySelector('.enemy-board')
    const randomButton = document.querySelector('.btn.random')
    const resetButton = document.querySelector('.btn.reset')

    computerBoard.addEventListener('click', (e) => {
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

      this.updateBoard(this.#player.gameboard.gameboard, '.player-board')
      this.updateBoard(this.#computer.gameboard.gameboard, '.enemy-board', true)

      randomButton.disabled = true
      this.#isActive = true
    })

    resetButton.addEventListener('click', () => {
      this.resetGame()
    })

    this.dragAndDropListeners()
  }
}
