import Vue from 'vue'
import singleSpaVue from 'single-spa-vue'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false

const appOptions = {
  el: '#vue',
  router,
  render: h => h(App)
}

// new Vue({
//   render: h => h(App)
// }).$mount('#app')

const vueLifecycle = singleSpaVue({
  Vue,
  appOptions
})

if (window.singleSpaNavigate) {
  __webpack_public_path__ = 'http://localhost:4004/'
} else {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}

export const bootstrap = vueLifecycle.bootstrap
export const mount = vueLifecycle.mount
export const unmount = vueLifecycle.unmount
export default vueLifecycle
