import Queue from '../index'

describe('Queue Test', () => {
  it('Construct instance of Queue successfully', () => {
    const queue = new Queue()

    expect(queue).toBeInstanceOf(Queue)
    expect(queue).toHaveProperty('push')
    expect(queue).toHaveProperty('peek')
    expect(queue).toHaveProperty('size')
    expect(queue).toHaveProperty('clear')
    expect(queue.size()).toEqual(0)

    queue.clear()
  })

  it('Queue should work well', () => {
    const queue = new Queue<number>()

    expect(queue.size()).toEqual(0)

    queue.push(1)
    expect(queue.size()).toEqual(1)

    queue.push(2)
    expect(queue.size()).toEqual(2)

    queue.push(3).push(4)
    expect(queue.size()).toEqual(4)

    const peek1 = queue.peek()
    expect(peek1).toEqual(1)

    expect(queue.getAll()).toEqual([2, 3, 4])

    queue.clear()
    expect(queue.size()).toEqual(0)
  })
})
