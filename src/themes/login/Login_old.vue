<template>
  <div class="login">
    <div class="content">
      <form id="login-form" class="login-form">
        <h3 class="form-title">登录</h3>
        <div class="alert alert-danger display-hide">
          <button class="close" data-close="alert"></button>
          <span>输入你的用户名或密码</span>
        </div>
        <div class="form-group field-loginform-username required">
          <label class="control-label visible-ie8 visible-ie9" for="loginform-username">用户名</label>
          <div class="input-icon">
            <i class="fa fa-user"></i>
            <input
              type="text"
              id="loginform-username"
              class="form-control placeholder-no-fix"
              name="LoginForm[username]"
              autocomplete="off"
              placeholder="用户名"
              aria-required="true"
              v-model="username"
            />
            <p class="help-block help-block-error"></p>
          </div>
        </div>
        <div class="form-group field-loginform-password required">
          <label class="control-label visible-ie8 visible-ie9" for="loginform-password">密码</label>
          <div class="input-icon">
            <i class="fa fa-lock"></i>
            <input
              type="password"
              id="loginform-password"
              class="form-control placeholder-no-fix"
              name="LoginForm[password]"
              autocomplete="off"
              placeholder="密码"
              aria-required="true"
              v-model="password"
            />
            <p class="help-block help-block-error"></p>
          </div>
        </div>
        <!-- <div>
          <label>完成验证:</label>
          <div id="captcha">
              <div id="text">
                  行为验证 安全组件加载中
              </div>
              <div id="wait" class="show">
                  <div class="loading">
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                  </div>
              </div>
          </div>
        </div>-->
        <div class="form-actions">
          <el-checkbox v-model="checked" style="margin-top:10px;">记住我</el-checkbox>
          <button type="button" class="btn green pull-right" @click="getLogin">登录</button>
        </div>
      </form>
    </div>
    <div class="copyright">2016 © copyright</div>
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
      username: '',
      password: '',
      checked: false,
      activeIndex: 0
    }
  },
  methods: {
    getLogin () {
      var params = {
        username: this.username,
        password: this.password
      }
      console.log(params)
      if (params.username == '' || params.password == '') {
        this.$message({
          message: '请输入登录信息',
          type: 'warning',
          center: true
        })
        return false
      }
      this.$store
        .dispatch('user/Login', params)
        .then(res => {
          console.log(res)
          if (res.success) {
            // document.onkeydown = undefined
            // this.$router.push('/index/home')
            // this.$store
            //   .dispatch('user/GetUserInfo', res.data.token)
            //   .then(res => {
            //     if (res.success) {
            //       if (this.checked) {
            //         this.setCookie(params.username, params.password, 7)
            //       } else {
            //         this.clearCookie()
            //       }
            //     }
            //   })
          } else {
            this.tip(res.message, 'error')
          }
        })
        .catch(err => {
          this.tip('服务器出错', 'error')
          console.log(err)
        })
    },
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
    getCookie () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ')
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=')
          if (arr2[0] == 'username') {
            this.username = arr2[1]
            this.checked = true
          }
        }
      }
    },
    clearCookie () {
      this.setCookie('', '', -1)
    },
    setCookie (user, pwd, saveDays) {
      var exdate = new Date()
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * saveDays)
      window.document.cookie =
        'username' + '=' + user + ';path=/;expires=' + exdate.toGMTString()
    }
  },
  created () {
    this.getCookie()
    this.bgAnimation()
    // 按键监听
    var _self = this
    var key = ''
    document.onkeydown = function (e) {
      if (window.event == undefined) {
        key = e.keyCode
      } else {
        key = window.event.keyCode
      }
      if (key == 13) {
        _self.getLogin()
        // _self.getLoginss()
      }
    }
  },
  mounted () {
    /* eslint-disable */
    var handler = function (captchaObj) {
      // captchaObj.appendTo('#captcha')
      // captchaObj.onReady(function () {
      //   $("#wait").hide();
      // })
      // $('#btn').click(function () {
      //     var result = captchaObj.getValidate();
      //     if (!result) {
      //         return alert('请完成验证');
      //     }
      //     $.ajax({
      //         url: 'gt/validate-click',
      //         type: 'POST',
      //         dataType: 'json',
      //         data: {
      //             username: $('#username2').val(),
      //             password: $('#password2').val(),
      //             geetest_challenge: result.geetest_challenge,
      //             geetest_validate: result.geetest_validate,
      //             geetest_seccode: result.geetest_seccode
      //         },
      //         success: function (data) {
      //             if (data.status === 'success') {
      //                 alert('登录成功');
      //             } else if (data.status === 'fail') {
      //                 alert('登录失败，请完成验证');
      //                 captchaObj.reset();
      //             }
      //         }
      //     });
      // })
      // 更多前端接口说明请参见：http://docs.geetest.com/install/client/web-front/
    }
    initGeetest({
        // 以下 4 个配置参数为必须，不能缺少
        gt: '6216680937717fdab947ed9e71a3aaa1',
        challenge: '796862f2365da57106702a55ed3bc134',
        offline: true, // 表示用户后台检测极验服务器是否宕机
        new_captcha: true, // 用于宕机时表示是新验证码的宕机

        product: 'popup', // 产品形式，包括：float，popup
        width: '300px',
        https: false

        // 更多前端配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
      },
      handler
    )
  }
}
</script>
<style scoped lang="scss">
@import url('./css/bootstrap.min.css');
@import url('./css/login.css');
.login {
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
  .display-hide,
  .control-label {
    display: none;
  }
  .input-icon {
    position: relative;
  }
  .input-icon i {
    color: #ccc;
    position: absolute;
    margin: 9px 2px 4px 10px;
    z-index: 3;
    width: 16px;
    font-size: 16px;
    text-align: center;
    left: 0;
  }
  .input-icon input {
    padding-left: 33px;
  }
  .mt-checkbox,
  .mt-radio {
    display: inline-block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 15px;
    cursor: pointer;
    font-size: 14px;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
  .mt-checkbox > span,
  .mt-radio > span {
    position: absolute;
    top: 0;
    left: 0;
    height: 19px;
    width: 19px;
    border: 1px solid #d9d9d9;
    background: 0 0;
  }
  .mt-checkbox > input,
  .mt-radio > input {
    position: absolute;
    z-index: -1;
    opacity: 0;
    filter: alpha(opacity=0);
  }
  .mt-checkbox > span:after {
    left: 6px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid #666;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  .inp {
    border: 1px solid #cccccc;
    border-radius: 2px;
    padding: 0 10px;
    width: 278px;
    height: 40px;
    font-size: 18px;
  }

  // .btn {
  //   display: inline-block;
  //   box-sizing: border-box;
  //   border: 1px solid #cccccc;
  //   border-radius: 2px;
  //   width: 100px;
  //   height: 40px;
  //   line-height: 40px;
  //   font-size: 16px;
  //   color: #666;
  //   cursor: pointer;
  //   background: white linear-gradient(180deg, #ffffff 0%, #f3f3f3 100%);
  // }

  .btn:hover {
    background: white linear-gradient(0deg, #ffffff 0%, #f3f3f3 100%);
  }

  #captcha {
    width: 300px;
    display: inline-block;
  }

  label {
    vertical-align: top;
    display: inline-block;
    width: 80px;
    text-align: left;
  }

  #text {
    height: 42px;
    width: 298px;
    text-align: center;
    border-radius: 2px;
    background-color: #f3f3f3;
    color: #bbbbbb;
    font-size: 14px;
    letter-spacing: 0.1px;
    line-height: 42px;
  }

  #wait {
    display: none !important;
    height: 42px;
    width: 298px;
    text-align: center;
    border-radius: 2px;
    background-color: #f3f3f3;
  }

  .loading {
    margin: auto;
    width: 70px;
    height: 20px;
  }

  .loading-dot {
    float: left;
    width: 8px;
    height: 8px;
    margin: 18px 4px;
    background: #ccc;

    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;

    opacity: 0;

    -webkit-box-shadow: 0 0 2px black;
    -moz-box-shadow: 0 0 2px black;
    -ms-box-shadow: 0 0 2px black;
    -o-box-shadow: 0 0 2px black;
    box-shadow: 0 0 2px black;

    -webkit-animation: loadingFade 1s infinite;
    -moz-animation: loadingFade 1s infinite;
    animation: loadingFade 1s infinite;
  }

  .loading-dot:nth-child(1) {
    -webkit-animation-delay: 0s;
    -moz-animation-delay: 0s;
    animation-delay: 0s;
  }

  .loading-dot:nth-child(2) {
    -webkit-animation-delay: 0.1s;
    -moz-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }

  .loading-dot:nth-child(3) {
    -webkit-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .loading-dot:nth-child(4) {
    -webkit-animation-delay: 0.3s;
    -moz-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  @-webkit-keyframes loadingFade {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes loadingFade {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes loadingFade {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
