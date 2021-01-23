(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.singleSpa = {}));
}(this, (function (exports) { 'use strict';

  // 应用还没加载
  const NOT_LOADED = 'NOT_LOADED';

  // 加载资源中
  const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE';

  // 应用尚未启动
  const NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED';

  // 应用启动中
  const BOOTSTRAPPING = 'BOOTSTRAPPING';

  // 应用尚未挂载
  const NOT_MOUNTED = 'NOT_MOUNTED';

  // 应用挂载中
  const MOUNTING = 'MOUNTING';

  // 应用挂载完成
  const MOUNTED = 'MOUNTED';

  // 应用卸载中
  const UNMOUNTING = 'UNMOUNTING';

  /**
   * 应用是否需要激活
   * @param {*} app
   */
  function shouldBeActive(app) {
    return app.activeWhen(window.location)
  }

  /**
   *
   * @param {*} appName 应用名称
   * @param {*} loadApp 加载应用逻辑，返回 Promise
   * @param {*} activeWhen 应用加载匹配规则
   * @param {*} customProps 自定义属性
   */

  const apps = [];

  function registerApplication(appName, loadApp, activeWhen, customProps) {
    apps.push({
      name: appName,
      loadApp,
      activeWhen,
      customProps,
      status: NOT_LOADED, // 应用默认是尚未加载状态
    });

    reroute();
  }

  function getAppChanges() {
    // 将要去加载的应用
    const appsToLoad = [];

    // 将要去挂载的应用
    const appsToMount = [];

    // 将要去卸载的应用
    const appsToUnmount = [];

    apps.forEach((app) => {
      // 应用加载匹配
      const appShouldBeActive = shouldBeActive(app);

      switch (app.status) {
        // 应该加载的应用状态
        case NOT_LOADED:
        case LOADING_SOURCE_CODE:
          if (appShouldBeActive) {
            appsToLoad.push(app);
          }
          break

        // 应该挂载的应用状态
        case NOT_BOOTSTRAPPED:
        case NOT_MOUNTED:
          if (appShouldBeActive) {
            appsToMount.push(app);
          }
          break

        // 可以卸载的应用状态
        case MOUNTED:
          if (!appShouldBeActive) {
            appsToUnmount.push(app);
          }
      }
    });

    return {
      appsToUnmount,
      appsToLoad,
      appsToMount,
    }
  }

  /**
   * 串联 promis
   * @param {*} fns
   */
  function flattenFnArray(fns) {
    fns = Array.isArray(fns) ? fns : [fns];

    return function (props) {
      return fns.reduce((p, fn) => p.then(() => fn(props)), Promise.resolve())
    }
  }

  /**
   * 加载应用
   * @param {*} app
   */
  async function toLoadPromise(app) {
    // promise 缓存
    if (app.loadPromise) {
      return app.loadPromise
    }

    return (app.loadPromise = Promise.resolve().then(async () => {
      // 将应用状态置为 加载资源中
      app.status = LOADING_SOURCE_CODE;

      // 获取子应用的接入协议
      // registerApplication 方法的第二个传参
      const { bootstrap, mount, unmount } = await app.loadApp(app.customProps);

      // 应用加载完后，将应用状态置为 待启动
      app.status = NOT_BOOTSTRAPPED;

      // 扁平化 bootstrap，mount，unmount
      app.bootstrap = flattenFnArray(bootstrap);
      app.mount = flattenFnArray(mount);
      app.unmount = flattenFnArray(unmount);

      delete app.loadPromise;

      return app
    }))
  }

  async function toBootstrapPromise(app) {
    if (app.status !== NOT_BOOTSTRAPPED) {
      return app
    }

    app.status = BOOTSTRAPPING;
    await app.bootstrap(app.customProps);
    app.status = NOT_MOUNTED;

    return app
  }

  async function toMountPromise(app) {
    if (app.status !== NOT_MOUNTED) {
      return app
    }

    app.status = MOUNTING;
    await app.mount(app.customProps);
    app.status = MOUNTED;

    return app
  }

  /**
   * 卸载不需要的应用
   * @param {*} app
   */
  async function toUnmountPromise(app) {
    // 应用还没挂载，直接返回
    if (app.status !== MOUNTED) {
      return app
    }

    // 应用已经挂载，就将应用状态置为 卸载中
    app.status = UNMOUNTING;

    // 卸载应用
    await app.unmount(app.customProps);

    // 应用卸载后，将状态置为 卸载完成
    app.status = NOT_MOUNTED;

    return app
  }

  let started = false;

  function start() {
    if (!started) {
      started = true;
    }

    reroute();
  }

  function reroute(pendings = [], eventArguments) {
    const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges();

    if (started) {
      return performAppChanges()
    } else {
      return loadApps()
    }

    // 挂载应用
    function performAppChanges() {
      // 先卸载不需要的应用，然后挂载需要的应用
      appsToUnmount.map(toUnmountPromise);
      callCaptureEventListeners(eventArguments);

      // 加载需要的应用
      // 将需要加载的应用 拿到 => 加载 => 启动 => 挂载
      appsToLoad.map(async (app) => {
        const loadApp = await toLoadPromise(app);
        tryToBootstrapAndMount(loadApp);
      });

      appsToMount.map(tryToBootstrapAndMount);
    }

    // 预加载应用
    async function loadApps() {
      await Promise.all(appsToLoad.map(toLoadPromise));

      callCaptureEventListeners(eventArguments);
    }
  }

  async function tryToBootstrapAndMount(app) {
    if (shouldBeActive(app)) {
      const bootstrapApp = await toBootstrapPromise(app);
      return toMountPromise(bootstrapApp)
    }

    return app
  }

  const routingEventsListeningTo = ['hashchange', 'popstate'];

  const captureEventListeners = {
    hashchange: [],
    popstate: [],
  };

  function urlReroute() {
    reroute([], arguments);
  }

  window.addEventListener('hashchange', urlReroute);
  window.addEventListener('popstate', urlReroute);

  const originAddEventListener = window.addEventListener;
  const originRemoveEventListener = window.removeEventListener;

  window.addEventListener = function (eventName, fn) {
    if (routingEventsListeningTo.includes(eventName) && !captureEventListeners[eventName].includes(fn)) {
      captureEventListeners[eventName].push(fn);
      return
    }

    return originAddEventListener.apply(this, arguments)
  };

  window.removeEventListener = function (eventName, listenerFn) {
    if (routingEventsListeningTo.includes(eventName)) {
      captureEventListeners[eventName] = captureEventListeners[eventName].filter((fn) => fn !== listenerFn);
      return
    }

    return originRemoveEventListener.apply(this, arguments)
  };

  function patchedUpdateState(updateState, methodName) {
    return function () {
      const urlBefore = window.location.href;
      const result = updateState.apply(this, arguments);
      const urlAfter = window.location.href;

      if (urlBefore !== urlAfter) {
        urlReroute(new PopStateEvent('popState', { state }));
      }

      return result
    }
  }

  window.history.pushState = patchedUpdateState(window.history.pushState);
  window.history.replaceState = patchedUpdateState(window.history.replaceState);

  function callCaptureEventListeners(eventArguments) {
    if (eventArguments) {
      const eventType = eventArguments[0].type;

      if (routingEventsListeningTo.includes(eventType)) {
        captureEventListeners[eventType].forEach((listener) => {
          listener.apply(this, eventArguments);
        });
      }
    }
  }

  exports.registerApplication = registerApplication;
  exports.start = start;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=single-spa.js.map
