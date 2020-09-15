// 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。

// 一般来说，删除节点可分为两个步骤：

// 首先找到需要删除的节点；
// 如果找到了，删除它。
// 说明： 要求算法时间复杂度为 O(h)，h 为树的高度。

// 示例:

// root = [5,3,6,2,4,null,7]
// key = 3

//     5
//    / \
//   3   6
//  / \   \
// 2   4   7

// 给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。

// 一个正确的答案是 [5,4,6,2,null,null,7], 如下图所示。

//     5
//    / \
//   4   6
//  /     \
// 2       7

// 另一个正确答案是 [5,2,6,null,4,null,7]。

//     5
//    / \
//   2   6
//    \   \
//     4   7

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

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return root

  // 查找要删除的节点
  if (root.val > key) {
    root.left = deleteNode(root.left, key)
  } else if (root.val < key) {
    root.right = deleteNode(root.right, key)
  } else {
    // 找到要删除的节点 ======>
    // 1、目标节点无左右子树，即为叶子节点
    if (!root.left && !root.right) {
      root = null
    } else if (root.left && !root.right) {
      // 2、目标节点有左子树，无右子树
      root = root.left
    } else if (!root.left && root.right) {
      // 3、目标节点有右子树，无左子树
      root = root.right
    } else if (root.left && root.right) {
      // 4、目标节点拥有左右子树，则需要找到比该节点大的最小右子树节点替换自己
      let last = root.right

      while (last.left) {
        last = last.left
      }

      // 用比目标节点大的最小右子树节点替换自己
      root.val = last.val

      // 替换完成后，删除比目标节点大的最小右子树节点
      root.right = deleteNode(root.right, last.val)
    }
  }

  return root
}
