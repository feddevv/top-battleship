// cSpell:ignore gameboard
export class DOMController {
  clearGrid(container) {
    const grid = document.querySelector(container)
    grid.innerHTML = ''
  }

  createGrid(gameboard, container) {
    const grid = document.querySelector(container)
    grid.innerHTML = ''
    gameboard.forEach((i, iIndex) => {
      i.forEach((j, jIndex) => {
        const div = document.createElement('div')
        div.className = `cell`
        div.dataset.x = iIndex
        div.dataset.y = jIndex

        grid.appendChild(div)
      })
    })
  }

  renderGrid(gameboard, container, isEnemy = false) {
    gameboard.forEach((i, iIndex) => {
      i.forEach((j, jIndex) => {
        const htmlCell = document.querySelector(
          `${container} > .cell[data-x="${iIndex}"][data-y="${jIndex}"]`,
        )
        const gameboardCell = gameboard[iIndex][jIndex]

        if (gameboardCell === 'miss') {
          htmlCell.className = 'cell miss'
        } else if (j === 'hit') {
          htmlCell.className = 'cell hit'
        } else if (j !== null && !isEnemy) {
          htmlCell.className = 'cell ship'
        } else {
          htmlCell.className = 'cell'
        }
      })
    })
  }

  animateShipSinking(coord, grid) {
    for (const [x, y] of coord) {
      const cell = document.querySelector(
        `${grid} [data-x="${x}"][data-y="${y}"]`,
      )

      cell.classList.add('cell-sunk-animate')
    }
  }

  showWinPopUp(kicker, title, message) {
    const popup = document.querySelector('.result-dialog')

    popup.querySelector('.result-kicker').textContent = kicker
    popup.querySelector('.result-title').textContent = title
    popup.querySelector('.result-message').textContent = message

    popup.showModal()
  }

  addHighlight(cell) {
    cell.classList.add('highlighted')
  }

  removeHighlight(cell) {
    cell.classList.remove('highlighted')
  }

  removeElement(selector) {
    const element = document.querySelector(selector)
    element.remove()
  }
}
