<template>
  <div>
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
            <el-col :span="24">
              <el-form-item label="原密码" prop="oldPassword">
                <el-input v-model.trim="ruleForm.oldPassword" :disabled="disabled" type="password"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="新密码" prop="newPassword">
                <el-input v-model.trim="ruleForm.newPassword" :disabled="disabled" type="password"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="确认密码" prop="checkPassword">
                <el-input v-model.trim="ruleForm.checkPassword" :disabled="disabled" type="password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </cvue-dialog>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import cvueDialog from '@/components/cvue-dialog'
import { validPhone, validIp } from '@/util/validator.js'
export default {
  name: 'resetPassword',
  components: {
    cvueDialog
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.ruleForm.newPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      disabled: false,
      dialogLoading: false
    }
  },
  mounted () {
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title () {
      var title = '修改密码'
      return title
    },
    ...mapGetters(['token', 'userInfo'])
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
            oldPassword: this.ruleForm.oldPassword,
            newPassword: this.ruleForm.newPassword,
            rePassword: this.ruleForm.checkPassword
          }
          // console.log(params)
          this.dialogLoading = true
          this.$store.dispatch('user/ChanPwd', params).then(res => {
            // console.log(res)
            if (res.code === 'SUCCESS') {
              this.$message({
                message: res.msg,
                duration: 2000,
                type: 'success'
              })
              this.$emit('confirmDialog')
            } else {
              this.$message({ message: res.msg, duration: 2000, type: 'error' })
            }
            this.dialogLoading = false
          }).catch(err => {
            console.log(err)
            this.dialogLoading = false
            this.$message({ message: err.resp_msg, duration: 2000, type: 'error' })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getDetail () {
    }
  }
}
</script>
<style scoped>
</style>
