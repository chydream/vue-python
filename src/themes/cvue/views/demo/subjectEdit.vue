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
          label-width="110px"
          class="demo-ruleForm">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="科目名称" prop="name">
                <el-input v-model.trim="ruleForm.name" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="科目编码" prop="code">
                <el-input v-model.trim="ruleForm.code" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="学段" prop="stageId">
                <el-select v-model.trim="ruleForm.stageId" placeholder="请选择" style="width:100%;">   
                  <el-option v-for="(item, index) in stageArr" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="科目分类" prop="categoryCode">
                <el-select v-model.trim="ruleForm.categoryCode" placeholder="请选择" style="width:100%;">   
                  <el-option v-for="(item, index) in SubjectCategory" :key="index" :label="item.name" :value="item.code"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="排序号" prop="displayOrder">
                <el-input v-model.trim="ruleForm.displayOrder" :disabled="disabled" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="科目类型" prop="type">
                <el-radio-group v-model="ruleForm.type">
                  <el-radio :label="1">国标科目</el-radio>
                  <el-radio :label="2">校本科目</el-radio>
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
import mixinsPublicData from '@/mixins/mixinsPublicData'
export default {
  name: 'subjectEdit',
  mixins: [mixinsPublicData],
  components: {
    cvueDialog
  },
  data () {
    return {
      ruleForm: {
        name: '',
        code: '',
        stageId: '',
        categoryCode: '',
        displayOrder: '',
        type: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入学科名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入科目编码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        categoryCode: [
          { required: true, message: '请选择科目分科', trigger: 'blur' }
        ],
        displayOrder: [
          { required: true, message: '请输入排序号', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择科目类型', trigger: 'blur' }
        ]
      },
      disabled: false,
      dialogLoading: false,
      status: 1,
      SubjectCategory: [] // 科目类型
    }
  },
  mounted () {
    // this.getDictList('SubjectCategory')
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
          if (this.$parent.actionType == 'top') {
            params = {
              id: '',
              level: 0,
              parentId: null,
              name: this.ruleForm.name,
              stageId: this.ruleForm.stageId,
              categoryCode: this.ruleForm.categoryCode,
              code: this.ruleForm.code,
              displayOrder: this.ruleForm.displayOrder,
              type: this.ruleForm.type
            }
            this.dialogLoading = true
            this.$store.dispatch('publicData/SubjectsPost', params).then(res => {
              // console.log(res)
              this.$message({
                message: '新增成功',
                duration: 2000,
                type: 'success'
              })
              this.$parent.treeEditData = res
              this.$emit('confirmDialog')
              this.dialogLoading = false
            }).catch((err) => {
              this.$message({type: 'error', message: err.resp_msg})
            })
          } else if (this.$parent.actionType == 'add') {
            params = {
              id: '',
              level: this.$parent.treeNodeData.level + 1,
              parentId: this.$parent.treeNodeData.id,
              name: this.ruleForm.name,
              stageId: this.ruleForm.stageId,
              categoryCode: this.ruleForm.categoryCode,
              code: this.ruleForm.code,
              displayOrder: this.ruleForm.displayOrder,
              type: this.ruleForm.type
            }
            this.dialogLoading = true
            this.$store.dispatch('publicData/SubjectsPost', params).then(res => {
              // console.log(res)
              this.$message({
                message: '新增成功',
                duration: 2000,
                type: 'success'
              })
              this.$parent.treeEditData = res
              this.$emit('confirmDialog')
              this.dialogLoading = false
            }).catch((err) => {
              this.$message({type: 'error', message: err.resp_msg})
            })
          } else {
            params = {
              id: this.$parent.treeNodeData.id,
              level: this.$parent.treeNodeData.level + 1,
              parentId: this.$parent.treeNodeData.parentId,
              name: this.ruleForm.name,
              stageId: this.ruleForm.stageId,
              categoryCode: this.ruleForm.categoryCode,
              code: this.ruleForm.code,
              displayOrder: this.ruleForm.displayOrder,
              type: this.ruleForm.type
            }
            this.dialogLoading = true
            this.$store.dispatch('publicData/SubjectsPatch', params).then(res => {
              // console.log(res)
              this.$message({
                message: '修改成功',
                duration: 2000,
                type: 'success'
              })
              this.$parent.treeEditData = res
              // console.log(this.$parent.treeEditData)
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
    getEditDetail () {
      // console.log(this.$parent.treeNodeData)
      if (this.$parent.actionType == 'edit') {
        this.$set(this.ruleForm, 'name', this.$parent.treeNodeData.name)
        this.$set(this.ruleForm, 'code', this.$parent.treeNodeData.code)
        this.$set(this.ruleForm, 'stageId', this.$parent.treeNodeData.stageId)
        this.$set(this.ruleForm, 'categoryCode', this.$parent.treeNodeData.categoryCode)
        this.$set(this.ruleForm, 'displayOrder', this.$parent.treeNodeData.displayOrder)
        this.$set(this.ruleForm, 'type', this.$parent.treeNodeData.type)
      }
    },
    // 获取字典列表
    getDictList (code, type) {
      var params = {
        categoryCode: code
      }
      this.$store.dispatch('publicData/DictionaryCategoriesGetByCode', params).then(res => {
        if (type == 'tree') {
          this[code + 'Data'] = res.data
          this[code] = this.getDictTree(res.data)
          this[code] = this.setTreeData(this[code])
          // console.log(this[code])
        } else {
          this[code] = res.data
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
