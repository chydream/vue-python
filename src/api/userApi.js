import axios from './axios'
import qs from 'qs'
import { baseUrl, authUrl } from '@/config/config'
import { user, userInfo } from '@/mock/userMock'
import menu from '@/mock/menuMock'
import { param } from 'jquery'
export const login = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: authUrl + '/oauth/user/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'clientId': 'webApp',
        'clientSecret': 'webApp',
        'Authorization': ''
      },
      data: JSON.stringify(params)
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error.data)
    })
  })
}

export const getUserInfo = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: authUrl + '/oauth/userinfo',
      method: 'GET',
      params
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error.data)
    })
  })
}

export const logout = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: authUrl + '/oauth/remove/token',
      method: 'POST',
      params
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error.data)
    })
    // resolve({ message: '登出成功', success: true })
  })
}
/**
 * 刷新token
 * @param {refreshToken} params
 */
export const refreshToken = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: authUrl + '/oauth/tokens/' + params.refreshToken + '/actions/refresh?tokenChanged=' + params.tokenChanged,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8' 
      },
      data: JSON.stringify(params)
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error.data)
    })
  })
}
export const chanPwd = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + '/users/password',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8' 
      },
      data: JSON.stringify(params)
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error.data)
    })
  })
}
export const getMenu = (params) => {
  return new Promise((resolve, reject) => {
    resolve({ data: menu[params], message: '获取成功', success: true })
  })
}
// 获取当前用户菜单
export const getApiMenus = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + '/menus/userCenterMenu/' + params.userId,
      method: 'GET',
      params
    }).then(res => {
      // console.log(res.data)
      function setDeptData (arr) { 
        arr.forEach((item, index) => {
          if (item.children && item.children.length > 0) {
            setDeptData(item.children)
            item.href = ''
            item.icon = item.css
            item.label = item.name
            item.show = true
            item.permission = ['view', 'add', 'delete', 'edit']
          } else {
            item.children = []
            item.href = item.path
            item.icon = item.css
            item.label = item.name
            item.show = true
            item.permission = ['view', 'add', 'delete', 'edit']
          }
        })
        return arr
      }
      var indexArr = [
        {
          id: 'home',
          label: '首页',
          href: '/home/index',
          icon: 'fa fa-home',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        }
      ]
      var arr = res.data
      if (arr) {
        var data = setDeptData(arr)
        var permissionList = indexArr.concat(data)
        resolve(permissionList)
      } else {
        resolve(indexArr)
      }
    }).catch(error => {
      reject(error.data)
    })
  })
}

// 修改个人信息
export const updateMe = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + '/users/me',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8' 
      },
      data: JSON.stringify(params)
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error.data)
    })
  })
}
