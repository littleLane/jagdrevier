// 设计一个找到数据流中第K大元素的类（class）。注意是排序后的第K大元素，不是第K个不同的元素。

// 你的 KthLargest 类需要一个同时接收整数 k 和整数数组nums 的构造器，它包含数据流中的初始元素。每次调用 KthLargest.add，返回当前数据流中第K大的元素。

// 示例:
//   int k = 3;
//   int[] arr = [4,5,8,2];
//   KthLargest kthLargest = new KthLargest(3, arr);
//   kthLargest.add(3);   // returns 4
//   kthLargest.add(5);   // returns 5
//   kthLargest.add(10);  // returns 5
//   kthLargest.add(9);   // returns 8
//   kthLargest.add(4);   // returns 8

// 说明:
// 你可以假设 nums 的长度≥ k-1 且k ≥ 1。

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

// js 数组排序 + splice 插入
class KthLargest {
  k: number
  nums: number[]

  constructor(k: number, nums: number[]) {
    this.k = k
    this.nums = nums.sort((a, b) => b - a)
  }

  add(val: number): number {
    let pos = this.nums.length

    for (let i = 0; i < pos; i++) {
      if (this.nums[i] < val) {
        pos = i
        break
      }
    }

    this.nums.splice(pos, 0, val)

    return this.nums[this.k - 1]
  }
}
