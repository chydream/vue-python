<template>
  <div class="tree">
    <!-- <el-tree :data="data" 
             :props="defaultProps" 
             @node-click="handleNodeClick" 
             node-key="label" 
             :default-expanded-keys="['一级 1']" 
             show-checkbox
             highlight-current
             :default-checked-keys="['二级 1-1']">
    </el-tree>
    <el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange"></el-tree>
    <el-tree :props="props1" :load="loadNode1" lazy show-checkbox></el-tree> -->
    <el-tree :data="data2" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps" accordion :default-checked-keys='[5]'></el-tree>
    <div class="buttons">
      <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      <el-button @click="getCheckedKeys">通过 key 获取</el-button>
      <el-button @click="setCheckedNodes">通过 node 设置</el-button>
      <el-button @click="setCheckedKeys">通过 key 设置</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tree',
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              disabled: true,
              children: [
                {label: '三级 1-1-1', checked: true}
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {label: '三级 2-1-1'}
              ]
            }
          ]
        }
      ],
      data2: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                  checked: true
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                  checked: true
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        }
      ],
      props: {
        label: 'name',
        children: 'zones'
      },
      props1: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      count: 1
    }
  },
  methods: {
    getCheckedNodes () {
      console.log(this.$refs.tree.getCheckedNodes())
    },
    getCheckedKeys () {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    setCheckedNodes () {
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: '二级 2-1'
        },
        {
          id: 9,
          label: '三级 1-1-1'
        }
      ])
    },
    setCheckedKeys () {
      this.$refs.tree.setCheckedKeys([3])
    },
    resetChecked () {
      this.$refs.tree.setCheckedKeys([])
    },
    handleNodeClick (data) {
      console.log(data)
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log(this.data2)
      // console.log(data, checked, indeterminate)
    },
    // 递归
    setDeptData (arr) { 
      arr.forEach((item, index) => {
        if (item.children && item.children.length > 0) {
          item.disabled = true
          // item.leaf = false
          this.setDeptData(item.children)
        } else {
          arr[index].disabled = true
          // arr[index].leaf = false
        }
      })
    },
    loadNode (node, resolve) {
      console.log(node)
      if (node.level === 0) {
        return resolve([{name: 'region1'}, {name: 'region2'}])
      }
      if (node.level > 3) {
        return resolve([])
      }
      var hasChild
      if (node.data.name === 'region1') {
        hasChild = true
      } else if (node.data.name === 'region2') {
        hasChild = false
      } else {
        hasChild = Math.random() > 0.5
      }
      setTimeout(() => {
        var data
        if (hasChild) {
          data = [
            {name: 'zone' + this.count++},
            {name: 'zone' + this.count++}
          ]
        } else {
          data = []
        }
        resolve(data)
      }, 500)
    },
    loadNode1 (node, resolve) {
      if (node.level === 0) {
        return resolve([{name: 'region'}])
      }
      if (node.level > 1) {
        return resolve([])
      }
      setTimeout(() => {
        const data = [
          {name: 'leaf', leaf: true},
          {name: 'zone'}
        ]
        resolve(data)
      }, 500)
    }
  }
}
</script>
<style lang="scss">
.tree{
  background: #fff;
}
</style>
