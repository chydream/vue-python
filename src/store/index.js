import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import common from './modules/common'
import account from './modules/account'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    common,
    account
  },
  getters
})
export default store
