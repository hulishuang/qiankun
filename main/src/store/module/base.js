const SET_USER = 'SET_USER'
const SET_TOKEN = 'SET_TOKEN'
const LOGIN_INIT = 'LOGIN_INIT'
const SET_ROUTE_AUTH_LIST = 'SET_ROUTE_AUTH_LIST'
let token = localStorage.getItem('LJ_TOKEN') || '' // token
let user = localStorage.getItem('userData') || null // 用户数据
const base = {
    state: {
        user,
        token,
        routeAuthList: [] // 用户权限列表
    },
    mutations: {
        // 用户信息
        [SET_USER]: (state, data) => {
            state.user = data
            localStorage.setItem('userData', JSON.stringify(data))
        },
        // 用户token
        [SET_TOKEN]: (state, data) => {
            state.token = data
            localStorage.setItem('LJ_TOKEN', data)
        },
        // 权限列表
        [SET_ROUTE_AUTH_LIST]: (state, data) => {
            state.routeAuthList = data
            localStorage.setItem('LJ_ROUTE_AUTH_LIST', data)
        },
    },
    actions: {
        [LOGIN_INIT]({ commit } = {}, value) {
            const { user, token } = value
            commit(SET_USER, user)
            commit(SET_TOKEN, token)
        },
    },
    getters: {
        token: state => state.token || '',
        user: state => state.user,
    }
}
export default base