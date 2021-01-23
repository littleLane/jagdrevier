/**
 *
 * @param {*} appName 应用名称
 * @param {*} loadApp 加载应用逻辑，返回 Promise
 * @param {*} activeWhen 应用加载匹配规则
 * @param {*} customProps 自定义属性
 */

import {
  BOOTSTRAPPING,
  LOADING_SOURCE_CODE,
  MOUNTED,
  NOT_BOOTSTRAPPED,
  NOT_LOADED,
  NOT_MOUNTED,
  SKIP_BECAUSE_BROKEN,
} from './appHelper'
import { reroute } from '../navigation/reroute'
import { shouldBeActive } from './appHelper'

const apps = []

export function registerApplication(appName, loadApp, activeWhen, customProps) {
  apps.push({
    name: appName,
    loadApp,
    activeWhen,
    customProps,
    status: NOT_LOADED, // 应用默认是尚未加载状态
  })

  reroute()
}

export function getAppChanges() {
  // 将要去加载的应用
  const appsToLoad = []

  // 将要去挂载的应用
  const appsToMount = []

  // 将要去卸载的应用
  const appsToUnmount = []

  apps.forEach((app) => {
    // 应用加载匹配
    const appShouldBeActive = shouldBeActive(app)

    switch (app.status) {
      // 应该加载的应用状态
      case NOT_LOADED:
      case LOADING_SOURCE_CODE:
        if (appShouldBeActive) {
          appsToLoad.push(app)
        }
        break

      // 应该挂载的应用状态
      case NOT_BOOTSTRAPPED:
      case NOT_MOUNTED:
        if (appShouldBeActive) {
          appsToMount.push(app)
        }
        break

      // 可以卸载的应用状态
      case MOUNTED:
        if (!appShouldBeActive) {
          appsToUnmount.push(app)
        }
    }
  })

  return {
    appsToUnmount,
    appsToLoad,
    appsToMount,
  }
}
