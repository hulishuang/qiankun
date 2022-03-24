import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import('nprogress/nprogress.css')
import store from '@/store'
import microApps from '../config/config'

NProgress.configure({ showSpinner: false })
Vue.use(Router)
const files = require.context('./modules/', true, /\.js$/)
let routesMap = []
files.keys().forEach(item => {
    routesMap = routesMap.concat(files(item).default)
})
console.log('routesMap', routesMap)

// 布局页
const Layout = () => import(/* webpackChunkName: "independence" */ '@views/Layout.vue')
const Login = () => import(/* webpackChunkName: "independence" */ '@views/Login.vue')
const Index = () => import(/* webpackChunkName: "independence" */ '@views/Index.vue')

const commonRouter = [
    { path: '/', redirect: '/index', component: Layout, children: routesMap },
    { path: '/login', name: 'login', meta: { title: '登录' }, component: Login },
    { path: '/index', name: 'index', meta: { hideInMenu: true, title: '首页' }, component: Index },
    // { path: '*', redirect: '/index' }
]
console.log('commonRouter', commonRouter)
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: commonRouter
})
router.beforeEach(async (to, from, next) => {
    console.log('beforeEach', to, from, next, store)
    // 进度条
    NProgress.start()
    // token存在
    // const token = localStorage.getItem('LJ_TOKEN')
    if (store.getters.token) {
        if (to.name === 'index' || microApps.some(item => item.path === to.activeRule)) {
            next()
        } else {
            next()
        }
    } else {
        if (to.name !== 'login') {
            next({
                redirect: true,
                name: 'login'
            })
        } else {
            next()
        }
    }
})
router.afterEach((to, from) => {
    console.log('afterEach', to, from)
    window.scrollTo(0, 0)
    NProgress.done()
    // 用户token存在
    if (store.getters.token) {
        // try {
        //     checkToken()
        // } catch (error) {
        //     console.log('checkToken::error', error)
        // }
        // // 使用定时器的原因：
        // // Common.getSystemNameByLocation 此方法获取当前浏览器地址存在顺序问题，定时器后可以准确获取对应的信息
        // setTimeout(() => {
        //     // 系统名称环境变量与浏览器地址中的系统名称匹配，添加页面埋点
        //     if (process.env.VUE_APP_SYS_NAME === Common.getSystemNameByLocation()) {
        //         const VUE_APP_SYS_NAME = process.env.VUE_APP_SYS_NAME
        //         try {
        //             // 获取参数
        //             const params = window.$Bury.util.handleBuryParams({ to, from, store, systemName: VUE_APP_SYS_NAME })
        //             // 调用页面埋点
        //             window.$Bury.buryPage(params)
        //         } catch (error) {
        //             console.error(`埋点系统-${VUE_APP_SYS_NAME}:error`, error)
        //         }
        //     }
        // })
    }
})
export default router