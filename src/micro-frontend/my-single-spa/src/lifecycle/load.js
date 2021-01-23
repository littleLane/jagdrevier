import { LOADING_SOURCE_CODE, NOT_BOOTSTRAPPED } from '../applications/appHelper'

/**
 * 串联 promis
 * @param {*} fns
 */
function flattenFnArray(fns) {
  fns = Array.isArray(fns) ? fns : [fns]

  return function (props) {
    return fns.reduce((p, fn) => p.then(() => fn(props)), Promise.resolve())
  }
}

/**
 * 加载应用
 * @param {*} app
 */
export async function toLoadPromise(app) {
  // promise 缓存
  if (app.loadPromise) {
    return app.loadPromise
  }

  return (app.loadPromise = Promise.resolve().then(async () => {
    // 将应用状态置为 加载资源中
    app.status = LOADING_SOURCE_CODE

    // 获取子应用的接入协议
    // registerApplication 方法的第二个传参
    const { bootstrap, mount, unmount } = await app.loadApp(app.customProps)

    // 应用加载完后，将应用状态置为 待启动
    app.status = NOT_BOOTSTRAPPED

    // 扁平化 bootstrap，mount，unmount
    app.bootstrap = flattenFnArray(bootstrap)
    app.mount = flattenFnArray(mount)
    app.unmount = flattenFnArray(unmount)

    delete app.loadPromise

    return app
  }))
}
