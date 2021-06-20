## canvas 元素大小

canvas 元素默认的大小是 300 x 150 个屏幕像素点，也就是 300px x 150px

有两种修改 canvas 元素大小的方式：

- 通过给 canvas 元素显示的指定 width 和 height 属性修改 canvas 元素的大小
- 通过 CSS 中的 width 和 height 属性改变 canvas 元素的大小

`说明：canvas 元素实际有两套尺寸：一是元素本身的大小，另外一个是元素绘图表面（drawing surface）的大小`

当设置 canvas 元素的 width 和 height 属性时，实际上是同时修改元素本身的大小和元素绘图表面的大小。然而，通过 CSS 属性设置 canvas 元素的大小只会改变元素本身的大小，对绘图表面的大小不会产生影响。

`推荐：通过 width 和 height 属性而非 CSS 属性来修改 canvas 元素的大小`

`注意：如果使用 CSS 修改元素的大小，同时又没有设置元素的 width 和 height 属性，那么当元素大小与 canvas 的绘图表面大小不相符时，浏览器会缩放后者，使之符合前者的大小。这样一来，很有可能会导致奇怪的、无用的效果`
