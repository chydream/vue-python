<template>
  <div class="tree1">
    <el-input placeholder="请输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree class="filter-tree" 
            :data="data2" 
            :props="defaultProps" 
            :default-expand-all="false"
            :filter-node-method="filterNode" 
            ref="tree2">
    </el-tree>
  </div>
</template>
<script>
export default {
  name: 'Tree',
  data () {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }]
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    filterNode (value, data) {
      console.log(value)
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>
<style lang="scss">
.tree1{
  background: #fff;
}
</style>
