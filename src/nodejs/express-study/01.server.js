const path = require('path')
const express = require('express')

// 创建一个 app 应用
const app = express()
const port = 3000

// __dirname 指向当前执行 js 文件的目录
app.use(express.static(path.join(__dirname, '../../assets')))

// 为 / 配置一个路由
// 当通过 localhost:3000 访问的时候，就可以返回相应的信息
app.get('/', (req, res) => {
  res.status
  res.send('Hello World！')
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})

// 通过 listen 方法监听一个端口启动服务
const server = app.listen(port, () => {
  console.log(server.address())
  console.log(`Example app listening on port ${port}!`)
})
