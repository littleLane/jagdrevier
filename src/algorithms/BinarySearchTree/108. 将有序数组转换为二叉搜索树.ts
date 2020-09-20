// 将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。

// 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

// 示例:
// 给定有序数组: [-10,-3,0,5,9],

// 一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

//       0
//      / \
//    -3   9
//    /   /
//  -10  5

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
 * 中序遍历  选中间靠左边的元素作为根节点
 * @param nums
 * @param start
 * @param end
 */
function sortedArrayToBST1(nums: number[], start: number = 0, end: number = nums.length - 1): TreeNode | null {
  if (!nums.length || start > end) return null

  const mid = Math.floor((start + end) / 2)

  return new TreeNode(nums[mid], sortedArrayToBST1(nums, start, mid - 1), sortedArrayToBST1(nums, mid + 1, end))
}
