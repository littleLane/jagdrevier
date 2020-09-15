// 给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 保证原始二叉搜索树中不存在新值。
// 注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回任意有效的结果。

// 例如,

// 给定二叉搜索树:

//         4
//        / \
//       2   7
//      / \
//     1   3

// 和 插入的值: 5
// 你可以返回这个二叉搜索树:

//          4
//        /   \
//       2     7
//      / \   /
//     1   3 5
// 或者这个树也是有效的:

//          5
//        /   \
//       2     7
//      / \
//     1   3
//          \
//           4

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
function insertIntoBST1(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) {
    root = new TreeNode(val)
  }

  helperInsert(root, val)

  return root
}

function helperInsert(root: TreeNode, val: number) {
  if (root.val < val) {
    if (root.right) {
      insertIntoBST1(root.right, val)
    } else {
      root.right = new TreeNode(val)
    }
  } else if (root.val > val) {
    if (root.left) {
      insertIntoBST1(root.left, val)
    } else {
      root.left = new TreeNode(val)
    }
  }
}

function insertIntoBST2(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) {
    return new TreeNode(val)
  }

  if (root.val < val) {
    root.right = insertIntoBST2(root.right, val)
  } else {
    root.left = insertIntoBST2(root.left, val)
  }

  return root
}
