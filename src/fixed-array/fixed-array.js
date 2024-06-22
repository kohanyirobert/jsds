export class FixedArrayError extends Error {}

export class IndexOutOfBoundsError extends FixedArrayError {}

export class FixedArray {

    #arr

    constructor(length) {
        this.#arr = new Array(length)
    }

    get length() {
        return this.#arr.length
    }

    get(index) {
        this.#check(index)
        return this.#arr[index]
    }

    set(index, element) {
        this.#check(index)
        this.#arr[index] = element
    }

    toString() {
        return `[${this.#arr.toString()}]`
    }

    #check(index) {
        if (index < 0 || index >= this.#arr.length) {
            throw new IndexOutOfBoundsError()
        }
    }
}