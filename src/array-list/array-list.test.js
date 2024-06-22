import { expect, describe, it } from 'vitest'
import { ArrayList, IndexOutOfBoundsError } from './array-list.js'

describe('array-list', () => {
    it('has size when initialized', () => {
        const list = new ArrayList()
        expect(list.size).toBe(0)
    })

    it('cannot be under-indexed', () => {
        const list = new ArrayList()
        const t = () => list.get(-1)
        expect(t).toThrow(IndexOutOfBoundsError)
    })

    it('cannot be over-indexed', () => {
        const list = new ArrayList()
        const t = () => list.get(4)
        expect(t).toThrow(IndexOutOfBoundsError)
    })

    it('cannot be over-indexed (even the index is 0)', () => {
        const list = new ArrayList()
        const t = () => list.get(0)
        expect(t).toThrow(IndexOutOfBoundsError)
    })

    it('cannot be over-indexed (even the index is 1)', () => {
        const list = new ArrayList()
        const t = () => list.get(1)
        expect(t).toThrow(IndexOutOfBoundsError)
    })

    it('grows in size when elements are added', () => {
        const cap = 1
        const list = new ArrayList(cap)
        expect(list.size).toBe(0)
        list.add('a')
        list.add('b')
        list.add('c')
        expect(list.size).toBe(3)
        expect(list.get(0)).toBe('a')
        expect(list.get(1)).toBe('b')
        expect(list.get(2)).toBe('c')
    })

    it('insert into empty list at 0th index works', () => {
        const cap = 0
        const list = new ArrayList(cap)
        expect(list.size).toBe(0)
        list.insert(0, 'a')
        expect(list.size).toBe(1)
        expect(list.get(0)).toBe('a')
    })

    it('add into empty list works', () => {
        const cap = 0
        const list = new ArrayList(cap)
        expect(list.size).toBe(0)
        list.add('a')
        expect(list.size).toBe(1)
        expect(list.get(0)).toBe('a')
    })

    it('inserting at the head shifts elements', () => {
        const cap = 3
        const list = new ArrayList(cap)
        expect(list.size).toBe(0)
        list.add('a')
        list.add('b')
        list.add('c')
        list.insert(0, 'x')
        expect(list.size).toBe(4)
        expect(list.get(0)).toBe('x')
        expect(list.get(1)).toBe('a')
        expect(list.get(2)).toBe('b')
        expect(list.get(3)).toBe('c')
    })

    it('inserting at the middle shifts following elements', () => {
        const cap = 3
        const list = new ArrayList(cap)
        expect(list.size).toBe(0)
        list.add('a')
        list.add('b')
        list.add('c')
        list.insert(2, 'x')
        expect(list.size).toBe(4)
        expect(list.get(0)).toBe('a')
        expect(list.get(1)).toBe('b')
        expect(list.get(2)).toBe('x')
        expect(list.get(3)).toBe('c')
    })

    it('inserting at the tail does not shift elements', () => {
        const cap = 3
        const list = new ArrayList(cap)
        expect(list.size).toBe(0)
        list.add('a')
        list.add('b')
        list.add('c')
        list.insert(3, 'x')
        expect(list.size).toBe(4)
        expect(list.get(0)).toBe('a')
        expect(list.get(1)).toBe('b')
        expect(list.get(2)).toBe('c')
        expect(list.get(3)).toBe('x')
    })

    it('insert beyond tail fails', () => {
        const cap = 3
        const list = new ArrayList(cap)
        list.add('a')
        list.add('b')
        list.add('c')
        const t = () => list.insert(4, 'x')
        expect(t).toThrow(IndexOutOfBoundsError)
    })

    it('can convert itself into string', () => {
        const cap = 5
        const list = new ArrayList(cap)
        list.add('a')
        list.add('b')
        list.add('c')
        expect(list.toString()).toBe('[a,b,c]')
    })
})