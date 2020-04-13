import LinkedList from '../index'

describe('LinkedList Test', () => {
  it('Construct instance of LinkedList successfully', () => {
    const linkedList = new LinkedList()

    expect(linkedList).toBeInstanceOf(LinkedList)
    expect(linkedList).toHaveProperty('insert')
    expect(linkedList).toHaveProperty('find')
  })

  it('LinkedList should work well', () => {
    const linkedList = new LinkedList<number>()

    expect(linkedList.find(0)).toBeNull()
    linkedList.insert(0)
    expect(linkedList.find(0)).toEqual({ element: 0, next: null })
    linkedList.insert(null as any)
    expect(linkedList.find(0)).toEqual({ element: 0, next: null })
    linkedList.insert(1)
    expect(linkedList.find(0)).toEqual({ element: 0, next: { element: 1, next: null } })
    linkedList.insert(2, 0)
    expect(linkedList.find(0)).toEqual({ element: 0, next: { element: 2, next: { element: 1, next: null } } })
    expect(linkedList.find(1)?.next).toBeNull()
    linkedList.remove(2)
    expect(linkedList.find(0)).toEqual({ element: 0, next: { element: 1, next: null } })
  })
})
