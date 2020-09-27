import axios from 'axios'
import store from '@/store'
import router from '../router'
import { Message } from 'element-ui'
axios.defaults.timeout = 20000
axios.defaults.withCredentials = false // 跨域请求，允许保存cookie
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log(config)
	if (store.getters.token && sessionStorage.getItem('token')) {
    // config.headers['Authorization'] = store.getters.appInfo.tokenType + ' ' + store.getters.token // 请求token
    if (config.params && config.params.queryToken) {
      config.headers['Authorization'] = 'Bearer' + ' ' + config.params.queryToken
    } else {
      config.headers['Authorization'] = 'Bearer' + ' ' + store.getters.token
    }
    config.headers['tenantId'] = store.getters.tenantId ? store.getters.tenantId : null
    // config.headers['trace_id'] = ''
    config.headers['clientId'] = 'webApp'
    config.headers['clientSecret'] = 'webApp'
	}
	return config
}, function (error) {
	console.log('error' + error)
	return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	return response
}, function (error) {
  // console.log(error)
	if (error.response.status == 401) {
    Message({message: '服务器请求超时，请重新登录', type: 'error'})
    store.commit('user/SET_TOKEN', '')
    store.commit('common/CLEAR_TAG')
    router.push('/login')
  }
  if (error.response.status >= 500) {
    console.log(error.response.status)
    error.response.data.resp_msg = '服务器异常，请联系管理员'
    return Promise.reject(error.response)
  } else {
    return Promise.reject(error.response)
  }
})
export default axios
