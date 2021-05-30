const http = require('http')
const url = require('url')
const fs = require('fs')
const etag = require('etag')

function expiresCache(req, res) {
  /***** Expires 强制缓存：一个绝对的 UTC 时间，会和发起请求时 request header 里面的 date 做比较 ****************/
  res.writeHead(200, {
    Expires: new Date('2021-05-27 19:30:00').toUTCString(),
  })
}

function cacheControl(req, res) {
  /*
    * Cache-Control 强制缓存
    *   max-age：单位为 s 的时间长度，表示服务器端告知客户端浏览器响应资源的过期时长
    *   s-maxage：单位为 s 的时间长度，表示缓存在代理服务器中的过期时长，且仅当设置了 public 属性值时才有效

    *   no-cache：不是不使用缓存，而是表示强制使用协商缓存，即始终发起请求向服务器确认资源的缓存有效性
    *   no-store：禁止任何形式的缓存策略

    *   private：限制响应资源只能被浏览器缓存，为默认值
    *   public：表示响应资源既可以被浏览器缓存，又可以被代理服务器缓存
    **/
  res.writeHead(200, {
    // 'Cache-Control': 'max-age=300',
    // 'Cache-Control': 'no-cache',
    // 'Cache-Control': 'no-store',
  })
}

function lastModifiedCache(req, res) {
  const { mtime } = fs.statSync('./images/2.jpg')
  const ifModifiedSince = req.headers['if-modified-since']

  if (ifModifiedSince && ifModifiedSince === mtime.toUTCString()) {
    res.statusCode = 304
    res.end()
    return
  }

  fs.readFile('./images/2.jpg', (err, data) => {
    if (err) {
      res.statusCode = 404
      res.end()
      return
    }

    res.writeHead(200, {
      // 启用协商缓存
      'Cache-Control': 'no-cache',

      'last-modified': mtime.toUTCString(),
    })

    res.end(data)
  })
}

function etagCache(req, res) {
  fs.readFile('./images/2.jpg', (err, data) => {
    if (err) {
      res.statusCode = 404
      res.end()
      return
    }

    const fileEtag = etag(data)
    const ifNoneMatch = req.headers['if-none-match']

    if (ifNoneMatch === fileEtag) {
      res.statusCode = 304
      res.end()
      return
    }

    res.writeHead(200, {
      // 启用协商缓存
      'Cache-Control': 'no-cache',

      etag: fileEtag,
    })

    res.end(data)
  })
}

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  console.log(req.method, req.url)

  switch (pathname) {
    case '/':
      fs.readFile('./index.html', 'utf8', (err, data) => {
        if (err) {
          res.statusCode = 404
          res.end()
          return
        }

        res.end(data)
      })

      break
    case '/images/1.jpg':
      fs.readFile('./images/1.jpg', (err, data) => {
        if (err) {
          res.statusCode = 404
          res.end()
          return
        }

        // 通过 Expires Header 实现强制缓存
        // expiresCache(req, res)

        // 通过  Cache-Control Header 实现强制缓存
        // cacheControl(req, res)

        res.end(data)
      })

      break
    case '/images/2.jpg':
      // 通过 Last-modified 实现协商缓存
      // lastModifiedCache(req, res)

      // 通过 ETag 实现协商缓存
      etagCache(req, res)

      break
    default:
      res.statusCode = 404
      res.end()
  }
})

server.listen(8080, () => {
  console.log('server is listen on 8080')
})
