<template>
  <div class="chart-wrap">
    <el-card class="chart-card">
        <!-- 头部 -->
        <div slot="header" class="clearfix fix-lh" v-if="isShowHeader">
            <span>{{title}}</span>
            <div class="btn-list" v-if="isShowBtn">
                <el-button v-hasPermission="permission.add">查看</el-button>
            </div>
        </div>
        <div class="chart-body">
            <div class="chart" :id="chartId" :style="{width:width,height:height}" :optian="option"></div>
        </div>
    </el-card>
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/theme/macarons.js'
import 'echarts/map/js/china.js'
export default {
  name: 'CvueChart',
  data () {
    return {
      msg: 'hello',
      myChart: '' 
    }
  },
  watch: {
    option: {
      handler (newVal, oldVal) {
        if (this.myChart) {
          if (newVal) {
            this.myChart.setOption(newVal, true)
          } else {
            this.myChart.setOption(oldVal, true)
          }
        } else {
          this.init()
        }
      },
      deep: true
    }
  },
  props: {
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '500px'
    },
    option: {
      type: Object,
      default: () => {
        return {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
              data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
        }
      }
    },
    chartId: {
      type: String,
      required: true,
      default: 'main'
    },
    title: {
      type: String,
      default: '图表'
    },
    isShowHeader: {
      type: Boolean,
      default: true
    },
    isShowBtn: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      let self = this
      self.myChart = echarts.init(document.getElementById(self.chartId), 'macarons')
      self.myChart.setOption(self.option)
      // this.$nextTick(() => {
      //   this.myChart.setOption(this.option)
      // })
      window.addEventListener('resize', function () {
        self.myChart.resize()
      })
    }
  }
}
</script>
<style lang="scss">
.chart-wrap{
  .btn-list{
    float: right;
  }
  .el-card__header{
    border-bottom: none;
  }
  .fix-lh{
    line-height: 32px;
  }
  .chart-body{
    margin-top: -20px;
  }
}

</style>
