// 给出一个区间的集合，请合并所有重叠的区间。

// 示例 1:
//   输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
//   输出: [[1,6],[8,10],[15,18]]
//   解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6]

// 示例 2:
//   输入: intervals = [[1,4],[4,5]]
//   输出: [[1,5]]
//   解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间

// 提示：intervals[i][0] <= intervals[i][1]

function merge(intervals: number[][]): number[][] {
  // 按子元素数组的序号 0 从小打到进行排序，得到递增数组
  intervals = intervals.sort((a, b) => a[0] - b[0])

  const result = []

  // 记录下边，同时为 result 赋值
  let idx = -1

  // 遍历 intervals，将每项和 result 最后一项的值进行比较
  for (let interval of intervals) {
    // 如果结果数组是空的，或者当前区间的起始位置 > 结果数组中最后区间的终止位置，
    // 则不合并，直接将当前区间加入结果数组
    if (idx === -1 || interval[0] > result[idx][1]) {
      result[++idx] = interval
    } else {
      // 反之将当前区间合并至结果数组的最后区间
      result[idx][1] = Math.max(result[idx][1], interval[1])
    }
  }

  return result
}
