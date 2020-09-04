// 实现一个二叉搜索树迭代器。你将使用二叉搜索树的根节点初始化迭代器。
// 调用 next() 将返回二叉搜索树中的下一个最小的数。

// 示例：
//   BSTIterator iterator = new BSTIterator(root);
//   iterator.next();    // 返回 3
//   iterator.next();    // 返回 7
//   iterator.hasNext(); // 返回 true
//   iterator.next();    // 返回 9
//   iterator.hasNext(); // 返回 true
//   iterator.next();    // 返回 15
//   iterator.hasNext(); // 返回 true
//   iterator.next();    // 返回 20
//   iterator.hasNext(); // 返回 false
//

// 提示：
//   next() 和 hasNext() 操作的时间复杂度是 O(1)，并使用 O(h) 内存，其中 h 是树的高度。
//   你可以假设 next() 调用总是有效的，也就是说，当调用 next() 时，BST 中至少存在一个下一个最小的数。

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
 * 先中序遍历获取所有节点值数组，然后针对数组做操作
 */
class BSTIterator1 {
  private result: number[]

  constructor(root: TreeNode | null) {
    this.result = []
    this.inOrderHelper(root, this.result)
  }

  inOrderHelper(root: TreeNode | null, result: number[]) {
    if (root) {
      this.inOrderHelper(root.left, result)
      this.result.push(root.val)
      this.inOrderHelper(root.right, result)
    }
  }

  next(): number {
    return this.result.shift() as number
  }

  hasNext(): boolean {
    return !!this.result.length
  }
}

/**
 * 通过 stack 模拟中序遍历
 */
class BSTIterator2 {
  private resultStack: TreeNode[] = []

  constructor(root: TreeNode | null) {
    this.pushNodeLeft(root)
  }

  pushNodeLeft(node: TreeNode | null) {
    while (node) {
      this.resultStack.push(node)
      node = node.left
    }
  }

  next(): number {
    const node = this.resultStack.pop()

    if (node?.right) {
      this.resultStack.push(node.right)
    }

    return node?.val as number
  }

  hasNext(): boolean {
    return !!this.resultStack.length
  }
}
