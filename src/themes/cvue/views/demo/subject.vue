<template>
  <div class="edu-circles">
    <el-row :gutter="10">
      <el-col :span="7">
        <div class="left">
          <div class="left-top">
            科目
            <div class="btn-list">
              <span @click="handleAddTop" v-hasPermission="permission.baseData.subjectsPost">新增</span>
            </div>
          </div>
          <div class="left-tree" :style="{height:height}">
            <el-tree 
              :props="defaultProps" 
              :data="data"
              v-loading="treeLoading"
              ref="tree"
              node-key="id"
              accordion
              :highlight-current="true"
              :expand-on-click-node="false" 
              :render-content="renderContent" 
              @node-click="handleNodeClick"></el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <el-card class="box-card mt-15">
          <div class="home-form">
            <el-form ref="ruleForm" label-width="50px" @submit.native.prevent>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="学段" prop="stageId">
                    <el-select v-model.trim="stageId" placeholder="请选择" size="mini" clearable>   
                      <el-option v-for="(item, index) in stageArr" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="名称" prop="name" size="mini">
                    <el-input v-model.trim="name" clearable></el-input>
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
            <span>科目列表</span>
            <div class="btn-list">
              <!-- <el-button size="mini" @click="handleAdd">新增</el-button> -->
              <el-button size="mini" @click="handleDeleteAll" v-hasPermission="permission.baseData.subjectsDeletePost">批量删除</el-button>
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
              <template slot-scope="scope" slot="type">
                <span>{{ scope.row.type == 1 ? '国标科目' : '校本科目' }}</span>
              </template>
            </cvue-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 编辑弹窗 -->
    <subject-edit
      @closeDialog="closeDialog('edit')"
      @confirmDialog="confirmDialog('edit')"
      @handleClose="closeDialog('edit')"
      v-if="dialogSubjectEdit"
      :dialogVisible="dialogSubjectEdit">
    </subject-edit>
  </div>
</template>

<script>
import cvueTable from '@/components/cvue-table'
import subjectEdit from './subjectEdit'
import {getClientHeight} from '@/util/tool'
import mixinsPublicData from '@/mixins/mixinsPublicData'
export default {
  name: 'subject',
  mixins: [mixinsPublicData],
  components: {
    cvueTable,
    subjectEdit
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
          { prop: 'name', label: '学科名称', align: 'center', sortable: true },
          { prop: 'schoolStageName', label: '学段', align: 'center', sortable: true },
          { prop: 'type', label: '科目类型', align: 'center', sortable: true, slotStatus: true }
        ]
      },
      tableData: [
        // { name: 'ddd', code: 'sss', order: 1, status: 1 }
      ],
      dialogSubjectEdit: false,
      actionType: 'add',
      data: [
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      stageId: '',
      selectStageId: '',
      name: '',
      selectName: '',
      treeLoading: false,
      treeNodeData: {},
      treeNodeNode: {},
      treeEditData: {},
      rowData: [],
      selectIds: [],
      selectParentId: ''
    }
  },
  computed: {
    height () {
      var height = getClientHeight() - 170
      return height + 'px'
    }
  },
  mounted () {
    // this.handleList()
    // this.getTreeData()
  },
  methods: {
    // 树点击
    handleNodeClick (data) {
      // console.log(data)
      this.selectParentId = data.id
      this.rowData = data
      this.tablePage = 1
      this.handleList(this.selectStageId, this.selectName, this.selectParentId)
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
    getTreeData (stageId, name) {
      this.treeLoading = true
      var params = {
        page: 1,
        limit: 1000,
        stageId: stageId,
        name: name
      }
      this.$store.dispatch('publicData/SubjectsAllGet', params).then(res => {
        // console.log(res)
        var data = res.data
        this.data = this.getTree(data)
        // console.log(this.data)
        this.treeLoading = false
      }).catch(err => {
        this.$message({type: 'error', message: err.resp_msg})
        this.treeLoading = false
      })
    },
    renderContent (h, { node, data, store }) {
       return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data, event, node) } v-hasPermission={this.permission.baseData.subjectsPost}>添加</el-button>
            <el-button style="font-size: 12px;" type="text" on-click={ () => this.edit(data, event, node) } v-hasPermission={this.permission.baseData.subjectsPatch}>编辑</el-button>
            <el-button style="font-size: 12px;" type="text" on-click={ () => this.delete(data, event, node) } v-hasPermission={this.permission.baseData.subjectsDelete}>删除</el-button>
          </span>
        </span>)
    },
    // 添加
    append (data, event, node) {
      this.actionType = 'add'
      window.event ? window.event.cancelBubble = true : event.stopPropagation()
      this.treeNodeData = data
      this.treeNodeNode = node
      this.dialogSubjectEdit = true
    },
    // 编辑
    edit (data, event, node) {
      this.actionType = 'edit'
      window.event ? window.event.cancelBubble = true : event.stopPropagation()
      this.treeNodeData = data
      this.treeNodeNode = node
      this.dialogSubjectEdit = true
    },
    // 删除
    delete (data, event, node) {
      // console.log(data)
      window.event ? window.event.cancelBubble = true : event.stopPropagation()
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          id: data.id
        }
        this.$store.dispatch('publicData/SubjectsDelete', params).then(res => {
          // console.log(res)
          this.$message({
              message: '删除成功',
              duration: 2000,
              type: 'success'
          })
          this.$refs.tree.remove(data)
          this.tableData = []
        }).catch((err) => {
          this.$message({type: 'error', message: err.resp_msg})
        })
      }).catch(() => {
      })
    },
    // 新增
    handleAddTop () {
      this.actionType = 'top'
      this.dialogSubjectEdit = true
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
        this.$store.dispatch('publicData/SubjectsDeletePost', params).then(res => {
          // console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.tablePage = 1
          this.handleList(this.selectStageId, this.selectName, this.selectParentId)
          this.getTreeData()
        }).catch((err) => {
          this.$message({type: 'error', message: err.resp_msg})
        })
      }).catch(() => {
      })
    },
    // 改变pagesize
    handleSizeChange (val) {
      this.page.pageSize = val
      this.handleList(this.selectStageId, this.selectName, this.selectParentId)
    },
    // 改变页码
    handleCurrentChange (val) {
      this.tablePage = val
      this.handleList(this.selectStageId, this.selectName, this.selectParentId)
    },
    // 单元格单击
    handleCellClick (row, index, prop) {
      this.rowId = row.id
      this.rowTitle = row.name
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
    // 列表接口
    handleList (stageId, name, parentId) {
      this.tableLoading = true
      var params = {
        page: this.tablePage,
        limit: this.page.pageSize,
        stageId: stageId,
        name: name,
        parentId: parentId
      }
      this.$store.dispatch('publicData/SubjectsGet', params).then(res => {
        // console.log(res)
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
        this.dialogSubjectEdit = false
      }
    },
    // 确认
    confirmDialog (params) {
      if (params == 'edit') {
        this.dialogSubjectEdit = false
        if (this.actionType == 'add') {
          this.$refs.tree.append(this.treeEditData, this.$refs.tree.getNode(this.treeNodeData))
        } else if (this.actionType == 'edit') {
          this.$set(this.treeNodeData, 'name', this.treeEditData.name)
          this.$set(this.treeNodeData, 'code', this.treeEditData.code)
          this.$set(this.treeNodeData, 'stageId', this.treeEditData.stageId)
          this.$set(this.treeNodeData, 'categoryCode', this.treeEditData.categoryCode)
          this.$set(this.treeNodeData, 'displayOrder', this.treeEditData.displayOrder)
          this.$set(this.treeNodeData, 'type', this.treeEditData.type)
        } else {
          this.getTreeData()
        }
      }
    },
    handleSearch () {
      if (this.selectParentId == '') {
        this.$message({type: 'warning', message: '请选择科目'})
        return
      }
      this.tablePage = 1
      this.selectStageId = this.stageId
      this.selectName = this.name
      this.handleList(this.selectStageId, this.selectName, this.selectParentId)
    }
  }
}
</script>

<style lang="scss">
.edu-circles {
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
