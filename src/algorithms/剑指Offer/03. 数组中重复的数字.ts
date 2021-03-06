// 找出数组中重复的数字。
// 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

// 示例 1：
//   输入：
//   [2, 3, 1, 0, 2, 5, 3]
//   输出：2 或 3
//
// 限制：2 <= n <= 100000

/**
 * lastIndexOf   time => o(n)  space => o(1)
 * @param nums
 */
function findRepeatNumber1(nums: number[]): number {
  for (let i = 0, l = nums.length; i < l; i++) {
    const num = nums[i]
    const lastIndex = nums.lastIndexOf(nums[i])

    if (lastIndex !== i) {
      return num
    }
  }

  return -1
}

/**
 * 先排序，然后比较前后两值是否相等   time => o(nlogn)  space => o(n)
 * @param nums
 */
function findRepeatNumber2(nums: number[]): number {
  nums = nums.sort((a, b) => a - b)

  for (let i = 1, l = nums.length; i < l; i++) {
    if (nums[i] === nums[i - 1]) {
      return nums[i]
    }
  }

  return -1
}

/**
 * 缓存法，也就是题解里面说到的 hash 表法   time => o(n)  space => o(n)
 * @param nums
 */
function findRepeatNumber3(nums: number[]): number {
  const numSet = new Set()

  for (let i = 0, l = nums.length; i < l; i++) {
    const num = nums[i]

    if (numSet.has(num)) {
      return num
    }

    if (i < l - 1) {
      numSet.add(num)
    }
  }

  return -1
}

/**
 * 原地置换   time => o(n)  space => o(1)
 * @param nums
 */
function findRepeatNumber4(nums: number[]): number {
  for (let i = 0, l = nums.length; i < l; i++) {
    const num = nums[i]

    if (num === i) {
      continue
    }

    if (num === nums[num]) {
      return num
    }

    ;[nums[i], nums[num]] = [nums[num], nums[i]]

    i--
  }

  return -1
}
