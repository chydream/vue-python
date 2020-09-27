<template>
  <div class="export-edit">
    <!-- 编辑弹窗 -->
    <cvue-dialog
      :dialogVisible="dialogVisible"
      :dialogLoading="dialogLoading"
      :loadingText="loadingText"
      title="批量导入"
      dialogWidth="500px"
      :isShowFoot="false"
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
              <el-form-item label="导入" prop="avatar">
                <cvue-upload
                  accept='.xls,.xlsx'
                  @success="handleSuccess"
                  :isShowFileList="true"
                  :isAutoUpload="false"
                  :actionUrl="actionUrl">
                   <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                    <div class="el-upload__tip" slot="slotTip">只能上传xls/xlsx文件，且不超过30M</div>
                </cvue-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </cvue-dialog>
  </div>
</template>
<script>
import cvueDialog from '@/components/cvue-dialog'
import cvueUpload from '@/components/cvue-upload'
import { validPhone, validIp } from '@/util/validator.js'
import { mapGetters } from 'vuex'
import { eduBureauEmpsUploadUrl, teachersUploadUrl, studentUploadUrl } from '@/config/config.js'
var timer = null
export default {
  name: 'areaEdit',
  components: {
    cvueDialog,
    cvueUpload
  },
  data () {
    return {
      ruleForm: {
        name: '',
        parentName: '',
        status: ''
      },
      rules: {
        id: [
          { required: true, message: '请输入地区ID', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入地区名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      },
      disabled: false,
      dialogLoading: false,
      fileLoading: false,
      actionUrl: '',
      fileList: [],
      step: 0,
      loadingText: '0',
      errorMsg: []
    }
  },
  mounted () {
    this.initUpload()
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title () {
      var title = ''
      if (this.$parent.actionType == 'add') {
        title = '新增'
      } else {
        title = '批量导入'
      }
      return title
    },
     ...mapGetters(['token'])
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
      this.$emit('confirmDialog')
    },
    getDetail () {
    },
    getEditDetail () {
    },
    submitUpload () {
      this.$refs['cvueUpload'].submit()
    },
    initUpload () {
      if (this.$parent.uploadParams == 'eduBureauEmpsUploadUrl') {
        this.actionUrl = eduBureauEmpsUploadUrl
      }
      if (this.$parent.uploadParams == 'teachersUploadUrl') {
        this.actionUrl = teachersUploadUrl
      }
      if (this.$parent.uploadParams == 'studentUploadUrl') {
        this.actionUrl = studentUploadUrl
      }
    },
    handleSuccess ({response, file, fileList}) {
      // console.log(response)
      var self = this
      this.dialogLoading = true
      var data = response.data
      var count = response.count
      // this.setUserData(data, count)
      if (data && data.length > 0) {
        if (timer) {
          clearInterval(timer)
          timer = null
        }
        var z = 0
        timer = setInterval(() => {
          if (z < count) {
            self.setOneData(data[z], count)
            z++
          } else {
            clearInterval(timer)
            timer = null
            setTimeout(() => {
              this.dialogLoading = false
              var msg = '成功' + self.step + '条，失败' + (count - self.step) + '条。' + self.errorMsg.join()
              self.$message({type: 'info', message: msg, duration: 5000})
              z = 0
            }, 5000)
          }
        }, 500)
      } else {
        this.dialogLoading = false
        self.$message({type: 'success', message: '导入成功', duration: 3000})
      }
    },
    async setUserData (data, count) {
      var k = 0
      for (var i = 0; i < count; i++) {
        k = i
        var item = await this.setOneData(data[i], count)
      }
      if (k == count - 1) {
        this.dialogLoading = false
        var msg = '成功' + this.step + '条，失败' + (count - this.step) + '条。'
        this.$message({type: 'info', message: msg})
      }
    },
    // 添加一个用户
    setOneData (data, count) {
      var params = {
        cellphoneNum: data.cellphoneNum,
        roleCode: data.roleCode,
        tenantId: data.tenantId,
        userId: data.userId,
        userName: data.userName
      }
      return new Promise((resolve, reject) => {
        this.$store.dispatch('schoolData/StudentsGenerateUserPost', params).then(res => {
          this.step += 1
          this.percent = Math.floor((this.step / count) * 100)
          // console.log(this.step)
          // console.log(count)
          this.loadingText = this.percent + '%'
          // console.log(res)
          resolve(res)
        }).catch(err => {
          // console.log(err.resp_msg)
          this.errorMsg.push(err.resp_msg)
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.export-edit{
  .dialog-body{
    height: 200px;
  }
}
</style>
