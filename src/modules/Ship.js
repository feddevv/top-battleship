export class Ship {
  #hitCount = 0
  #length

  constructor(length) {
    this.#length = length
  }

  get hitCount() {
    return this.#hitCount
  }

  hit() {
    this.#hitCount++
  }

  isSunk() {
    if (this.#hitCount === this.#length) return true
    return false
  }
}
