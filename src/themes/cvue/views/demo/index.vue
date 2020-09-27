<template>
  <div class="home">
    <!-- 表单 -->
    <el-card class="box-card mt-15">
      <div class="home-form">
        <el-form ref="ruleForm" label-width="60px" @submit.native.prevent>
          <el-row :gutter="10">
            <el-col :span="5">
              <el-form-item label="关键字" prop="keyword">
                <el-input placeholder="请输入网吧ID/名称/地址" size="mini" v-model.trim="keyword" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                @click="handleSearch"
                class="search-btn"
              >搜索</el-button>
              <!-- <el-button type="primary" icon="el-icon-menu" @click="getAll">全部：{{cybercafeCount.sum}}</el-button>
              <el-button type="info" icon="el-icon-tickets" @click="getOffLine">离线：{{cybercafeCount.offline}}</el-button>-->
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix fix-lh">
        <span>网吧详情</span>
        <div class="btn-list">
          <el-button size="mini" @click="handleRefresh">刷新</el-button>
          <el-button size="mini" @click="handleAdd" v-hasPermission="permission.add">新增</el-button>
          <el-button size="mini" @click="batchImportSHow" v-hasPermission="permission.add">批量导入</el-button>
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
          @cellClick="handleCellClick"
          :isShowPage="true"
        >
          <!-- <el-button type="text" size="small" @click="handleClick(scope.row)" slot="cloumnSlot">编辑</el-button> -->
          <!-- 本网质量 -->
          <el-table-column label="本网质量" slot="multipleCloumn" align="center">
            <el-table-column
              :prop="cloumn.prop"
              :label="cloumn.label"
              :width="cloumn.width"
              :align="cloumn.align"
              :headerAlign="cloumn.headerAlign"
              :key="cloumn.prop"
              v-for="cloumn in ownNetworkQuality"
            >
              <template slot-scope="scope">
                <div class="cell-wrap" @click="handleCellClick(scope.row,scope.$index,cloumn.prop)">
                  <span v-if="cloumn.prop=='delayed'">
                    <em
                      style="color:#2ead85"
                      v-if="scope.row[cloumn.prop]<=100"
                    >{{scope.row[cloumn.prop]}}</em>
                    <em
                      style="color:#fc8902"
                      v-else-if="scope.row[cloumn.prop]<=200&&scope.row[cloumn.prop]>=100"
                    >{{scope.row[cloumn.prop]}}</em>
                    <em v-else-if="scope.row[cloumn.prop]=='-'">{{scope.row[cloumn.prop]}}</em>
                    <em style="color:#db5b5a" v-else>{{scope.row[cloumn.prop]}}</em>
                  </span>
                  <span v-else>{{scope.row[cloumn.prop]}}</span>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <!-- 出口质量 -->
          <el-table-column label="出口质量" slot="multipleCloumn" align="center">
            <el-table-column
              :prop="cloumn.prop"
              :label="cloumn.label"
              :width="cloumn.width"
              :align="cloumn.align"
              :headerAlign="cloumn.headerAlign"
              :key="cloumn.prop"
              v-for="cloumn in thirdNetworkQuality"
            >
              <template slot-scope="scope">
                <div class="cell-wrap" @click="handleCellClick(scope.row,scope.$index,cloumn.prop)">
                  <span v-if="cloumn.prop=='thirdDelayed'">
                    <em
                      style="color:#2ead85"
                      v-if="scope.row[cloumn.prop]<=100"
                    >{{scope.row[cloumn.prop]}}</em>
                    <em
                      style="color:#fc8902"
                      v-else-if="scope.row[cloumn.prop]<=200&&scope.row[cloumn.prop]>=100"
                    >{{scope.row[cloumn.prop]}}</em>
                    <em v-else-if="scope.row[cloumn.prop]=='-'">{{scope.row[cloumn.prop]}}</em>
                    <em style="color:#db5b5a" v-else>{{scope.row[cloumn.prop]}}</em>
                  </span>
                  <span v-else>{{scope.row[cloumn.prop]}}</span>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <!-- 操作按钮 -->
          <el-table-column
            fixed="right"
            slot="actionMenu"
            label="操作"
            align="center"
            header-align="center"
            width="160"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleEdit(scope.row)"
                v-hasPermission="permission.edit"
              >编辑</el-button>
              <!-- <el-button type="text" size="small" @click="handleFaultAnalysis(scope.row)">故障分析</el-button> -->
              <el-button
                type="text"
                size="small"
                @click="handleDelete(scope.row)"
                v-hasPermission="permission.delete"
              >删除</el-button>
            </template>
          </el-table-column>
        </cvue-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import cvueTable from '@/components/cvue-table'
import cvueDialog from '@/components/cvue-dialog'
import { baseUrl } from '@/config/config.js'
export default {
  name: 'Home',
  components: {
    cvueTable,
    cvueDialog
  },
  data () {
    return {
      value1: '19:42',
      endTime: '',
      startTime: '09:30',
      uploadLoading: false,
      uploadHeader: {
        'Authorization': this.$store.getters.token
      },
      uploadData: {
        // 'importFile': 'file'
      },
      uploadUrl: '',
      downloadUrl: '',
      batchImportVisable: false,
      cybercafeCount: {
        offline: 0,
        online: 0,
        sum: 0
      },
      rowId: '',
      rowTitle: '',
      keyword: '',
      status: '',
      lineStatus: 0,
      tableLoading: false,
      dialogVisible: false,
      dialogVisibleEdit: false,
      dialogVisibleAdd: false,
      dialogVisibleNet: false,
      dialogVisibleExit: false,
      dialogVisibleCondition: false,
      dialogVisibleFault: false,
      tablePage: 1,
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
        cloumn: [
          { prop: 'index', label: '序号', align: 'center', width: 55 },
          { prop: 'id', label: '网吧ID', align: 'center', solt: true, width: 60 },
          { prop: 'name', label: '网吧名称', align: 'center', width: 160 },
          { prop: 'region', label: '所属区域', align: 'center', width: 90 },
          { prop: 'status', label: '在线情况', align: 'center' }
        ]
      },
      ownNetworkQuality: [
        { prop: 'DNS', label: 'DNS地址', align: 'center', width: 110 },
        { prop: 'packetLossRate', label: '丢包率', align: 'center', width: 75 },
        { prop: 'shake', label: '抖动(ms)', align: 'center', width: 75 },
        { prop: 'delayed', label: '平均时延(ms)', align: 'center', width: 95 }
      ],
      thirdNetworkQuality: [
        { prop: 'thirdDNS', label: 'DNS地址', align: 'center', width: 110 },
        { prop: 'thirdPacketLossRate', label: '丢包率', align: 'center', width: 75 },
        { prop: 'thirdShake', label: '抖动(ms)', align: 'center', width: 75 },
        { prop: 'thirdDelayed', label: '平均时延(ms)', align: 'center', width: 95 }
      ],
      tableData: [
        // {
        //   id: '1', name: '网吧1', status: '在线', DNS: '5555', packetLossRate: '5555', shake: '5555', delayed: '555', thirdDNS: '5555', thirdPacketLossRate: '5555', thirdShake: '5555', thirdDelayed: '666'
        // },
      ]
    }
  },
  mounted () {
    // this.handleList(this.keyword, this.status) // 获取列表详情
    // this.getCybercafeNum() // 获取网吧数量
  },
  methods: {
    getDate (value) {
      console.log(value)
    },
    handleRefresh () {
      this.tablePage = 1
      this.handleList('', '') // 刷新列表
    },
    handleClick (row) {
      console.log(row)
    },
    // 改变pagesize
    handleSizeChange (val) {
      this.page.pageSize = val
      this.handleList(this.keyword, this.status)
      // this.getCybercafeNum() // 获取网吧数量
    },
    // 改变页码
    handleCurrentChange (val) {
      this.tablePage = val
      this.handleList(this.keyword, this.status)
      // this.getCybercafeNum() // 获取网吧数量
    },
    // 网吧搜索
    handleSearch () {
      this.tablePage = 1
      this.status = ''
      this.handleList(this.keyword, this.status)
    },
    // 获取离线网吧列表
    getOffLine () {
      this.tablePage = 1
      this.keyword = ''
      this.status = 0
      this.handleList(this.keyword, this.status)
    },
    // 获取全部网吧列表
    getAll () {
      this.tablePage = 1
      this.keyword = ''
      this.status = ''
      this.handleList(this.keyword, this.status)
    },
    // 列表接口
    handleList (keyword, status) {
      this.tableLoading = true
      var params = {
        pageIndex: this.tablePage,
        pageSize: this.page.pageSize,
        keyword: keyword,
        status: status
      }
      this.$store.dispatch('demo/GetDemoList', params).then(res => {
        // console.log(res)
        if (res.success) {
          // var data = res.data[0]
          var data = res.data
          this.tableData = data
          // console.log(this.tableData)
          this.page.total = data.total
          this.page.currentPage = this.tablePage
          // this.getCybercafeNum() // 获取网吧数量
        } else {
          this.$message({
            message: res.msg,
            duration: 2000,
            type: 'error'
          })
        }
        this.tableLoading = false
      }).catch(err => {
        console.log(err)
        this.tableLoading = false
      })
    },
    // 单元格单击
    handleCellClick (row, index, prop) {
      this.rowId = row.id
      this.rowTitle = row.name
      // console.log(prop)
      // if (prop == 'id') {
      //     this.dialogVisible = true
      // }
      // if (prop == 'DNS' || prop == 'packetLossRate' || prop == 'shake' || prop == 'delayed') {
      //     this.dialogVisibleNet = true
      // }
      // if (prop == 'thirdDNS' || prop == 'thirdPacketLossRate' || prop == 'thirdShake' || prop == 'thirdDelayed') {
      //     this.dialogVisibleExit = true
      // }
      // if (prop == 'status') {
      //     this.dialogVisibleCondition = true
      // }
    },
    // 关闭弹窗
    closeDialog (params) {
      if (params == 'id') {
        this.dialogVisible = false
      }
      if (params == 'condition') {
        this.dialogVisibleCondition = false
      }
      if (params == 'net') {
        this.dialogVisibleNet = false
      }
      if (params == 'exit') {
        this.dialogVisibleExit = false
      }
      if (params == 'edit') {
        this.dialogVisibleEdit = false
      }
      if (params == 'add') {
        this.dialogVisibleAdd = false
      }
      if (params == 'fault') {
        this.dialogVisibleFault = false
      }
    },
    // 确认
    confirmDialog (params) {
      if (params == 'id') {
        this.dialogVisible = false
      }
      if (params == 'condition') {
        this.dialogVisibleCondition = false
      }
      if (params == 'net') {
        this.dialogVisibleNet = false
      }
      if (params == 'exit') {
        this.dialogVisibleExit = false
      }
      if (params == 'edit') {
        this.dialogVisibleEdit = false
        this.keyword = ''
        this.status = ''
        this.tablePage = 1
        this.handleList(this.keyword, this.status)
      }
      if (params == 'add') {
        this.dialogVisibleAdd = false
        this.keyword = ''
        this.status = ''
        this.tablePage = 1
        this.handleList(this.keyword, this.status)
        // this.getCybercafeNum() // 获取网吧数量
      }
      if (params == 'fault') {
        this.dialogVisibleFault = false
      }
    },
    // 编辑
    handleEdit (row) {
      this.rowId = row.id
      this.rowTitle = row.name
      this.dialogVisibleEdit = true
    },
    // 新增
    handleAdd () {
      this.dialogVisibleAdd = true
    },
    // 删除
    handleDelete (row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(row.id)
        this.$store.dispatch('home/DeleteCybercafesDetail', row.id).then(res => {
          // console.log(res)
          if (res.code == 1) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.keyword = ''
            this.status = ''
            this.tablePage = 1
            this.handleList(this.keyword, this.status)
            // this.getCybercafeNum() // 获取网吧数量
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      }).catch(() => {
      })
    },
    // 故障分析
    handleFaultAnalysis (row) {
      this.rowTitle = row.name
      this.lineStatus = row.status
      this.rowId = row.id
      this.dialogVisibleFault = true
    },
    // 获取网吧数量
    getCybercafeNum () {
      this.$store.dispatch('home/CountCybercafe').then(res => {
        // console.log(res)
        if (res.code == 1) {
          this.cybercafeCount = res.data
        }
      })
    },
    // 批量导入新增网吧
    batchImportSHow () {
      this.batchImportVisable = true
      console.log('批量导入')
    },
    //
    importHandleClose (done) {
      if (this.uploadLoading) {
        this.$confirm('正在上传，确认关闭？')
          .then(_ => {
            this.uploadLoading = false
            done()
          })
          .catch(_ => { })
      } else {
        done()
      }
    },
    // 模板下载
    templateDownload () {
      // this.$store.dispatch('home/TemplateFileDownload').then(res => {
      //   this.download(res)
      // })
    },
    // 上传前拦截
    handleBefore (file) {
      console.log(file)
      this.uploadLoading = true
    },
    // 上传成功
    handleSuccess (res, file) {
      //   console.log(res, file)
      this.uploadLoading = false

      if (res.code == 1) {
        this.batchImportVisable = false
        this.$message({
          type: 'success',
          message: '上传成功'
        })
        this.tablePage = 1
        this.handleList(this.keyword, this.status)
      } else {
        this.$message.error(res.msg)
      }
    },
    handleError (err, file) {
      this.uploadLoading = false
      this.$message.error(err)
    },
    download (data) {
      if (!data) {
        return
      }
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
      var url = window.URL.createObjectURL(blob)
      var aLink = document.createElement('a')
      aLink.style.display = 'none'
      aLink.href = url
      aLink.setAttribute('download', 'template.xlsx')
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink) // 下载完成移除元素
      window.URL.revokeObjectURL(url) // 释放掉blob对象
    }

  }
}
</script>
<style lang="scss">
.home {
  padding: 0px !important;
  height: auto !important;
  .btn-list {
    float: right;
  }
  .el-card__header {
    border-bottom: none;
  }
  .fix-lh {
    line-height: 32px;
  }
  .text-right {
    text-align: right;
  }
  .home-form {
    // margin-bottom: 7px;
    // margin-top: -17px;
  }
  .el-card__header,
  .el-card__body {
    padding: 15px;
  }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
  .el-table__body {
    tr td:nth-child(2) span {
      color: #409eff;
      cursor: pointer;
    }
    tr td:nth-child(5) span {
      cursor: pointer;
    }
    tr td:nth-child(6) span,
    tr td:nth-child(7) span,
    tr td:nth-child(8) span {
      // color: #409EFF;
      cursor: pointer;
    }
    tr td:nth-child(9) span,
    tr td:nth-child(10) span,
    tr td:nth-child(11) span,
    tr td:nth-child(12) span,
    tr td:nth-child(13) span {
      // color: #409EFF;
      cursor: pointer;
    }
  }
  .table-body {
    margin-top: 20px;
  }
  .fault-wrap {
    margin-top: 20px;
  }
  .fault-body {
    width: 100%;
    height: 100%;
    min-height: 300px;
    background: #000000;
    color: #fff;
    font-size: 16px;
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
  }
}
.batch-import {
  display: flex;
  align-items: center;
  .upload {
  }
  .downliad {
    width: 100%;
    flex: 1;
    text-align: center;
  }
}
</style>
