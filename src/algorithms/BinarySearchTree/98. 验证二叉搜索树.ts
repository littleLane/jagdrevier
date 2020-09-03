// 给定一个二叉树，判断其是否是一个有效的二叉搜索树。

// 假设一个二叉搜索树具有如下特征：
//   1、节点的左子树只包含小于当前节点的数。
//   2、节点的右子树只包含大于当前节点的数。
//   3、所有左子树和右子树自身必须也是二叉搜索树。

// 示例 1:
//   输入:
//       2
//     / \
//     1   3
//   输出: true

// 示例 2:
//   输入:
//       5
//     / \
//     1   4
//        / \
//       3   6
//   输出: false
//   解释: 输入为: [5,1,4,null,null,3,6]。
//        根节点的值为 5 ，但是其右子节点值为 4 。

/**
 * Definition for a binary tree node.
 */

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

/***************************1、中序遍历************************ */
/**
 * 中序遍历帮助函数
 * @param root
 * @param paths
 */
function inOrderHelper(root: TreeNode | null, paths: number[]) {
  if (root) {
    inOrderHelper(root.left, paths)

    paths.push(root.val)

    inOrderHelper(root.right, paths)
  }
}

/**
 * 中序遍历所得结果  有小到大
 * @param root
 */
function isValidBST1(root: TreeNode | null): boolean {
  // 不存在也算是一个二叉搜索树
  if (root === null) return true

  const paths: number[] = []

  inOrderHelper(root, paths)

  for (let i = paths.length - 1; i > 0; i -= 1) {
    if (paths[i] <= paths[i - 1]) {
      return false
    }
  }

  return true
}

/***************************2、递归验证************************ */
// 1、节点的左子树只包含小于当前节点的数。
// 2、节点的右子树只包含大于当前节点的数。
// 3、所有左子树和右子树自身必须也是二叉搜索树。
function helper(root: TreeNode | null, lower: number, upper: number): boolean {
  if (root === null) return true

  if (root.val <= lower || root.val >= upper) {
    return false
  }

  return helper(root.left, lower, root.val) && helper(root.right, root.val, upper)
}

function isValidBST2(root: TreeNode | null): boolean {
  return helper(root, -Infinity, Infinity)
}
