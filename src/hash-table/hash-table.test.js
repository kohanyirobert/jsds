import { expect, describe, it } from 'vitest'
import { HashTable, IllegalKeyError, IllegalValueError, NoHashCodeError } from './hash-table.js'

String.prototype.hashCode = function () {
    let hash = 37
    for (let i = 0; i < this.length; i++) {
        hash *= this[i].charCodeAt(i) * 17
    }
    return hash
}

class Key {
    #value

    constructor(value) {
        this.#value = value
    }

    hashCode() {
        return this.#value.charCodeAt(0) * 37
    }
}

class IllegalKey {
    
    hashCode() {
        return 'not a hash-code'
    }
}

class NegativeKey {
    
    hashCode() {
        return -123
    }
}

describe('hash-table', () => {
    it('throws when hashCode not present', () => {
        const ht = new HashTable()
        const t = () => ht.set(1, 'a')
        expect(t).toThrow(NoHashCodeError)
    })

    it('throws when hashCode is illegal', () => {
        const ht = new HashTable()
        const t = () => ht.set(new IllegalKey(), 1)
        expect(t).toThrow(IllegalKeyError)
    })

    it('throws when hashCode is negative', () => {
        const ht = new HashTable()
        const t = () => ht.set(new NegativeKey(), 1)
        expect(t).toThrow(IllegalKeyError)
    })

    it('cannot store undefined as value', () => {
        const ht = new HashTable()
        const t = () => ht.set('a', undefined)
        expect(t).toThrow(IllegalValueError)
    })

    it('cannot store null as value', () => {
        const ht = new HashTable()
        ht.set('a', null)
        expect(ht.size).toBe(1)
        expect(ht.get('a')).toBeNull()
    })

    it('can store and retrieve using string key', () => {
        const cap = 3
        const ht = new HashTable(cap)
        ht.set('a', 1)
        ht.set('b', 2)
        ht.set('c', 3)
        expect(ht.size).toBe(3)
        expect(ht.get('a')).toBe(1)
        expect(ht.get('b')).toBe(2)
        expect(ht.get('c')).toBe(3)
    })

    it('can store and retrieve using class instance key', () => {
        const cap = 3
        const ht = new HashTable(cap)
        ht.set(new Key('a'), 1)
        ht.set(new Key('b'), 2)
        ht.set(new Key('c'), 3)
        expect(ht.size).toBe(3)
        expect(ht.get(new Key('a'))).toBe(1)
        expect(ht.get(new Key('b'))).toBe(2)
        expect(ht.get(new Key('c'))).toBe(3)
    })
})