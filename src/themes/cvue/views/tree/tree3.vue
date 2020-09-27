<template>
  <div class="custom-tree-container">
    <div class="block">
      <el-tree
        :props="props1"
        :load="loadNode1"
        :expand-on-click-node="false"
        lazy
        :render-content="renderContent">
      </el-tree>
      <!-- <el-button type="default" v-hasPermission="permission.view">添加</el-button> -->
    </div>
  </div>
</template>
<script>
  let id = 1000
  export default {
    data () {
      return {
        props1: {
          label: 'name',
          children: 'children',
          isLeaf: 'leaf'
        }
      }
    },
    mounted () {
      // console.log(this.$route)
    },
    methods: {
      append (node, data, store) {
        const newChild = { id: id++, name: 'testtest', children: [] }
        console.log(node.expanded = true)
        // if (!data.children) {
        //   this.$set(data, 'children', [])
        // }
        // data.children.push(newChild)
      },

      remove (node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      },

      renderContent (h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.data.name}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(node, data, store) } v-hasPermission={this.permission.view} >Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>)
      },
      loadNode1 (node, resolve) {
        // console.log(node)
        if (node.level === 0) {
          return resolve([{ name: 'region' }])
        } else if (node.level === 1) {
          return resolve([{ name: 'region1' }])
        } else {
          return resolve([])
        }
        // if (node.level === 2) {
        //   return resolve([{ name: 'region2' }])
        // }
      }
    }
  }
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
