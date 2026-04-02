// cSpell:ignore gameboard
export class DOMController {
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
}
