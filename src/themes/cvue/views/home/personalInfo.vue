<template>
  <div class="personal-info">
    <!-- 编辑弹窗 -->
    <cvue-dialog
      :dialogVisible="dialogVisible"
      :title="title"
      :dialogLoading="dialogLoading"
      dialogWidth="500px"
      @handleOpen="getDetail"
      @closeDialog="closeDialog"
      @confirmDialog="confirmDialog"
      @handleClose="handleClose">
      <div class="dialog-body" slot="dialogBody">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm">
          <el-row :gutter="20">
            <el-col :span="24" v-if="false">
              <el-form-item label="账号" prop="username">
                <el-input v-model.trim="ruleForm.username" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="昵称" prop="nickname">
                <el-input v-model.trim="ruleForm.nickname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model.trim="ruleForm.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="ruleForm.sex">
                  <el-radio :label="0">男</el-radio>
                  <el-radio :label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <el-form-item label="头像" prop="avatar">
                <cvue-upload 
                  cssClass="avatar-uploader"
                  :fileParams="fileParams"
                  :fileLoading="fileLoading"
                  @success="handleAvatarSuccess"
                  actionUrl="/api-file/files-anon">
                  <template>
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </template>
                </cvue-upload>
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
      </div>
    </cvue-dialog>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import cvueDialog from '@/components/cvue-dialog'
import cvueUpload from '@/components/cvue-upload'
import { validPhone, validIp } from '@/util/validator.js'
export default {
  name: 'personalInfo',
  components: {
    cvueDialog,
    cvueUpload
  },
  data () {
    return {
      ruleForm: {
        username: '',
        nickname: '',
        phone: '',
        sex: 0,
        avatar: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validPhone, trigger: 'blur' }
        ]
      },
      disabled: true,
      dialogLoading: false,
      imageUrl: '',
      fileLoading: false
    }
  },
  mounted () {
    this.getPersonalInfo()
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title () {
      var title = '个人信息'
      return title
    },
    ...mapGetters(['token', 'userInfo']),
    fileParams () {
      return {
        'access_token': this.token
      }
    }
  },
  methods: {
    // 触发事件
    handleClose () {
      this.$emit('handleClose')
    },
    closeDialog () {
      this.$emit('closeDialog')
    },
    confirmDialog () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          var params = {
            id: this.userInfo.id,
            nickname: this.ruleForm.nickname,
            phone: this.ruleForm.phone,
            sex: this.ruleForm.sex,
            // username: this.ruleForm.username,
            file: '',
            headImgUrl: ''
          }
          // console.log(params)
          this.dialogLoading = true
          this.$store.dispatch('user/UpdateMe', params).then(res => {
            // console.log(res)
            this.$message({
              message: '修改成功',
              duration: 2000,
              type: 'success'
            })
            this.$emit('confirmDialog')
            this.dialogLoading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getDetail () {
    },
    getPersonalInfo () {
      this.$set(this.ruleForm, 'username', this.userInfo.username)
      this.$set(this.ruleForm, 'nickname', this.userInfo.nickname)
      this.$set(this.ruleForm, 'phone', this.userInfo.phone)
      this.$set(this.ruleForm, 'sex', this.userInfo.sex)
      this.imageUrl = this.userInfo.headImgUrl == '/static/img/main/photo.png' ? '' : this.userInfo.headImgUrl
    },
    handleAvatarSuccess ({response, file, fileList}) {
      console.log(response)
    }
  }
}
</script>
<style lang="scss">
.personal-info{
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
}
</style>
