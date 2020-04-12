/**
 * 利用数组实现队列
 */
export default class Queue<T> {
  private queue: T[]

  constructor() {
    this.queue = []
  }

  push(item: T) {
    this.queue.push(item)
    return this
  }

  peek() {
    return this.queue.shift()
  }

  size() {
    return this.queue.length
  }

  getAll() {
    return this.queue
  }

  clear() {
    this.queue = []
  }
}
