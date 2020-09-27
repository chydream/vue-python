<template>
  <div class="tree1">
    <el-tree :data="data4" 
          show-checkbox 
          node-key="id" 
          default-expand-all 
          :expand-on-click-node="false"
          :render-content="renderContent"
          :props="defaultProps"></el-tree>
  </div>
</template>
<script>
let id = 1000
export default {
  name: 'Tree',
  data () {
    return {
      data4: [{
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
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    append (data) {
      const newChild = {id: id++, label: 'testtest', children: []}
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    filterNode (value, data) {
      console.log(value)
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    renderContent (h, {node, data, store}) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button style="font-size:12px;" type="text" on-click={() => this.append(data)}>Append</el-button>
            <el-button style="font-size:12px;" type="text" on-click={() => this.remove(node, data)}>Delete</el-button>
          </span>
        </span>
      )
    }
  }
}
</script>
<style lang="scss">
.tree1{
  background: #fff;
}
</style>
