<template>
  <div class="faculty">
    <el-row :gutter="10">
      <el-col :span="24">
        <el-card class="box-card mt-15">
          <div class="home-form">
            <el-form ref="ruleForm" label-width="50px" @submit.native.prevent>
              <el-row :gutter="10">
                <el-col :span="5">
                  <el-form-item label="部门" prop="deptId">
                    <el-cascader
                      title=""
                      style="width:100%"
                      v-model="deptId"
                      :options="treeOptions"
                      :props="propsOption"
                      :change-on-select="true"
                      :show-all-levels="false"
                      size="mini"
                      clearable></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="工号" prop="empNumber">
                    <el-input  placeholder="请输入工号" v-model.trim="empNumber" clearable size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="姓名" prop="name">
                    <el-input  placeholder="请输入姓名"  v-model.trim="name" clearable size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch" class="search-btn">搜索</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card">
          <!-- 头部 -->
          <div slot="header" class="clearfix fix-lh">
            <span>教职工管理</span>
            <div class="btn-list">
              <el-button size="mini" @click="handleAdd"  v-hasPermission="permission.baseData.teachersPost">新增</el-button>
              <el-button size="mini" @click="handleDeleteAll"  v-hasPermission="permission.baseData.teachersDeletePost">批量删除</el-button>
              <el-button size="mini" @click="handleExport"  v-hasPermission="permission.baseData.teachersImportPost">批量导入</el-button>
              <el-button size="mini" @click="handleDownload">模板下载</el-button>
            </div>
          </div>
          <div class="home-body">
            <cvue-table
              :option="tableOption"
              :data="tableData"
              ref="tbl1"
              :isShowAdd="false"
              :page="page"
              :tablePage="tablePage"
              :pageSize="page.pageSize"
              :loading="tableLoading"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              @select-change="handleSelectChange"
              :isShowPage="true">
              <template slot-scope="scope" slot="sex">
                <span>{{ scope.row.sex == 1 ? '男' : '女' }}</span>
              </template>
              <!-- 操作按钮 -->
              <el-table-column fixed="right" slot="actionMenu" label="操作" align="center" header-align="center" width="160">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleEdit(scope.row)"  v-hasPermission="permission.baseData.teachersPatch">编辑</el-button>
                  <el-button type="text" size="small" @click="handleDelete(scope.row)"  v-hasPermission="permission.baseData.teachersDelete">删除</el-button>
                </template>
              </el-table-column>
            </cvue-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 编辑弹窗 -->
    <!-- <faculty-edit
      @closeDialog="closeDialog('edit')"
      @confirmDialog="confirmDialog('edit')"
      @handleClose="closeDialog('edit')"
      v-if="dialogFacultyEdit"
      :dialogVisible="dialogFacultyEdit">
    </faculty-edit> -->
    <export-edit
      @closeDialog="closeDialog('export')"
      @confirmDialog="confirmDialog('export')"
      @handleClose="closeDialog('export')"
      v-if="dialogeUploadEdit"
      :dialogVisible="dialogeUploadEdit">
    </export-edit>
  </div>
</template>

<script>
import cvueTable from '@/components/cvue-table'
// import facultyEdit from './facultyEdit'
import {getClientHeight} from '@/util/tool'
import exportEdit from '../public/exportEdit'
export default {
  name: 'faculty',
  components: {
    cvueTable,
    exportEdit
  },
  data () {
    return {
      tablePage: 1,
      tableLoading: false,
      page: {
        total: 1, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
        pageSizes: [10, 50, 100]
      },
      tableOption: {
        stripe: true,
        width: '100%',
        border: true,
        index: false,
        selected: true,
        cloumn: [
          { prop: 'name', label: '姓名', align: 'center', sortable: true },
          { prop: 'sex', label: '性别', align: 'center', sortable: true, slotStatus: true },
          { prop: 'userName', label: '用户名', align: 'center', sortable: true },
          { prop: 'cellphoneNum', label: '手机号', align: 'center', sortable: true },
          { prop: 'empNumber', label: '工号', align: 'center', sortable: true },
          { prop: 'deptNames', label: '部门', align: 'center', sortable: true }
        ]
      },
      tableData: [
        { name: 'ddd', code: 'sss', order: 1, status: 1 }
      ],
      dialogFacultyEdit: false,
      actionType: 'add',
      data: [
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      rowData: [],
      empNumber: '',
      selectEmpNumber: '',
      name: '',
      selectName: '',
      propsOption: {
        label: 'name',
        value: 'id'
      },
      treeOptions: [],
      deptId: [],
      selectDeptId: '',
      selectIds: [],
      uploadParams: 'teachersUploadUrl',
      dialogeUploadEdit: false
    }
  },
  computed: {
    height () {
      var height = getClientHeight() - 170
      return height + 'px'
    }
  },
  mounted () {
    // this.handleList(this.selectEmpNumber, this.selectName, this.selectDeptId)
    // this.getTreeData()
  },
  methods: {
    getTreeData () {
      this.treeLoading = false
      var params = {
       schoolId: this.$route.query.schoolId
      }
      this.$store.dispatch('schoolData/SchoolsDeptsGet', params).then(res => {
        // console.log(res)
        var data = res.data
        this.treeOptions = this.getTree(data)
        this.treeOptions = this.setTreeData(this.treeOptions)
        this.treeLoading = false
      }).catch(err => {
        this.$message({type: 'error', message: err.resp_msg})
        this.treeLoading = false
      })
    },
    // 递归生成树树
    getTree (treeData) {
      for (var i = 0; i < treeData.length; i++) {
        treeData[i].children = []
        for (var j = 0; j < treeData.length; j++) {
          if (treeData[i].id == treeData[j].parentId) {
            treeData[i].children.push(treeData[j])
          }
        }
      }
      var arr = []
      for (i = 0; i < treeData.length; i++) {
        if (treeData[i].parentId === null) {
          arr.push(treeData[i])
        }
      }
      return arr
    },
    // 递归
    setTreeData (arr) { 
      arr.forEach((item, index) => {
        if (this.$parent.actionType == 'edit') {
          if (item.id == this.$parent.rowData.id) {
            item.disabled = true
            item.children = null
          }
        }
        if (item.children && item.children.length > 0) {
          this.setTreeData(item.children)
        } else {
          item.children = null
        }
      })
      return arr
    },
    // 新增
    handleAdd () {
      // this.actionType = 'add'
      // this.dialogFacultyEdit = true
      this.goUrl('faculty-edit', {schoolId: this.$route.query.schoolId, name: this.$route.query.name, currentYearId: this.$route.query.currentYearId, actionType: 'add', eduBureauId: this.$route.query.eduBureauId})
    },
    // 编辑
    handleEdit (row) {
      // this.actionType = 'edit'
      // this.dialogFacultyEdit = true
      // this.rowData = row
      this.goUrl('faculty-edit', {schoolId: this.$route.query.schoolId, name: this.$route.query.name, currentYearId: this.$route.query.currentYearId, actionType: 'edit', eduBureauId: this.$route.query.eduBureauId, id: row.id})
    },
    // 删除
    handleDelete (row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          id: row.id
        }
        this.$store.dispatch('schoolData/TeachersDelete', params).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.tablePage = 1
          this.handleList(this.selectEmpNumber, this.selectName, this.selectDeptId)
        }).catch((err) => {
          this.$message({type: 'error', message: err.resp_msg})
        })
      }).catch(() => {
      })
    },
    // 表格选择
    handleSelectChange (val) {
      // console.log(val)
      var arr = []
      for (var i = 0; i < val.length; i++) {
        arr.push(val[i].id)
      }
      this.selectIds = arr
      // console.log(this.selectIds)
    },
    // 批量删除
    handleDeleteAll () {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.selectIds.length == 0) {
          this.$message({type: 'error', message: '至少选择一条'})
          return
        }
        var params = this.selectIds
        this.$store.dispatch('schoolData/TeachersDeletePost', params).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.tablePage = 1
          this.handleList(this.selectEmpNumber, this.selectName, this.selectDeptId)
        }).catch((err) => {
          this.$message({type: 'error', message: err.resp_msg})
        })
      }).catch(() => {
      })
    },
    // 改变pagesize
    handleSizeChange (val) {
      this.page.pageSize = val
      this.handleList(this.selectEmpNumber, this.selectName, this.selectDeptId)
    },
    // 改变页码
    handleCurrentChange (val) {
      this.tablePage = val
      this.handleList(this.selectEmpNumber, this.selectName, this.selectDeptId)
    },
    // 单元格单击
    handleCellClick (row, index, prop) {
      this.rowId = row.id
      this.rowTitle = row.name
    },
    // 列表接口
    handleList (empNumber, name, deptId) {
      this.tableLoading = true
      var params = {
        page: this.tablePage,
        limit: this.page.pageSize,
        empNumber: empNumber,
        name: name,
        deptId: deptId,
        schoolId: this.$route.query.schoolId
      }
      this.$store.dispatch('schoolData/SchoolsTeachersGet', params).then(res => {
        // console.log(res)
        var data = res.data
        this.tableData = data
        this.page.total = res.count
        this.page.currentPage = this.tablePage
        this.tableLoading = false
      }).catch(err => {
        console.log(err)
        this.tableLoading = false
      })
    },
    // 关闭弹窗
    closeDialog (params) {
      if (params == 'edit') {
        this.dialogFacultyEdit = false
      }
      if (params == 'export') {
        this.dialogeUploadEdit = false
        this.tablePage = 1
        this.handleList(this.selectEmpNumber, this.selectName, this.selectDeptId)
      }
    },
    // 确认
    confirmDialog (params) {
      if (params == 'edit') {
        this.dialogFacultyEdit = false
        this.tablePage = 1
        this.handleList(this.selectEmpNumber, this.selectName, this.selectDeptId)
      }
      if (params == 'export') {
        this.dialogeUploadEdit = false
      }
    },
    handleSearch () {
      this.tablePage = 1
      this.selectEmpNumber = this.empNumber
      this.selectName = this.name
      if (this.deptId.length > 0) {
        this.selectDeptId = this.deptId[this.deptId.length - 1]
      }
      this.handleList(this.selectEmpNumber, this.selectName, this.selectDeptId)
    },
    handleDownload () {
      this.$store.dispatch('schoolData/TeachersDownloadTemplateGet', '').then(res => {
        var fileName = '教职工信息'
        var el = document.createElement('a')
        el.href = URL.createObjectURL(res)
        el.download = fileName + '.xls'
        el.style.display = 'none'
        document.body.appendChild(el)
        el.click()
      }).catch(err => {
        console.log(err)
      })
    },
    handleExport () {
      this.dialogeUploadEdit = true
    }
  }
}
</script>

<style lang="scss">
.faculty {
  padding: 0px !important;
  height: auto !important;
  .btn-list {
    float: right;
    margin-right: 10px;
    font-size: 12px;
    color: #409EFF;
    cursor: pointer;
  }
  .el-card__header {
    border-bottom: none;
  }
  .el-card__header,
  .el-card__body {
    padding: 15px;
  }
  .fix-lh {
    line-height: 32px;
  }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
  .left{
    min-height:500px;
    background:#fff;
  }
  .left-tree{
    width: 100%;
    min-height:600px;
    overflow: auto;
  }
  .left-top{
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #333;
    background: #e2e2e2;
    font-size: 15px;
  }
}
</style>
