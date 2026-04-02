import './main.css'
import { GameController } from './modules/GameController.js'

const game = new GameController()
game.populatePlayerFleet()
game.populateComputerFleet()

game.render()
game.initEventListeners()
