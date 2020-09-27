<template>
  <div class="school-manage">
    <span class="title">{{$route.query.name}}</span>
    <el-button type="default" size="mini" @click="goBack" class="go-back">返回</el-button>
    <el-tabs type="border-card" @tab-click="tabClick" v-model="activeIndex">
      <!-- 教职工开始 -->
      <el-tab-pane label="教职工" :style="{height:height}">
        <faculty v-if="activeIndex === '0'"></faculty>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cvueTable from '@/components/cvue-table'
import faculty from './faculty'
import {getClientHeight} from '@/util/tool'
export default {
  name: 'schoolManage',
  components: {
    cvueTable,
    faculty
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  computed: {
    height () {
      var height = getClientHeight() - 200
      return height + 'px'
    }
  },
  mounted () {
    var itemIndex = sessionStorage.getItem(this.$route.path)
    if (itemIndex) {
      this.activeIndex = itemIndex
    } else {
      this.activeIndex = 0
    }
  },
  methods: {
    goBack () {
      this.closeTagTo('/school-data/school')
    },
    tabClick (item) {
      sessionStorage.setItem(this.$route.path, item.index)
    }
  }
}
</script>

<style lang="scss">
  .school-manage{
    padding: 0px !important;
    height: auto !important;
    position: relative;
    >div{
      min-height: 600px;
    }
    .go-back{
      position: absolute;
      right: 10px;
      top: 6px;
      z-index: 10;
    }
    .title{
      position: absolute;
      right: 120px;
      right: 50%;
      margin-right: -100px;
      top: 10px;
      z-index: 10;
      color: #999;
      display: inline-block;
      min-width: 200px;
      text-align: center;
    }
  }
</style>
