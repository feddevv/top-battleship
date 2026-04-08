# Battleship

A browser-based Battleship game built with JavaScript modules, Webpack, and Jest.

## Overview

This project implements a classic 10x10 Battleship game with:

- Two boards: player and computer
- Drag-and-drop fleet placement with per-ship orientation toggles
- Random fleet placement option
- Turn-based combat with hit, miss, and sunk states
- Basic computer targeting logic after successful hits
- Win/lose modal when one fleet is destroyed

## Tech Stack

- JavaScript (ES modules)
- Webpack 5
- Babel
- Jest
- HTML + CSS

## Requirements

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Available Scripts

### `npm run dev`

Starts the Webpack development server and opens the app in the browser.

### `npm run build`

Builds a production bundle into `dist/`.

### `npm test`

Runs Jest unit tests.

### `npm run predeploy`

Runs the production build before deployment.

### `npm run deploy`

Publishes the contents of `dist/` to GitHub Pages.

## How to Play

1. Place your fleet on the player board.
2. Use each ship's orientation controls to switch between horizontal and vertical placement.
3. Drag ships from the fleet dock onto valid cells.
4. Start firing on the enemy board once deployment is complete.
5. The game continues until one side loses all ships.

Alternative start:

- Click `Random` to auto-place both fleets and begin immediately.

Controls:

- `Random`: randomizes fleets and starts the match.
- `Reset`: clears both boards and restores manual placement mode.

## Rules Implemented

- Board size is 10x10.
- Fleet composition is fixed: `[4, 3, 3, 2, 2, 2, 1, 1, 1, 1]`.
- Ships cannot overlap.
- Ships cannot be adjacent, including diagonally.
- Attack result states: `miss`, `hit`, `sunk`.
- A player loses when all placed ships are sunk.

## Project Structure

```text
src/
	index.js
	main.css
	template.html
	modules/
		DOMController.js
		Gameboard.js
		GameController.js
		Player.js
		Ship.js
	tests/
		gameboard.test.js
		ship.test.js
```

## Architecture

### `Ship`

- Tracks ship length and hit count.
- Exposes `hit()` and `isSunk()`.

### `Gameboard`

- Owns a 10x10 internal board.
- Places ships with boundary and collision checks.
- Receives attacks and returns structured outcomes.
- Detects defeat state when no alive ships remain.
- Supports resetting state with `clearBoard()`.

### `Player` and `Computer`

- `Player` owns a `Gameboard`.
- `Computer` extends `Player` and provides:
  - `makeRandomMove()` for unexplored cells
  - `findRandomNeighbor()` for follow-up targeting around hits

### `GameController`

- Coordinates game setup, turns, and state transitions.
- Handles player/computer move flow.
- Manages random placement and reset behavior.
- Connects game logic to the UI layer.

### `DOMController`

- Creates and renders both grids.
- Builds fleet dock UI.
- Applies hit/miss/ship styling.
- Handles highlight and sink animations.
- Displays endgame modal.

## Testing

Current tests cover:

- `Ship` hit tracking and sink detection.
- `Gameboard` placement constraints and loss-state logic.

Test files:

- `src/tests/ship.test.js`
- `src/tests/gameboard.test.js`

## Build Configuration

- `webpack.common.js`: shared config, entry/template/output
- `webpack.dev.js`: development server config
- `webpack.prod.js`: production build config
- `babel.config.js`: Babel preset configuration for Jest/build tooling
- `eslint.config.js`: linting configuration

## License

ISC
