import Vue from 'vue'
import { registerApplication, start } from 'single-spa'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

async function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject

    document.body.appendChild(script)
  })
}

registerApplication(
  'singleVue',
  async () => {
    console.log('加载 Vue 子应用')

    await loadScript('http://localhost:4004/js/chunk-vendors.js')
    await loadScript('http://localhost:4004/js/app.js')

    return window.singleVue
  },
  location => location.pathname.startsWith('/vue')
)

start()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
