class LinkNode<T> {
  element: T | undefined
  next: LinkNode<T> | null = null

  constructor(element?: T) {
    this.element = element
  }
}

/**
 * 单链表实现
 */
export default class LinkedList<T> {
  head: LinkNode<T>

  constructor() {
    this.head = new LinkNode<T>()
  }

  find(item: T) {
    let currentNode = this.head.next

    while (currentNode && currentNode.element !== item) {
      currentNode = currentNode.next
    }

    return currentNode
  }

  insert(newElement: T, item?: T) {
    if ([null, undefined].includes(newElement as any)) {
      return
    }

    const newNode = new LinkNode(newElement)
    let currentNode = this.head.next ? this.head.next : this.head

    if (![null, undefined].includes(item as any)) {
      while (currentNode && currentNode.element !== item && currentNode.next) {
        currentNode = currentNode.next
      }

      if (currentNode && currentNode.next) {
        newNode.next = currentNode.next
        currentNode.next = newNode
      } else {
        currentNode.next = newNode
      }
    } else {
      while (currentNode && currentNode.next) {
        currentNode = currentNode.next
      }

      currentNode.next = newNode
    }
  }

  remove(item: T) {
    let currentNode = this.head

    while (currentNode.next && currentNode.next.element !== item) {
      currentNode = currentNode.next
    }

    if (currentNode.next) {
      currentNode.next = currentNode.next.next
      currentNode.next!.next = null
    }
  }
}
