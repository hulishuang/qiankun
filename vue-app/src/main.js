import './public-path'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store'
import { store as commonStore } from 'common'
import actions from "@/common/utils/actions"

console.log('commonStore', commonStore)
Vue.config.productionTip = false
Vue.use(VueRouter)

let router = null
function render(props = {}) {
  const { routerBase, container } = props
  actions.setActions(props)
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: 'history',
    routes,
  })
  const systemName = process.env.VUE_APP_SYS_NAME
  if (window.vueStorage[systemName]) return
  window.vueStorage[systemName] = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#' + systemName) : '#' + systemName)
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  commonStore.globalRegister(store)
  store.commit('global/setGlobalState', { user: 'test' })
  render()
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  commonStore.globalRegister(store, props)
  store.commit('global/setGlobalState', { user: 'test' })
  render(props);
}
export async function unmount() {
  // instance.$destroy();
  // instance.$el.innerHTML = '';
  // instance = null;
  // router = null;
}