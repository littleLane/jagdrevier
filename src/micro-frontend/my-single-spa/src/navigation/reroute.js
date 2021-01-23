import { getAppChanges } from '../applications/app'
import { toLoadPromise } from '../lifecycle/load'
import { toUnloadPromise } from '../lifecycle/unload'
import { toBootstrapPromise } from '../lifecycle/bootstrap'
import { toMountPromise } from '../lifecycle/mount'
import { toUnmountPromise } from '../lifecycle/unmount'
import { started } from '../start'
import { callCaptureEventListeners } from './navigator-events'
import { shouldBeActive } from '../applications/appHelper'

export function reroute(pendings = [], eventArguments) {
  const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges()

  if (started) {
    return performAppChanges()
  } else {
    return loadApps()
  }

  // 挂载应用
  function performAppChanges() {
    // 先卸载不需要的应用，然后挂载需要的应用
    appsToUnmount.map(toUnmountPromise)
    callCaptureEventListeners(eventArguments)

    // 加载需要的应用
    // 将需要加载的应用 拿到 => 加载 => 启动 => 挂载
    appsToLoad.map(async (app) => {
      const loadApp = await toLoadPromise(app)
      tryToBootstrapAndMount(loadApp)
    })

    appsToMount.map(tryToBootstrapAndMount)
  }

  // 预加载应用
  async function loadApps() {
    await Promise.all(appsToLoad.map(toLoadPromise))

    callCaptureEventListeners(eventArguments)
  }
}

export async function tryToBootstrapAndMount(app) {
  if (shouldBeActive(app)) {
    const bootstrapApp = await toBootstrapPromise(app)
    return toMountPromise(bootstrapApp)
  }

  return app
}
