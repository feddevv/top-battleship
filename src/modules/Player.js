import { Gameboard } from './Gameboard.js'
// cSpell:ignore gameboard

export class Player {
  constructor(type) {
    this.type = type
    this.gameboard = new Gameboard()
  }
}
