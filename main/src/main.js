import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { registerMicroApps, start  } from 'qiankun'
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import microApps from './config/config'
import router from './router/index'
import('element-ui/lib/theme-chalk/index.css')
import '@assets/style/reset.scss'
const ELEMENT = require('element-ui')
Vue.use(ELEMENT)

Vue.config.productionTip = false
let app = null
/**
 * BehaviorSubject  在有新的订阅时会额外发出最近一次发出的值的subject
 */
window.RXGW = {
  time: new Date().getTime(),
  subject: new BehaviorSubject({ target: [], type: '', data: {}}).onErrorResumeNext(),
  observer: {}
}
/**
 * observable是一个可调用的未来值或事件的集合。它能被多个observer订阅，每个订阅关系相互独立、互不影响
 * 
*/
window.RXGW.observable = Observable.create((observer) => {
  window.RXGW.observer = observer
  return function unsubscribe() {
    window.RXGW.observer = null
  };
});
function render({ appContent, loading }) {
  if (!window.vueStorage) window.vueStorage = {}
  const systemName = location.pathname.split('/')[2]
  if (systemName && window.vueStorage[systemName]) {
    app.loading = loading;
    return
  }
  if (!app) {
    app = new Vue({
      el: '#container',
      data() {
       return {
        loading,
        content: appContent
       }
      },
      render(h) {
        return h(App, {
          props: {
            loading: this.loading,
            content: this.content
          }
        })
      },
      store,
      router
    })
  } else {
    app.loading = loading
    app.content = appContent
  }
}
render({})

const apps= microApps.map(item => ({
  ...item,
  render
}))
console.log('apps', apps)
registerMicroApps(apps,
{
  beforeLoad: [
    app => {
      console.log('registerMicroAppsbeforeLoad', app);
    }
  ],
  beforeMount: [
    app => {
      console.log('registerMicroApps before mount', app);
    }
  ],
  afterMount: [
    app => {
      console.log('registerMicroApps after mount', app);
    }
  ],
  afterUnmount: [
    app => {
      console.log('registerMicroApps after unload', app);
    }
  ]
})
console.log('process.env.FIRST_BASE_URL', process.env)
// setDefaultMountApp('/vueApp')
/**
 * prefetch 
 * 1.true 则会在第一个微应用 mount 完成后开始预加载其他微应用的静态资源
 * 2.'all' 则主应用 start 后即开始预加载所有微应用静态资源
 * 3.string[] 则会在第一个微应用 mounted 后开始加载数组内的微应用资源
 * 4.function 则可完全自定义应用的资源加载时机 (首屏应用及次屏应用)
 * */ 
/**
 * sandbox 默认为true 默认情况下沙箱可以确保单实例场景子应用之间的样式隔离，但是无法确保主应用跟子应用、或者多实例场景的子应用样式隔离
 * 2.'all' 则主应用 start 后即开始预加载所有微应用静态资源
 * 3.string[] 则会在第一个微应用 mounted 后开始加载数组内的微应用资源
 * 4.function 则可完全自定义应用的资源加载时机 (首屏应用及次屏应用)
 * */ 
/**
 * singular - boolean | ((app: RegistrableApp<any>) => Promise<boolean>); - 可选，是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 true。
 */
/**
 * fetch - Function - 可选，自定义的 fetch 方法
 */
start()

