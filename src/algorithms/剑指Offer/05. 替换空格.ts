// 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

// 示例 1：
//   输入：s = "We are happy."
//   输出："We%20are%20happy."
//
// 限制：0 <= s 的长度 <= 10000

/**
 * replace + 正则
 * @param s
 */
function replaceSpace1(s: string): string {
  return s.replace(/\s/g, '%20')
}
