// 应用还没加载
export const NOT_LOADED = 'NOT_LOADED'

// 加载资源中
export const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE'

// 应用尚未启动
export const NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED'

// 应用启动中
export const BOOTSTRAPPING = 'BOOTSTRAPPING'

// 应用尚未挂载
export const NOT_MOUNTED = 'NOT_MOUNTED'

// 应用挂载中
export const MOUNTING = 'MOUNTING'

// 应用挂载完成
export const MOUNTED = 'MOUNTED'

// 应用更新中
export const UPDATING = 'UPDATING'

// 应用卸载中
export const UNMOUNTING = 'UNMOUNTING'

// 应用卸载完成
export const UNLOADING = 'UNLOADING'

// 资源加载失败
export const LOAD_ERR = 'LOAD_ERR'

// 应用代码异常
export const SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN'

// 当前应用是否已经挂载
export function isActive(app) {
  return app.status === MOUNTED
}

/**
 * 应用是否需要激活
 * @param {*} app
 */
export function shouldBeActive(app) {
  return app.activeWhen(window.location)
}
