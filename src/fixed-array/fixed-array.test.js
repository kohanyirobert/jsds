import { expect, describe, it } from 'vitest'
import { FixedArray, IndexOutOfBoundsError } from './fixed-array.js'

describe('fixed-array', () => {
    it('has zero length when initialized empty', () => {
        const arr = new FixedArray(0)
        expect(arr.length).toBe(0)
    })

    it('length works when initialized with greater than zero', () => {
        const arr = new FixedArray(5)
        expect(arr.length).toBe(5)
    })

    it('cannot be under-indexed', () => {
        const arr = new FixedArray(3)
        const t = () => arr.get(-1)
        expect(t).toThrow(IndexOutOfBoundsError)
    })

    it('cannot be over-indexed', () => {
        const arr = new FixedArray(3)
        const t = () => arr.get(3)
        expect(t).toThrow(IndexOutOfBoundsError)
    })

    it('has working get/set', () => {
        const arr = new FixedArray(3)
        arr.set(0, 'a')
        arr.set(1, 'b')
        arr.set(2, 'c')
        expect(arr.get(0)).toBe('a')
        expect(arr.get(1)).toBe('b')
        expect(arr.get(2)).toBe('c')
    })

    it('set overrides taken index', () => {
        const arr = new FixedArray(3)
        arr.set(2, 'a')
        expect(arr.get(2)).toBe('a')
        arr.set(2, 'b')
        expect(arr.get(2)).toBe('b')
    })

    it('can convert itself to string when capacity is same as length', () => {
        const arr = new FixedArray(3)
        arr.set(0, 'a')
        arr.set(1, 'b')
        arr.set(2, 'c')
        expect(arr.toString()).toBe('[a,b,c]')
    })

    it('can convert itself to string when capacity is greater than length', () => {
        const arr = new FixedArray(5)
        arr.set(0, 'a')
        arr.set(1, 'b')
        arr.set(2, 'c')
        expect(arr.toString()).toBe('[a,b,c,,]')
    })
})