import { FixedArray } from '../fixed-array/fixed-array.js'

export class ArrayListError extends Error { }

export class IndexOutOfBoundsError extends ArrayListError { }

export class ArrayList {

    static #growthFactor = 2

    #arr
    #size

    constructor(initialCapacity = 3) {
        this.#arr = new FixedArray(initialCapacity)
        this.#size = 0
    }

    get size() {
        return this.#size
    }

    get(index) {
        this.#checkGet(index)
        return this.#arr.get(index)
    }

    add(element) {
        this.insert(this.#size, element)
    }

    insert(index, element) {
        this.#checkInsert(index)
        if (this.#size + 1 < this.#arr.length) {
            if (index < this.#size) {
                for (let i = this.#size - 1; i >= index; i--) {
                    this.#arr.set(i + 1, this.#arr.get(i))
                }
            }
        } else {
            const tmp = this.#arr
            const newCapacity = ArrayList.#growthFactor * (this.#arr.length === 0
                ? 1
                : this.#arr.length)
            this.#arr = new FixedArray(newCapacity)
            for (let i = 0; i < this.#size; i++) {
                this.#arr.set(i, tmp.get(i))
            }
        }
        this.#arr.set(index, element)
        this.#size++
    }

    toString() {
        let s = '['
        for (let i = 0; i < this.#size; i++) {
            s += this.get(i)
            if (i < this.#size - 1) {
                s += ','
            }
        }
        s += ']'
        return s
    }

    #checkGet(index) {
        if (index < 0 || index >= this.#size) {
            throw new IndexOutOfBoundsError()
        }
    }

    #checkInsert(index) {
        if (index < 0 || index > this.#size) {
            throw new IndexOutOfBoundsError()
        }
    }
}