// 在整数数组 nums 中，是否存在两个下标 i 和 j，使得 nums [i] 和 nums [j] 的差的绝对值小于等于 t ，且满足 i 和 j 的差的绝对值也小于等于 ķ 。

// 如果存在则返回 true，不存在返回 false。

// 示例 1:
//   输入: nums = [1,2,3,1], k = 3, t = 0
//   输出: true

// 示例 2:
//   输入: nums = [1,0,1,1], k = 1, t = 2
//   输出: true

// 示例 3:
//   输入: nums = [1,5,9,1,5,9], k = 2, t = 3
//   输出: false

// 暴力法 => 线性搜索
function containsNearbyAlmostDuplicate1(nums: number[], k: number, t: number): boolean {
  for (let i = 0, l = nums.length; i < l; i++) {
    for (let j = Math.max(i - k, 0); j < i; j++) {
      if (Math.abs(nums[i] - nums[j]) <= t) {
        return true
      }
    }
  }

  return false
}

function isNil(value: any) {
  return value === null || value === undefined
}

// 滑动窗口、查找表、桶排序
function containsNearbyAlmostDuplicate2(nums: number[], k: number, t: number): boolean {
  if (k < 0 || t < 0) return false

  const getKey = (value: number) => Math.floor(value / (t + 1))

  const resultMap: { [key: string]: number | null } = {}

  let i = 0

  while (i < nums.length) {
    const currentNum = nums[i]
    const key = getKey(currentNum)

    if (!isNil(resultMap[key])) return true

    const upKey = resultMap[key + 1]
    if (!isNil(upKey) && upKey! - currentNum <= t) return true

    const downKey = resultMap[key - 1]
    if (!isNil(downKey) && currentNum - downKey! <= t) return true

    resultMap[key] = currentNum

    if (i >= k) {
      resultMap[getKey(nums[i - k])] = null
    }

    i++
  }

  return false
}

console.log(containsNearbyAlmostDuplicate2([1, 5, 9, 1, 5, 9], 2, 3))
