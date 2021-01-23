import { NOT_LOADED, UNLOADING } from '../applications/appHelper'

const appsToUnload = {}

// 完全卸载应用
export async function toUnloadPromise(app) {
  // 根据应用名称判断该应用是否存在于即将卸载的应用列表
  if (!appsToUnload[app.name]) {
    return app
  }

  // 将应用状态置为 卸载中
  app.status = UNLOADING

  // 删除所有应用相关的属性
  delete app.bootstrap
  delete app.mount
  delete app.unmount

  // 将应用状态置为 卸载完成
  app.status = NOT_LOADED
}
