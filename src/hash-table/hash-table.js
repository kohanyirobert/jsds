import { FixedArray } from '../fixed-array/fixed-array.js'

export class HashTableError extends Error { }

export class NoHashCodeError extends HashTableError { }

export class IllegalKeyError extends HashTableError { }

export class IllegalValueError extends HashTableError { }

export class HashTable {

    static #loadFactor = 0.75
    static #growthFactor = 2

    #keyArr
    #valueArr
    #size

    constructor(initialCapacity = 3) {
        this.#keyArr = new FixedArray(initialCapacity)
        this.#valueArr = new FixedArray(initialCapacity)
        this.#size = 0
    }

    get size() {
        return this.#size
    }

    set(key, value) {
        this.#checkValue(value)
        const index = this.#index(key)
        if (this.#loaded) {
            const tmp = this.#valueArr
            const newCapacity = HashTable.#growthFactor * (this.#valueArr.length === 0
                ? 1
                : this.#valueArr.length)
            this.#valueArr = new FixedArray(newCapacity)
        }
        this.#valueArr.set(index, value)
        this.#size++
    }

    get(key) {
        return this.#valueArr.get(this.#index(key))
    }

    #index(key) {
        return this.#hashCode(key) % this.#valueArr.length
    }

    get #load() {
        return this.#size / this.#valueArr.length
    }

    get #loaded() {
        return this.#load > HashTable.#loadFactor
    }

    #checkValue(value) {
        if (value === undefined) {
            throw new IllegalValueError()
        }
    }

    #hashCode(key) {
        if (typeof key.hashCode !== 'function') {
            throw new NoHashCodeError()
        }
        const hashCode = key.hashCode()
        if (!Number.isInteger(hashCode) || hashCode < 0) {
            throw new IllegalKeyError()
        }
        return hashCode
    }
}