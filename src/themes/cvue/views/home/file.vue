<template>
  <div class="cvue-upload upload-class" style="min-width: 300px;">
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
       name="file"
      :data="fileParams"
      :show-file-list="isShowFileList"
      :http-request="uploadFile"
      :auto-upload="false"
      v-loading="loading"
      :limit="1"
      element-loading-background="transparent"
      :file-list="fileList">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-progress :percentage="percent" v-if="isUpload"></el-progress>
    <!-- <img :src="src" /> -->
    <!-- <input type="file" name="files" id="fileList"> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { bigFilePost, mergeFilePost } from '@/api/fileApi'
import BMF from 'browser-md5-file'
const bmf = new BMF()
var timer = null
export default {
  name: 'upload',
  data () {
    return {
      loading: false,
      loadingText: '10%',
      isUpload: false,
      percent: 0,
      total: 10,
      src: '',
      uploadErrorSlice: [],
      step: 0
    }
  },
  created () {
  },
  computed: {
    ...mapGetters(['token']),
    accessToken () {
      var accessToken = {
        'Authorization': 'bearer ' + this.token
      }
      return accessToken
    }
  },
  props: {
    cssClass: {
      type: String,
      default: 'upload-class'
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
      default: true
    },
    fileLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    format (percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    },
    // 上传前
    handleBeforeupload (file) {
      // const isJPG = file.type === 'image/jpeg'
      // var pattern = /(\.jpg)|(\.png)|(\.jpeg)|(\.gif)/ig
      // if (!pattern.test(file.name)) {
      //   this.$message({ message: '上传文件只支持jpg、png、jpeg、gif格式', type: 'error' })
      //   return false
      // }
      // var m = (file.size / (1024 * 1024)).toFixed(2)
      // if (m > 30) {
      //   this.$message({ message: '最大限制30M', type: 'error' })
      //   return false
      // }
      return true
    },
    // 成功
    handleSuccess (response, file, fileList) {
      if (response.success) {
        this.$message({ message: response.message, duration: 2000, type: 'success' })
      } else {
        this.$message({ message: response.message, duration: 2000, type: 'error' })
      }
      this.$emit('success', {response, file, fileList})
    },
    // 错误
    handleError (err, file, fileList) {
      this.$message({ message: '上传失败', type: 'error' })
      console.log(err)
    },
    // 移除
    handleRemove (file, fileList) {
      this.isUpload = false
      this.step = 0
      this.percent = 0
      // console.log(this.percent)
      return true
    },
    // 预览
    handlePreview (file) {
    },
    // 自定义文件上传
    uploadFile (param) { 
      // :http-request="uploadFile"
      var fileObj = param.file
      var files = this.fileSliceBySize(fileObj, this.total)
      var promise = []
      bmf.md5(fileObj.slice(0, 4194304), (err, md5) => {
          var self = this
          console.log(err)
          console.log(md5)
          var bool = localStorage.getItem('fileMd5') && localStorage.getItem('fileMd5') === md5
          var uploadErrorSlice = JSON.parse(localStorage.getItem(md5))
          if (bool && uploadErrorSlice && uploadErrorSlice.length > 0) {
            var guuid = localStorage.getItem(md5 + 'guuid')
            // console.log(guuid + '22')
            var fileIndex = localStorage.getItem('fileIndex')
            if (timer) {
              clearInterval(timer)
              timer = null
            }
            var z = 0
            var len = uploadErrorSlice.length
            timer = setInterval(() => {
              if (z < self.total) {
                // console.log(z)
                // console.log(uploadErrorSlice)
                if (uploadErrorSlice.indexOf(z) >= 0) {
                  promise.push(self.bigFilePost(z, files[z], md5, guuid))
                }
                z++ 
              } else {
                // console.log(k)
                Promise.all(promise).then(res => {
                  // console.log(fileObj)
                  this.mergeFilePost(fileObj.name, fileObj, md5, guuid)
                })
                z = 0
                clearInterval(timer)
                timer = null
              }
            }, 700)
          } else {
            localStorage.setItem('fileMd5', md5)
            var guuids = this.getuuid()
            localStorage.setItem(md5 + 'guuid', guuids)
            // console.log(guuids)
            if (timer) {
              clearInterval(timer)
              timer = null
            }
            var k = 0
            timer = setInterval(() => {
              // console.log(guuids)
              if (k < self.total) {
                promise.push(self.bigFilePost(k, files[k], md5, guuids))
                k++ 
              } else {
                // console.log(k)
                Promise.all(promise).then(res => {
                  // console.log(fileObj)
                  this.mergeFilePost(fileObj.name, fileObj, md5, guuids)
                })
                k = 0
                clearInterval(timer)
                timer = null
              }
            }, 700)
          }
        }, progress => {
          // console.log('progress number:', progress)
        }
      )
    },
    submitUpload () {
      this.isUpload = true
      this.$refs['cvue-upload'].submit()
    },
    fileSlice (file, num) {
      var fileList = []
      var size = Math.ceil(file.size / num)
      var start = 0
      while (start < file.size) {
        fileList.push(file.slice(start, start + size))
        start += size
      }
      return fileList
    },
    fileSliceBySize (file) {
      // 1M = 1048576B
      // 2M = 2097152B
      // 4M = 4194304B
      var fileList = []
      var chunkSize = 4194304
      var num = Math.ceil(file.size / chunkSize)
      var start = 0
      while (start < file.size) {
        fileList.push(file.slice(start, start + chunkSize))
        start += chunkSize
      }
      this.total = fileList.length
      return fileList
    },
    bigFilePost (index, file, md5, guuids) {
      // this.percent += this.total / 100
      return new Promise((resolve, reject) => {
        var formData = new FormData()
        formData.append('file', file)
        formData.append('index', index)
        formData.append('chunk', index)
        formData.append('chunks', this.total)
        formData.append('guid', guuids)
        // formData.append('isPublicRead', false)
        this.loading = false
        bigFilePost(formData).then(res => {
          // console.log(res)
          this.step += 1
          this.percent = Math.floor((this.step / (this.total + 10)) * 100)
          var uploadErrorSlice = JSON.parse(localStorage.getItem(md5))
          if (uploadErrorSlice && uploadErrorSlice.indexOf(index) >= 0) {
            var uIndex = uploadErrorSlice.indexOf(index)
            // console.log(uIndex)
            uploadErrorSlice.splice(uIndex, 1)
            localStorage.setItem(md5, JSON.stringify(uploadErrorSlice))
          }
          resolve(res)
        }).catch(error => {
          // console.log(file)
          // this.isUpload = false
          if (this.uploadErrorSlice.indexOf(index) < 0) {
            this.uploadErrorSlice.push(index)
            localStorage.setItem(md5, JSON.stringify(this.uploadErrorSlice))
          }
          this.$message({ message: '上传失败', type: 'error' })
          // this.fileList = []
          reject(error)
        })
      })
    },
    mergeFilePost (fileName, fileObj, md5, guuids) {
      var params = {
        fileName: fileName,
        guid: guuids,
        isPublicRead: 1
      }
      this.$store.dispatch('fileFun/MergeFilePost', params).then(res => {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
        this.percent = 100
        setTimeout(() => {
          this.isUpload = false
          this.percent = 0
        }, 500)
        localStorage.removeItem('fileMd5')
        localStorage.removeItem(md5)
        localStorage.removeItem(md5 + 'guuid')
      }).catch((err) => {
        this.$message({type: 'error', message: err.resp_msg})
      })
    },
    getObjectURL (file) {
      var url = null
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file) 
      }
      return url
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
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = ''
        uuid[14] = '4'
        for (i = 0; i < 32; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random() * 16
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
          }
        }
      }
      return uuid.join('')
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-class {
  width: 300px;
}
</style>
