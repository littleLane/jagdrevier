import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { registerMicroApps, start } from 'qiankun'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)

const subApps = [
  {
    name: 'subVueApp',
    entry: '//localhost:8000',
    container: '#vue',
    activeRule: '/vue',
  },
  {
    name: 'subReactApp',
    entry: '//localhost:8001',
    container: '#react',
    activeRule: '/react',
  },
]

registerMicroApps(subApps)
start()

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
