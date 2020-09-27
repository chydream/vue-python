<template>
  <div>
     <el-tree
      :data="treeList"
      show-checkbox
      default-expand-all
      node-key="Id"
      @check="checkTree"
      ref="tree"
      highlight-current
      :props="defaultProps"
      :default-checked-keys="teacherIds"	
    ></el-tree>
  </div>
</template>
<script>
export default {
  name: 'tree4',
  data () {
    return {
      msg: '1223',
      treeList: [],
      teacherIds: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created () {
    this.getTree()
  },
  methods: {
    checkTree () {},
    getTree () {
      let params = {
        schoolId: 'eeeea2b869e44b3bbd797f4d781aceaf',
        groupId: this.$parent.relevanceId
      }
      this.$store.dispatch('demo/GetTeachDept', params).then(res => {
        let result = JSON.parse(res)
        if (result.Code == '200') {
          this.treeList = result.Data
          this.setDeptData(this.treeList)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    setDeptData (arr) {
      arr.forEach((item, index) => {
        if (item.children && item.children.length > 0) {
          if (item.isChoice === 0) {
            item.disabled = false
          } else {
            item.disabled = true
          }
          this.setDeptData(item.children)
        } else {
          if (arr[index].isChoice === 0) {
            arr[index].disabled = false
          } else {
            arr[index].disabled = true
          }
        }
      })
    }
  }
}
</script>>
<style scoped>
</style>
