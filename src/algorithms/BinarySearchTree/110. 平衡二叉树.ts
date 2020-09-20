// 给定一个二叉树，判断它是否是高度平衡的二叉树。

// 本题中，一棵高度平衡二叉树定义为：

// 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。

// 示例 1:

// 给定二叉树 [3,9,20,null,null,15,7]

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回 true 。

// 示例 2:

// 给定二叉树 [1,2,2,3,3,null,null,4,4]

//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4
// 返回 false 。

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
 * 自顶向下的递归
 * @param root
 */
function isBalanced2(root: TreeNode | null): boolean {
  if (!root) return true

  const height = (root: TreeNode | null): number => {
    if (!root) return 0

    return Math.max(height(root.left), height(root.right)) + 1
  }

  return Math.abs(height(root.left) - height(root.right)) <= 1 && isBalanced2(root.left) && isBalanced2(root.right)
}

/**
 * 自底向上的递归
 * @param root
 */
function isBalanced3(root: TreeNode | null): boolean {
  const height = (root: TreeNode | null): number => {
    if (!root) return 0

    const leftH = height(root.left)
    const rightH = height(root.right)

    if (leftH === -1 || rightH === -1 || Math.abs(leftH - rightH) > 1) {
      return -1
    }

    return Math.max(leftH, rightH) + 1
  }

  return height(root) >= 0
}
