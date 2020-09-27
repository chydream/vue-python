<template>
  <div class="login" 
  v-loading.fullscreen.lock="loginLoading" element-loading-background="transparent">
    <div class="content">
      <h3 class="form-title">登录</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" @submit.native.prevent @keyup.enter.native="submitForm">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="用户名"  prefix-icon="el-icon-user" @blur="getUsername"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item  prop="password">
              <el-input v-model="ruleForm.password" placeholder="密码" :type="passType"  prefix-icon="el-icon-lock">
                <i slot="suffix" class="el-icon-view" @click="changeType"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="!isAdmin">
            <el-form-item prop="tenantId">
                <el-select v-model="ruleForm.tenantId" placeholder="请选择租户" style="width:100%" clearable @change="changeSelect">
                  <el-option
                    v-for="item in tenantArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <!-- <el-col :span="16">
            <el-form-item  prop="captcha">
              <el-input v-model="ruleForm.captcha" placeholder="验证码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="line-height:100%">
            <img class="captcha" :src="captchaSrc" v-show="isCaptcha" @click="setCaptcha">
          </el-col> -->
          <el-col :span="12">
            <el-form-item>
              <el-checkbox v-model="checked">记住我</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-form-item>
              <el-button type="default" @click="getLogin">登录</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="copyright">2020 © copyright 宥达信息</div>
    <div class="bg">
      <ul>
        <li v-for="(item, index) in imgs" :key="index" :class="{activeItem:activeIndex == index}">
          <img :src="item" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {setCookie, getCookie} from '@/util/tool'
import {baseServer} from '@/config/config'
export default {
  name: 'login',
  data () {
    return {
      imgs: [
        require('../../../static/img/7.jpg'),
        require('../../../static/img/2.jpg'),
        require('../../../static/img/3.jpg'),
        require('../../../static/img/4.jpg')
      ],
      ruleForm: {
        username: '',
        password: '',
        tenantId: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' }
        ],
        password: [
           { required: true, message: '请输入密码', trigger: 'blur' },
           { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        tenantId: [
          { required: true, message: '请选择租户', trigger: 'blur' }
        ]
      },
      checked: false,
      activeIndex: 0,
      passType: 'password',
      captchaSrc: '',
      isCaptcha: false,
      deviceId: '',
      tenantArr: [
        // {
        //   'id': '152a2c40cc839ca8f44353207f6b1be7',
        //   'name': '阳光教育产业群',
        //   'code': 'yango',
        //   'createTime': '2020-07-10T07:04:18.000+0000',
        //   'updateTime': '2020-07-10T07:54:57.000+0000',
        //   'enabled': 0,
        //   'deleted': 0
        // },
        // {
        //   'id': '0',
        //   'name': '超级管理员',
        //   'code': 'yango',
        //   'createTime': '2020-07-10T07:04:18.000+0000',
        //   'updateTime': '2020-07-10T07:54:57.000+0000',
        //   'enabled': 0,
        //   'deleted': 0
        // }
      ],
      loginLoading: false,
      isAdmin: false
    }
  },
  created () {
    this.bgAnimation()
    this.setUserName()
  },
  mounted () {
    this.setCaptcha()
    this.getTenantArr()
  },
  methods: {
    // 设置用户名
    setUserName () {
      var username = getCookie('username')
      if (username) {
        this.ruleForm.username = username
        this.checked = true
      } else {
        this.ruleForm.username = ''
        this.checked = false
      }
    },
    // 图片轮播
    bgAnimation () {
      var timer = null
      var interval = 5000
      timer = setInterval(() => {
        if (this.activeIndex < 3) {
          this.activeIndex++
        } else {
          this.activeIndex = 0
        }
      }, interval)
    },
    // 修改密码框
    changeType () {
      if (this.passType == 'password') {
        this.passType = 'text'
      } else {
        this.passType = 'password'
      }
    },
    // 登录
    getLogin () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loginLoading = true
          var params = {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            tenantId: this.ruleForm.tenantId
            // validCode: this.ruleForm.captcha,
            // deviceId: this.deviceId,
            // grant_type: 'password',
            // scope: 'app',
            // client_id: 'webApp',
            // client_secret: 'webApp', 
          }
          // console.log(params)
          this.$store.dispatch('user/Login', params).then(res => {
            // console.log(res)
            this.$store.dispatch('user/GetUserInfo', {access_token: res.accessToken}).then(res => {
              this.loginLoading = false
              // console.log(res)
              if (this.checked) {
                setCookie('username', params.username, 24)
              } else {
                setCookie('username', '', -1)
              }
              this.$router.push('/home/index')
            }).catch(() => {
              this.$store.dispatch('user/Logout').then(res => {
                this.$router.push('/login')
                this.$store.commit('common/CLEAR_TAG')
              }).catch((err) => {
                this.tip(err.resp_msg, 'error')
              })
              this.loginLoading = false
              this.tip('服务器出错', 'error')
              // console.log(err)
            })
          }).catch((err) => {
              this.loginLoading = false
              this.tip(err.resp_msg, 'error')
              // console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 表单enter提交 
    submitForm (event) {
      this.getLogin()
    },
    setCaptcha () {
      var uuid = this.getuuid()
      this.deviceId = uuid
      this.captchaSrc = baseServer + '/api-auth/validata/code/' + uuid
      this.isCaptcha = true
    },
    getuuid (len, radix) {
      var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
      var chars = CHARS
      var uuid = []
      var i
      radix = radix || chars.length
      if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
      } else {
        var r
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random() * 16
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
          }
        }
      }
      return uuid.join('')
    },
    getTenantArr () {
      var params = {
        code: '',
        name: ''
      }
      this.$store.dispatch('tenant/TenantSelect', params).then(res => {
        // console.log(res)
        this.tenantArr = res.data.filter((item, index, array) => {
          return item.deleted === 0 && item.enabled
        })
      })
    },
    changeSelect (value) {
      // console.log(value)
    },
    getUsername () {
      if (this.ruleForm.username == 'yangoadmin') {
        this.isAdmin = true
        this.ruleForm.tenantId = '0'
      } else {
        this.isAdmin = false
        this.ruleForm.tenantId = ''
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import url('./css/login.css');
.login{
  .bg {
    position: relative;
  }
  .bg ul li {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 2s ease;
  }
  .activeItem {
    opacity: 1 !important;
  }
  .bg ul li img {
    width: 100%;
    height: 100%;
  }
  .text-right{
    text-align: right;
  }
  .captcha{
    width:95%;
    margin-left:5%;
  }
}
</style>
