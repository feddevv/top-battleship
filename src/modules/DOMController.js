// cSpell:ignore gameboard
export class DOMController {
  renderGrid(gameboard, container, isEnemy = false) {
    gameboard.forEach((i) => {
      i.forEach((j) => {
        const div = document.createElement('div')
        div.className = `cell`

        if (j === 'miss') {
          div.classList.add('miss')
        } else if (j === 'hit') {
          div.classList.add('hit')
        } else if (j !== null && !isEnemy) {
          div.classList.add('ship')
        }

        document.querySelector(container).appendChild(div)
      })
    })
  }
}
