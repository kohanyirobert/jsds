import { FixedArray } from "../fixed-array/fixed-array"

export class HeapError extends Error { }

class HeapAbstractError extends Error { }

export class HeapFullError extends HeapError { }

class Heap {

    #arr
    #size
    #min

    constructor(length, min = true) {
        if (this.constructor === Heap) {
            throw new HeapAbstractError()
        }
        this.#arr = new FixedArray(length)
        this.#min = min
        this.#size = 0
    }

    get size() {
        return this.#size
    }

    get() {
        return this.#arr.get(0)
    }

    extract() {
        const root = this.#arr.get(0)
        const last = this.#arr.get(this.#size - 1)
        this.#arr.set(0, last)
        this.#arr.set(this.#size - 1, undefined)
        this.#size--
        this.#downheap(last, 0)
        return root
    }

    insert(element) {
        const index = this.#size
        if (index < this.#arr.length) {
            this.#arr.set(index, element)
            this.#upheap(index)
            this.#size++
        } else {
            throw new HeapFullError()
        }
    }

    #upheap(childIndex) {
        if (childIndex === 0 || this.#size === 0) {
            return
        }
        const child = this.#arr.get(childIndex)
        const parentIndex = Math.floor((childIndex - 1) / 2)
        const parent = this.#arr.get(parentIndex)
        if (this.#correct(parent, child)) {
            return
        }
        this.#swap(parent, parentIndex, child, childIndex)
        this.#upheap(parentIndex)
    }


    #downheap(parent, parentIndex) {
        if (parentIndex >= this.#size) {
            return
        }
        const leftIndex = 2 * parentIndex + 1
        const rightIndex = 2 * parentIndex + 2
        const left = this.#arr.get(leftIndex)
        const right = this.#arr.get(rightIndex)
        const leftCorrect = left === undefined
            ? true
            : this.#correct(parent, left)
        const rightCorrect = right === undefined
            ? true
            : this.#correct(parent, right)
        if (leftCorrect && rightCorrect) {
            return
        } else if (leftCorrect && !rightCorrect) {
            this.#swap(parent, parentIndex, right, rightIndex)
            this.#downheap(parent, rightIndex)
        } else if (!leftCorrect && rightCorrect) {
            this.#swap(parent, parentIndex, left, leftIndex)
            this.#downheap(parent, leftIndex)
        } else if (this.#min) {
            const [smaller, smallerIndex] = Math.min([left, leftIndex], [right, rightIndex])
            this.#swap(parent, parentIndex, smaller, smallerIndex)
            this.#downheap(parent, smallerIndex)
        } else if (!this.#min) {
            const [larger, largerIndex] = Math.max([left, leftIndex], [right, rightIndex])
            this.#swap(parent, parentIndex, larger, largerIndex)
            this.#downheap(parent, largerIndex)
        }
    }

    #correct(parent, child) {
        return this.#min
            ? parent < child
            : parent > child
    }

    #swap(parent, parentIndex, child, childIndex) {
        this.#arr.set(childIndex, parent)
        this.#arr.set(parentIndex, child)
    }
}

export class MinHeap extends Heap {

    constructor(length) {
        super(length, true)
    }
}

export class MaxHeap extends Heap {

    constructor(length) {
        super(length, false)
    }
}