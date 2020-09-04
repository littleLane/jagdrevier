// 给定二叉搜索树（BST）的根节点和一个值。 你需要在BST中找到节点值等于给定值的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 NULL。

// 例如:

// 给定二叉搜索树:

//         4
//        / \
//       2   7
//      / \
//     1   3

// 和值: 2
// 你应该返回如下子树:

//       2
//      / \
//     1   3

// 在上述示例中，如果要找的值是 5，但因为没有节点值为 5，我们应该返回 NULL。

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
 * 1、当前节点为 null 或者当前节点的值等于要查找的值，直接返回当前节点
 * 2、按场景否则递归遍历
 *    1、如果当前节点的值小于需要查找的值，依照二叉搜索树的特点，需要到节点的右子树进行查找
 *    2、如果当前节点的值大于需要查找的值，依照二叉搜索树的特点，需要到节点的左子树进行查找
 * @param root
 * @param val
 */
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (root === null || root.val === val) return root

  return searchBST(root.val < val ? root?.right : root?.left, val)
}
