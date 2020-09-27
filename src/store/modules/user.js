import { login, getMenu, logout, chanPwd, getUserInfo, refreshToken, getApiMenus, updateMe } from '@/api/userApi'
const user = {
  namespaced: true,
  state: {
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {},
    appInfo: JSON.parse(sessionStorage.getItem('appInfo')) || {},
    role: JSON.parse(sessionStorage.getItem('role')) || [],
    token: sessionStorage.getItem('token') || '',
    refreshToken: sessionStorage.getItem('refreshToken') || '',
    menu: JSON.parse(sessionStorage.getItem('menu')) || [],
    permission: JSON.parse(sessionStorage.getItem('permission')) || [],
    tenantId: sessionStorage.getItem('tenantId') || '',
    loginTime: sessionStorage.getItem('loginTime') || 0
  },
  getters: {},
  mutations: {
    SET_TOKEN: (state, params) => {
      state.token = params
      sessionStorage.setItem('token', params)
    },
    SET_REFRESH_TOKEN: (state, params) => {
      state.refreshToken = params
      sessionStorage.setItem('refreshToken', params)
    },
    SET_MENU: (state, params) => {
      state.menu = params
      sessionStorage.setItem('menu', JSON.stringify(params))
    },
    SET_ROLE: (state, params) => {
      state.role = params
      sessionStorage.setItem('role', JSON.stringify(params))
    },
    SET_PERMISSION: (state, params) => {
      state.permission = params.map(item => {
        return item.permission
      })
      sessionStorage.setItem('permission', JSON.stringify(state.permission))
    },
    SET_USER_INFO: (state, params) => {
      state.userInfo = params
      sessionStorage.setItem('userInfo', JSON.stringify(params))
    },
    SET_APP_INFO: (state, params) => {
      state.appInfo = params
      sessionStorage.setItem('appInfo', JSON.stringify(params))
    },
    SET_TENANTID: (state, params) => {
      state.tenantId = params
      sessionStorage.setItem('tenantId', params)
    },
    SET_LOGIN_TIME: (state, params) => {
      state.loginTime = params
      sessionStorage.setItem('loginTime', params)
    }
  },
  actions: {
    Login ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        login(params).then(res => {
          commit('SET_TOKEN', res.accessToken)
          commit('SET_REFRESH_TOKEN', res.refreshToken)
          commit('SET_APP_INFO', res)
          commit('SET_TENANTID', params.tenantId)
          var loginTime = parseInt(new Date().getTime() / 1000)
          commit('SET_LOGIN_TIME', loginTime)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        getUserInfo(params).then(res => {
          // console.log(res)
          commit('SET_PERMISSION', res.permissions)
          commit('SET_USER_INFO', res.user)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout ({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        var params = {
          access_token: state.token
        }
        logout(params).then(res => {
          commit('SET_TOKEN', '')
          commit('SET_REFRESH_TOKEN', '')
          // commit('SET_ROLE', [])
          // commit('SET_PERMISSION', [])
          commit('SET_USER_INFO', {})
          sessionStorage.removeItem('/school-data/school-manage')
          sessionStorage.removeItem('/public-data/edu-bureau-manage')
          resolve(res)
        })
      })
    },
    RefreshToken ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        params = {
          refreshToken: state.refreshToken,
          clientId: 'webApp',
          scope: state.appInfo.scope,
          tokenChanged: 0
        }
        // console.log(params)
        refreshToken(params).then(res => {
          // console.log(res)
          commit('SET_TOKEN', res.accessToken)
          commit('SET_REFRESH_TOKEN', res.refreshToken)
          var loginTime = parseInt(new Date().getTime() / 1000)
          commit('SET_LOGIN_TIME', loginTime)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ChanPwd ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        chanPwd(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetMenu ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        var role = state.role.length > 0 ? state.role[0] : 'admin'
        getMenu(role).then(res => {
          commit('SET_MENU', res.data)
          resolve(res)
        })
      })
    },
    GetApiMenus ({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        var params = {
          userId: state.userInfo.id,
          tenantId: state.tenantId
        }
        getApiMenus(params).then(res => {
          commit('SET_MENU', res)
          resolve(res)
        })
      })
    },
    // 将菜单列表扁平化形成权限列表
    GetPermissionList ({ state, dispatch }) {
      return new Promise((resolve) => {
        let permissionList = []
        // 将菜单数据扁平化为一级
        function flatNavList (arr) {
          for (let v of arr) {
            if (v.children && v.children.length) {
              flatNavList(v.children)
            } else {
              permissionList.push(v)
            }
          }
        }
        var currentTime = parseInt(new Date().getTime() / 1000)
        var loginTime = parseInt(state.loginTime)
        var timediff = currentTime - loginTime
        var expiresTime = state.appInfo.expires_in
        // console.log(currentTime, loginTime, timediff, expiresTime)
        if (timediff > expiresTime / 2) {
          dispatch('RefreshToken').then((res) => {
            dispatch('GetMenu').then(res => {
              flatNavList(state.menu)
              resolve(permissionList)
            })
          })
        } else {
          dispatch('GetMenu').then(res => {
            flatNavList(state.menu)
            resolve(permissionList)
          })
        }
        // dispatch('GetApiMenus').then(res => {
        //   // console.log(res)
        // })
      })
    },
    UpdateMe ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        updateMe(params).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user
