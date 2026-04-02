import { Player } from './Player.js'
import { DOMController } from './DOMController.js'

export class GameController {
  #player0
  #player1
  #dom
  #turn

  constructor() {
    this.#player0 = new Player('real')
    this.#player1 = new Player('computer')
    this.#dom = new DOMController()
    this.#turn = this.#player0
  }

  initGame() {
    this.#dom.renderGrid(this.#player0.gameboard.gameboard, '.player-board')
    this.#dom.renderGrid(
      this.#player1.gameboard.gameboard,
      '.enemy-board',
      true,
    )
  }
}
