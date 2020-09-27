<template>
  <div class="line">
    <el-row :gutter="10">
      <el-col :span="8">
        <line-chart :width="width" :height="height" chartId="chartId1" :option="option"></line-chart>
      </el-col>
      <el-col :span="8">
        <cvue-chart :width="width" :height="height" chartId="chartId2"></cvue-chart>
      </el-col>
      <el-col :span="8">
        <cvue-chart :width="width" :height="height" chartId="chartId3"></cvue-chart>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import cvueChart from '@/components/chart/cvue-chart'
import lineChart from '@/components/chart/line'
export default {
  name: 'Line',
  components: {
    cvueChart,
    lineChart
  },
  data () {
    return {
      msg: '123',
      width: '100%',
      height: '400px',
      option: {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [5, 6, 7, 8, 9],
            type: 'line'
        }]
      }
    }
  },
  mounted () {
    this.option.series[0].data = [5, 6, 7, 8, 9, 10, 11]
  }
}
</script>
<style scoped lang="scss">
.line{
  padding: 0px!important;
  height: auto!important;
}
</style>
