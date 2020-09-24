// 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

// 例如，给出
//   前序遍历 preorder = [3,9,20,15,7]
//   中序遍历 inorder = [9,3,15,20,7]
// 返回如下的二叉树：

//     3
//    / \
//   9  20
//     /  \
//    15   7

// 限制：0 <= 节点个数 <= 5000

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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  return helper(preorder, inorder, 0, preorder.length - 1, 0, inorder.length - 1)
}

function helper(
  preorder: number[],
  inorder: number[],
  preStart: number,
  preEnd: number,
  inStart: number,
  inEnd: number
) {
  if (preEnd > preStart || inEnd > inStart) {
    return null
  }

  const root = new TreeNode(preorder[preStart])

  if (preorder[preStart] === preorder[preEnd]) {
    return root
  }

  let index = 0
  while (inorder[index++] !== preorder[preStart]) {
    index++
  }

  root.left = helper(preorder, inorder, preStart + 1, preStart + 1 + index - 1 - inStart, inStart, index - 1)
  root.right = helper(preorder, inorder, preStart + 1 + index - 1 - inStart + 1, preEnd, index + 1, inEnd)

  return root
}
