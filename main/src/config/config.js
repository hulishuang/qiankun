import store from '@/store'
const microApps = [
    {
      name: 'vue-app',
      entry: '//localhost:8081',
      activeRule: '/vue-app'
    },
    {
      name: 'vue-test',
      entry: '//localhost:8082',
      activeRule: '/vue-test'
    }
  ]

  const apps = microApps.map(item => {
    return {
      name: item.name,
      entry: item.entry,
      activeRule: '/app' + item.activeRule,
      container: '#subView', // 子应用挂载的div
      props: {
        getGlobalState: store.getGlobalState, // 下发getGlobalState方法
        routerBase: '/app' + item.activeRule // 下发基础路由
      }
    }
  })

  export default apps
