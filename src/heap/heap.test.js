import { expect, describe, it } from 'vitest'
import { MaxHeap, MinHeap, HeapFullError } from './heap.js'

describe('heap', () => {
    it('has 0 size when initialized', () => {
        const heap = new MinHeap(3)
        expect(heap.size).toBe(0)

        const heap2 = new MaxHeap(3)
        expect(heap2.size).toBe(0)
    })

    it('grows up to capacity', () => {
        const heap = new MinHeap(3)
        heap.insert(1)
        heap.insert(2)
        heap.insert(3)
        expect(heap.size).toBe(3)

        const heap2 = new MaxHeap(3)
        heap2.insert(3)
        heap2.insert(2)
        heap2.insert(1)
        expect(heap2.size).toBe(3)
    })

    it('cannot grow beyond its initial capacity', () => {
        const heap = new MinHeap(3)
        heap.insert(1)
        heap.insert(2)
        heap.insert(3)
        const t = () => heap.insert(4)
        expect(t).toThrow(HeapFullError)
    })

    it('min heap returns smallest value', () => {
        const heap = new MinHeap(5)
        heap.insert(20)
        heap.insert(40)
        heap.insert(50)
        heap.insert(10)
        heap.insert(30)

        expect(heap.size).toBe(5)
        expect(heap.get()).toBe(10)
    })

    it('max heap returns biggest value', () => {
        const heap = new MaxHeap(5)
        heap.insert(30)
        heap.insert(20)
        heap.insert(50)
        heap.insert(10)
        heap.insert(40)

        expect(heap.size).toBe(5)
        expect(heap.get()).toBe(50)
    })

    it('extracting min from min heap returns min', () => {
        const heap = new MinHeap(5)
        heap.insert(30)
        heap.insert(20)
        heap.insert(50)
        heap.insert(40)
        heap.insert(10)

        expect(heap.extract()).toBe(10)
        expect(heap.size).toBe(4)
        expect(heap.get()).toBe(20)
    })
})