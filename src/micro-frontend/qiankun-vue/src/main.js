import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let instance = null

function render() {
  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount('#root')
}

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
} else {
  render()
}

export async function bootstrap(props) {}

export async function mount(props) {
  render(props)
}

export async function unmount(props) {
  instance.$destroy()
}
