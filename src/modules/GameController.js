import { Player } from './Player.js'
import { DOMController } from './DOMController.js'

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
}
