<template>
  <div class="cvue-upload">
    <el-upload
      :class="cssClass"
      ref="cvue-upload"
      :action="actionUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="handleBeforeupload"
      :headers="accessToken"
      :accept="accept"
      name="file"
      :data="fileParams"
      :show-file-list="isShowFileList"
      :auto-upload="isAutoUpload"
      :file-list="fileList">
        <!-- <el-button size="small" type="primary">点击上传</el-button> -->
        <el-button slot="trigger" size="small" type="primary" v-if="!isAutoUpload">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" v-if="!isAutoUpload">上传到服务器</el-button>
        <div v-loading="fileLoading"><slot></slot></div>
        <div slot="tip" class="el-upload__tip"><slot name="slotTip"></slot></div>
    </el-upload>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'upload',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['token']),
    accessToken () {
      var accessToken = {
        'Authorization': 'Bearer ' + this.token
      }
      return accessToken
    }
  },
  props: {
    accept: {
      type: String,
      default: ''
    },
    cssClass: {
      type: String,
      default: ''
    },
    actionUrl: {
      type: String,
      default: 'https://jsonplaceholder.typicode.com/posts/'
    },
    headToken: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    fileParams: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    fileList: {
      type: Array,
      default: () => {
        return [] // 附件列表
      }
    },
    isShowFileList: {
      type: Boolean,
      default: false
    },
    fileLoading: {
      type: Boolean,
      default: false
    },
    isAutoUpload: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 上传前
    handleBeforeupload (file) {
      const isJPG = file.type === 'image/jpeg'
      var pattern = ''
      if (this.accept == '.xls,.xlsx') {
        pattern = /(\.jpg)|(\.png)|(\.jpeg)|(\.gif)/ig
      } else {
        if (!pattern.test(file.name)) {
          this.$message({ message: '上传文件只支持jpg、png、jpeg、gif格式', type: 'error' })
          return false
        }
      }
      var m = (file.size / (1024 * 1024)).toFixed(2)
      if (m > 30) {
        this.$message({ message: '最大限制30M', type: 'error' })
        return false
      }
      return true
    },
    // 成功
    handleSuccess (response, file, fileList) {
      this.$message({ message: '导入成功', duration: 2000, type: 'success' })
      this.$emit('success', {response, file, fileList})
    },
    // 错误
    handleError (err, file, fileList) {
      var errData = JSON.parse(err.message)
      this.$message({ message: errData.resp_msg, duration: 5000, type: 'error' })
    },
    // 移除
    handleRemove (file, fileList) {
      // return true
    },
    // 预览
    handlePreview (file) {
    },
    // 自定义文件上传
    uploadFile (param) { 
      // :http-request="uploadFile"
      var fileObj = param.file
      var formData = new FormData()
      var params = {
        filename: ''
      }
      formData.append('MS_HttpContext', fileObj)
      formData.append('data', JSON.stringify(params))
      this.$store.dispatch('payroll/ExcelFilePreview', formData).then(res => {
        console.log(res)
      })
    },
    submitUpload () {
      this.$refs['cvue-upload'].submit()
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
