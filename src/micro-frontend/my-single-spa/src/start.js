import { reroute } from './navigation/reroute'

export let started = false

export function start() {
  if (!started) {
    started = true
  }

  reroute()
}
