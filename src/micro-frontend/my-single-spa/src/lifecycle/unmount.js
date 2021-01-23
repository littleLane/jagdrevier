import { MOUNTED, NOT_MOUNTED, UNMOUNTING } from '../applications/appHelper'

/**
 * 卸载不需要的应用
 * @param {*} app
 */
export async function toUnmountPromise(app) {
  // 应用还没挂载，直接返回
  if (app.status !== MOUNTED) {
    return app
  }

  // 应用已经挂载，就将应用状态置为 卸载中
  app.status = UNMOUNTING

  // 卸载应用
  await app.unmount(app.customProps)

  // 应用卸载后，将状态置为 卸载完成
  app.status = NOT_MOUNTED

  return app
}
