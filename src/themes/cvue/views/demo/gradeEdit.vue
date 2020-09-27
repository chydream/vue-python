<template>
  <div>
    <!-- 编辑弹窗 -->
    <cvue-dialog
      :dialogVisible="dialogVisible"
      :title="title"
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
              <el-form-item label="年级名称" prop="name">
                <el-input v-model.trim="ruleForm.name" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="年级简称" prop="shortName">
                <el-input v-model.trim="ruleForm.shortName" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="年级编码" prop="code">
                <el-input v-model.trim="ruleForm.code" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="学段" prop="stageId">
                <el-select v-model.trim="ruleForm.stageId" placeholder="请选择" style="width:100%">   
                  <el-option v-for="(item, index) in stageArr" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="序列号" prop="serialNumber">
                <el-input v-model.trim="ruleForm.serialNumber" :disabled="disabled" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="排序号" prop="displayOrder">
                <el-input v-model.trim="ruleForm.displayOrder" :disabled="disabled" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="是否最高年级" prop="isTopGrade">
                <el-radio-group v-model="ruleForm.isTopGrade">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
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
import { validPhone, validIp } from '@/util/validator.js'
export default {
  name: 'gradeEdit',
  components: {
    cvueDialog
  },
  data () {
    return {
      ruleForm: {
        name: '',
        stageId: '',
        displayOrder: '',
        shortName: '',
        code: '',
        isTopGrade: 0
      },
      rules: {
        name: [
          { required: true, message: '请输入年级名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入年级编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        shortName: [
          { required: true, message: '请输入年级简写', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        stageId: [
          { required: true, message: '请选择学段', trigger: 'blur' }
        ],
        displayOrder: [
          { required: true, message: '请输入排序号', trigger: 'blur' }
        ],
        serialNumber: [
          { required: true, message: '请输入序列号', trigger: 'blur' }
        ]
      },
      disabled: false,
      dialogLoading: false,
      status: 1,
      stageArr: []
    }
  },
  mounted () {
    // this.getStageList()
    // this.getEditDetail()
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
        title = '编辑'
      }
      return title
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
          var params
          if (this.$parent.actionType == 'add') {
            params = {
              id: '',
              name: this.ruleForm.name,
              stageId: this.ruleForm.stageId,
              displayOrder: this.ruleForm.displayOrder,
              shortName: this.ruleForm.shortName,
              code: this.ruleForm.code,
              isTopGrade: this.ruleForm.isTopGrade,
              serialNumber: this.ruleForm.serialNumber
            }
            this.dialogLoading = true
            this.$store.dispatch('publicData/GradesPost', params).then(res => {
              // console.log(res)
              this.$message({
                message: '新增成功',
                duration: 2000,
                type: 'success'
              })
              this.$emit('confirmDialog')
              this.dialogLoading = false
            }).catch((err) => {
              this.$message({type: 'error', message: err.resp_msg})
            })
          } else {
            params = {
              id: this.$parent.rowData.id,
              name: this.ruleForm.name,
              stageId: this.ruleForm.stageId,
              displayOrder: this.ruleForm.displayOrder,
              shortName: this.ruleForm.shortName,
              code: this.ruleForm.code,
              isTopGrade: this.ruleForm.isTopGrade,
              serialNumber: this.ruleForm.serialNumber
            }
            this.dialogLoading = true
            this.$store.dispatch('publicData/GradesPatch', params).then(res => {
              this.$message({
                message: '修改成功',
                duration: 2000,
                type: 'success'
              })
              this.$emit('confirmDialog')
              this.dialogLoading = false
            }).catch((err) => {
              this.$message({type: 'error', message: err.resp_msg})
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getDetail () {
    },
    // 获取学段列表
    getStageList (schoolId) {
      this.tableLoading = true
      var params = {
        page: 1,
        limit: 100,
        schoolId: schoolId
      }
      this.$store.dispatch('publicData/SchoolStagesGet', params).then(res => {
        // console.log(res)
        this.stageArr = res.data
        this.tableLoading = false
      })
    },
    getEditDetail () {
      // console.log(this.$parent.rowData)
      if (this.$parent.actionType == 'edit') {
        this.$set(this.ruleForm, 'name', this.$parent.rowData.name)
        this.$set(this.ruleForm, 'stageId', this.$parent.rowData.stageId)
        this.$set(this.ruleForm, 'displayOrder', this.$parent.rowData.displayOrder)
        this.$set(this.ruleForm, 'shortName', this.$parent.rowData.shortName)
        this.$set(this.ruleForm, 'code', this.$parent.rowData.code)
        this.$set(this.ruleForm, 'isTopGrade', this.$parent.rowData.isTopGrade)
        this.$set(this.ruleForm, 'serialNumber', this.$parent.rowData.serialNumber)
      }
    }
  }
}
</script>
<style scoped>
</style>
