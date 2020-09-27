import axios from './axios'
import qs from 'qs'
import { baseUrl, authUrl } from '@/config/config'
import { user, userInfo } from '@/mock/userMock'
import menu from '@/mock/menuMock'
import { param } from 'jquery'
export const login = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: authUrl + '/account/login',
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
