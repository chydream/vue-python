<template>
  <div class="header-top" v-show="!isFullScreen">
    <div class="header-left">
      <i class="fa fa-navicon" @click="toggleCollapse"></i>
    </div>
    <div class="header-right user-name">
      <el-tooltip class="item" effect="dark" content="头像" placement="bottom">
        <img class="top-userImg" :src="headImgUrl" @error="loadError" />
      </el-tooltip>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{userInfo.nickname}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- 修改密码 -->
          <el-dropdown-item @click.native="handleInfo">个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="handleReset">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout('确定要退出吗？')">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 个人信息弹窗 -->
    <personal-info
      @closeDialog="closeDialog('info')"
      @confirmDialog="confirmDialog('info')"
      @handleClose="closeDialog('info')"
      v-if="dialogInfo"
      :dialogVisible="dialogInfo">
    </personal-info>
    <!-- 修改密码 -->
    <reset-password
      @closeDialog="closeDialog('reset')"
      @confirmDialog="confirmDialog('reset')"
      @handleClose="closeDialog('reset')"
      v-if="dialogReset"
      :dialogVisible="dialogReset">
    </reset-password>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import personalInfo from '@/themes/cvue/views/home/personalInfo'
import resetPassword from '@/themes/cvue/views/home/resetPassword'
export default {
  name: 'RightTop',
  data () {
    return {
      msg: 'hello',
      oldPwd: '',
      newPwd: '',
      checkNewPwd: '',
      checked: false,
      dialogInfo: false,
      dialogReset: false,
      assetsPhoto: './static/img/main/photo.png'
    }
  },
  components: {
    personalInfo,
    resetPassword
  },
  methods: {
    handleInfo () {
      this.dialogInfo = true
    },
    handleReset () {
      this.dialogReset = true
    },
    // 关闭弹窗
    closeDialog (params) {
      if (params == 'info') {
        this.dialogInfo = false
      }
      if (params == 'reset') {
        this.dialogReset = false
      }
    },
    // 确认
    confirmDialog (params) {
      if (params == 'info') {
        this.dialogInfo = false
        this.logout('修改完个人信息，请重新登录！')
      }
      if (params == 'reset') {
        this.dialogReset = false
        this.logout('修改完密码，请重新登录！')
      }
    },
    loadError () {
      this.userInfo.headImgUrl = this.assetsPhoto
    },
    toggleCollapse () {
      this.$store.commit('common/SET_COLLAPSE')
    },
    logout (msg) {
      this.handleConfirm(msg, () => {
        this.$store.dispatch('user/Logout').then(res => {
          this.$router.push('/login')
          this.$store.commit('common/CLEAR_TAG')
        }).catch((err) => {
          this.tip(err.resp_msg, 'error')
        })
      })
    }
  },
  mounted () {
    // console.log(this.userInfo)
  },
  computed: {
    ...mapGetters(['isFullScreen', 'userInfo']),
    headImgUrl () {
      var headImgUrl = this.userInfo.headImgUrl ? this.userInfo.headImgUrl : this.assetsPhoto
      return headImgUrl
    }
  }
}
</script>
<style lang="scss">
.header-top {
  height: 60px;
  overflow: hidden;
  padding: 0 20px;
}
.header-left {
  line-height: 60px;
  width: 50%;
  float: left;
}
.header-left i {
  font-size: 22px;
}
.header-right {
  padding: 13px 0px;
  line-height: 20px;
  width: 50%;
  float: right;
  text-align: right;
}
.top-userImg {
  margin: 0 8px 0 10px;
  padding: 2px;
  width: 30px;
  height: 30px;
  border-radius: 100% !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #eee;
  vertical-align: middle;
}
.user-name {
  cursor: default;
}
</style>
