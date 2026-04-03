import './main.css'
import { GameController } from './modules/GameController.js'

const game = new GameController()

game.render()
game.initEventListeners()
