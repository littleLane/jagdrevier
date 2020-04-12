import Stack from '../index'

describe('Stack Test', () => {
  it('Construct instance of Stack successfully', () => {
    const stack = new Stack()

    expect(stack).toBeInstanceOf(Stack)
    expect(stack).toHaveProperty('push')
    expect(stack).toHaveProperty('pop')
    expect(stack).toHaveProperty('size')
    expect(stack).toHaveProperty('clear')
    expect(stack.size()).toEqual(0)

    stack.clear()
  })

  it('Stack should work well', () => {
    const stack = new Stack<number>()

    expect(stack.size()).toEqual(0)

    stack.push(1)
    expect(stack.size()).toEqual(1)

    stack.push(2)
    expect(stack.size()).toEqual(2)

    stack.push(3).push(4)
    expect(stack.size()).toEqual(4)

    const popItem = stack.pop()
    expect(popItem).toEqual(4)

    expect(stack.getAll()).toEqual([1, 2, 3])

    stack.clear()
    expect(stack.size()).toEqual(0)
  })
})
