import { login } from '@/api/accountApi'
const account = {
  namespaced: true,
  mutations: {
    SET_TOKEN: (state, params) => {
      state.token = params
      sessionStorage.setItem('token', params)
    }
  },
  actions: {
    Login ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        login(params).then(res => {
          console.log(res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default account
