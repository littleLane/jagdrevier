/**
 * 利用数组实现栈
 */
export default class Stack<T> {
  private stack: T[]

  constructor() {
    this.stack = []
  }

  push(item: T) {
    this.stack.push(item)
    return this
  }

  pop(): T | undefined {
    return this.stack.pop()
  }

  size(): number {
    return this.stack.length
  }

  getAll(): T[] {
    return this.stack
  }

  clear() {
    this.stack = []
  }
}
