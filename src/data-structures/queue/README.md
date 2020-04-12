# Queue（队列）

队列是一种对数据的 `存` 和 `取` 有严格要求的线性存储结构，而且队列的两端都 "开口"，要求数据只能从一端`（队尾）`进，从另一端`（对头）`出

![queue](../../assets/queue.gif)

`先进先出` 是队列中数据进出遵循的规则，就好比我们平时排队办事一样。先来的人在的对头，会先处理事务，而后来的人只能站在前面一个人的后面，会等前面的人处理完事务后，再处理事务。

拿上图中的队列来说，从数据在队列中的存储状态可以分析出，元素 1 最先进队，其次是元素 2，最后是元素 3。此时如果将元素 3 出队，根据队列 "先进先出" 的特点，元素 1 要先出队列，元素 2 再出队列，最后才轮到元素 3 出队列。

## 队列的实现

队列存储结构的实现有以下两种方式：

- 顺序队列：在顺序表的基础上实现的队列结构
- 链队列：在链表的基础上实现的队列结构

```
两者的区别仅是顺序表和链表的区别，即在实际的物理空间中，数据集中存储的队列是顺序队列，分散存储的队列是链队列。
```