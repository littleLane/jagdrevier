import { reroute } from './reroute'

export const routingEventsListeningTo = ['hashchange', 'popstate']

const captureEventListeners = {
  hashchange: [],
  popstate: [],
}

function urlReroute() {
  reroute([], arguments)
}

window.addEventListener('hashchange', urlReroute)
window.addEventListener('popstate', urlReroute)

const originAddEventListener = window.addEventListener
const originRemoveEventListener = window.removeEventListener

window.addEventListener = function (eventName, fn) {
  if (routingEventsListeningTo.includes(eventName) && !captureEventListeners[eventName].includes(fn)) {
    captureEventListeners[eventName].push(fn)
    return
  }

  return originAddEventListener.apply(this, arguments)
}

window.removeEventListener = function (eventName, listenerFn) {
  if (routingEventsListeningTo.includes(eventName)) {
    captureEventListeners[eventName] = captureEventListeners[eventName].filter((fn) => fn !== listenerFn)
    return
  }

  return originRemoveEventListener.apply(this, arguments)
}

function patchedUpdateState(updateState, methodName) {
  return function () {
    const urlBefore = window.location.href
    const result = updateState.apply(this, arguments)
    const urlAfter = window.location.href

    if (urlBefore !== urlAfter) {
      urlReroute(new PopStateEvent('popState', { state }))
    }

    return result
  }
}

window.history.pushState = patchedUpdateState(window.history.pushState, 'pushState')
window.history.replaceState = patchedUpdateState(window.history.replaceState, 'replaceState')

export function callCaptureEventListeners(eventArguments) {
  if (eventArguments) {
    const eventType = eventArguments[0].type

    if (routingEventsListeningTo.includes(eventType)) {
      captureEventListeners[eventType].forEach((listener) => {
        listener.apply(this, eventArguments)
      })
    }
  }
}
