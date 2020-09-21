// 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

// 示例:
//   现有矩阵 matrix 如下：

//   [
//     [1,   4,  7, 11, 15],
//     [2,   5,  8, 12, 19],
//     [3,   6,  9, 16, 22],
//     [10, 13, 14, 17, 24],
//     [18, 21, 23, 26, 30]
//   ]
//   给定 target = 5，返回 true。
//   给定 target = 20，返回 false。

// 限制：
//   0 <= n <= 1000
//   0 <= m <= 1000

/**
 * 每一行都按照从左到右递增的顺序排序
 * 每一列都按照从上到下递增的顺序排序
 * 特性：以右上角，即 [0][row.length - 1] 为起点，向下递增，向左递减
 * @param matrix
 * @param target
 */
function findNumberIn2DArray1(matrix: number[][], target: number): boolean {
  if (!matrix || !matrix.length) {
    return false
  }

  const rlen = matrix.length
  const clen = matrix[0].length

  let curR = 0
  let curC = clen - 1

  while (curR < rlen && curC >= 0) {
    if (matrix[curR][curC] > target) {
      curC--
    } else if (matrix[curR][curC] < target) {
      curR++
    } else {
      return true
    }
  }

  return false
}

/**
 * 每一行都按照从左到右递增的顺序排序
 * 每一列都按照从上到下递增的顺序排序
 * 特性：以左下角，即 [col.length - 1][0] 为起点，向上递减，向右递增
 * @param matrix
 * @param target
 */
function findNumberIn2DArray2(matrix: number[][], target: number): boolean {
  if (!matrix || !matrix.length) {
    return false
  }

  const rlen = matrix.length
  const clen = matrix[0].length

  let curR = rlen - 1
  let curC = 0

  while (curR >= 0 && curC < clen) {
    if (matrix[curR][curC] > target) {
      curR--
    } else if (matrix[curR][curC] < target) {
      curC++
    } else {
      return true
    }
  }

  return false
}
