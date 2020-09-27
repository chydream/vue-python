<template>
  <div class="grade">
    <el-row :gutter="10">
      <!-- <el-col :span="5">
        <div class="left">
          <div class="left-top">
            年级
            <div class="btn-list">
              <span v-hasPermission="permission.add">新增</span>
            </div>
          </div>
          <div class="left-tree" :style="{height:height}">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </div>
        </div>
      </el-col> -->
      <el-col :span="24">
        <el-card class="box-card mt-15">
          <div class="home-form">
            <el-form ref="ruleForm" label-width="50px" @submit.native.prevent>
              <el-row :gutter="10">
                <el-col :span="4">
                  <el-form-item label="学段" prop="stageId">
                    <el-select v-model.trim="stageId" placeholder="请选择" size="mini" clearable>   
                      <el-option v-for="(item, index) in stageArr" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
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
            <span>年级管理</span>
            <div class="btn-list">
              <el-button size="mini" @click="handleAdd" v-hasPermission="permission.baseData.gradesPost">新增</el-button>
              <el-button size="mini" @click="handleDeleteAll" v-hasPermission="permission.baseData.gradesDeletePost">批量删除</el-button>
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
              <!-- 操作按钮 -->
              <el-table-column fixed="right" slot="actionMenu" label="操作" align="center" header-align="center" width="160">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleEdit(scope.row)" v-hasPermission="permission.baseData.gradesPatch">编辑</el-button>
                  <el-button type="text" size="small" @click="handleDelete(scope.row)" v-hasPermission="permission.baseData.gradesDelete">删除</el-button>
                </template>
              </el-table-column>
            </cvue-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 编辑弹窗 -->
    <grade-edit
      @closeDialog="closeDialog('edit')"
      @confirmDialog="confirmDialog('edit')"
      @handleClose="closeDialog('edit')"
      v-if="dialogGradeEdit"
      :dialogVisible="dialogGradeEdit">
    </grade-edit>
  </div>
</template>

<script>
import cvueTable from '@/components/cvue-table'
import gradeEdit from './gradeEdit'
import {getClientHeight} from '@/util/tool'
export default {
  name: 'grade',
  components: {
    cvueTable,
    gradeEdit
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
          { prop: 'name', label: '年级名称', align: 'center', sortable: true },
          { prop: 'schoolStageName', label: '学段', align: 'center', sortable: true },
          { prop: 'code', label: '年级编码', align: 'center', sortable: true },
          { prop: 'serialNumber', label: '序列号', align: 'center', sortable: true },
          { prop: 'displayOrder', label: '排序号', align: 'center', sortable: true }
        ]
      },
      tableData: [
        { name: 'ddd', code: 'sss', order: 1, status: 1 }
      ],
      dialogGradeEdit: false,
      actionType: 'add',
      data: [
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      stageId: '',
      selectStageId: '',
      stageArr: [],
      rowData: [],
      name: '',
      selectName: '',
      selectIds: []
    }
  },
  computed: {
    height () {
      var height = getClientHeight() - 170
      return height + 'px'
    }
  },
  mounted () {
    // this.handleList(this.selectName, this.selectStageId)
    // this.getStageList()
  },
  methods: {
    // 树点击
    handleNodeClick (data) {
      console.log(data)
    },
    // 新增
    handleAdd () {
      this.actionType = 'add'
      this.dialogGradeEdit = true
    },
    // 编辑
    handleEdit (row) {
      this.actionType = 'edit'
      this.dialogGradeEdit = true
      this.rowData = row
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
        this.$store.dispatch('publicData/GradesDelete', params).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.tablePage = 1
          this.handleList(this.selectName, this.selectStageId)
        }).catch((err) => {
          this.$message({type: 'error', message: err.resp_msg})
        })
      }).catch(() => {
      })
    },
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
        this.$store.dispatch('publicData/GradesDeletePost', params).then(res => {
          // console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.tablePage = 1
          this.handleList(this.selectName, this.selectStageId)
        }).catch((err) => {
          this.$message({type: 'error', message: err.resp_msg})
        })
      }).catch(() => {
      })
    },
    // 改变pagesize
    handleSizeChange (val) {
      this.page.pageSize = val
      this.handleList(this.selectName, this.selectStageId)
    },
    // 改变页码
    handleCurrentChange (val) {
      this.tablePage = val
      this.handleList(this.selectName, this.selectStageId)
    },
    // 单元格单击
    handleCellClick (row, index, prop) {
      this.rowId = row.id
      this.rowTitle = row.name
    },
    // 列表接口
    handleList (name, stageId) {
      this.tableLoading = true
      var params = {
        page: this.tablePage,
        limit: this.page.pageSize,
        name: name,
        stageId: stageId
      }
      this.$store.dispatch('publicData/GradesGet', params).then(res => {
        var data = res.data
        this.tableData = data
        this.page.total = res.count
        this.page.currentPage = this.tablePage
        this.tableLoading = false
      }).catch(err => {
        this.$message({type: 'error', message: err.resp_msg})
        this.tableLoading = false
      })
    },
    // 关闭弹窗
    closeDialog (params) {
      if (params == 'edit') {
        this.dialogGradeEdit = false
      }
    },
    // 确认
    confirmDialog (params) {
      if (params == 'edit') {
        this.dialogGradeEdit = false
        this.tablePage = 1
        this.handleList(this.selectName, this.selectStageId)
      }
    },
    handleSearch () {
      this.selectName = this.name
      this.selectStageId = this.stageId
      this.tablePage = 1
      this.handleList(this.selectName, this.selectStageId)
    },
    // 获取学段列表
    getStageList (schoolId) {
      this.tableLoading = true
      var params = {
        page: this.tablePage,
        limit: this.page.pageSize,
        schoolId: schoolId
      }
      this.$store.dispatch('publicData/SchoolStagesGet', params).then(res => {
        // console.log(res)
        this.stageArr = res.data
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
.grade {
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
  .tree-wrap{
    min-height: 500px;
    background: #fff;
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
