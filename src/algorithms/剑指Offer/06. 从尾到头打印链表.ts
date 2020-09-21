// 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

// 示例 1：
//   输入：head = [1,3,2]
//   输出：[2,3,1]
//
// 限制：0 <= 链表长度 <= 10000

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

/**
 * 顺序遍历链表，将每个节点值通过 push 追加到结果数组，然后将结果数组反转
 * @param head
 */
function reversePrint1(head: ListNode | null): number[] {
  const result = []

  let cur: ListNode | null = head

  while (cur) {
    result.push(cur.val)
    cur = cur.next
  }

  return result.reverse()
}
