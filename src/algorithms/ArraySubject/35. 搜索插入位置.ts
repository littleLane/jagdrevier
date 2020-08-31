// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
// 你可以假设数组中无重复元素。

// 示例 1:
//   输入: [1,3,5,6], 5
//   输出: 2

// 示例 2:
//   输入: [1,3,5,6], 2
//   输出: 1

// 示例 3:
//   输入: [1,3,5,6], 7
//   输出: 4

// 示例 4:
//   输入: [1,3,5,6], 0
//   输出: 0

/**
 * API + 暴力 求解
 * @param nums
 * @param target
 */
function searchInsert1(nums: number[], target: number): number {
  const len = nums.length

  if (len === 0) return 0
  if (nums[len - 1] < target) return len

  const indexof = nums.indexOf(target)

  if (indexof > -1) {
    return indexof
  }

  for (let i = 0, l = len; i < l; i++) {
    if (nums[i] > target) {
      return i
    }
  }

  return len
}

/**
 * 二分查找
 * @param nums
 * @param target
 */
function searchInsert2(nums: number[], target: number): number {
  const len = nums.length

  if (len === 0) return 0
  if (nums[len - 1] < target) return len

  let low = 0
  let high = nums.length - 1

  // 注意： 这里是 low <= high，而不是原始的 low < high，要多走一步！
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)

    if (nums[mid] < target) {
      low = mid + 1
    } else if (nums[mid] > target) {
      high = mid - 1
    } else {
      return mid
    }
  }

  return low
}
