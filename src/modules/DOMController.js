// cSpell:ignore gameboard
export class DOMController {
  clearGrid(container) {
    const grid = document.querySelector(container)
    grid.innerHTML = ''
  }

  renderGrid(gameboard, container, isEnemy = false) {
    const grid = document.querySelector(container)
    grid.innerHTML = ''
    gameboard.forEach((i, iIndex) => {
      i.forEach((j, jIndex) => {
        const div = document.createElement('div')
        div.className = `cell`
        div.dataset.x = iIndex
        div.dataset.y = jIndex

        if (j === 'miss') {
          div.classList.add('miss')
        } else if (j === 'hit') {
          div.classList.add('hit')
        } else if (j !== null && !isEnemy) {
          div.classList.add('ship')
        }

        grid.appendChild(div)
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
}
