<template>
  <div class="auth">
    <!-- 表单 -->
    <!-- <el-card class="box-card mt-15">
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
              <el-button type="primary" icon="el-icon-menu" @click="getAll">全部：{{cybercafeCount.sum}}</el-button>
              <el-button type="info" icon="el-icon-tickets" @click="getOffLine">离线：{{cybercafeCount.offline}}</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card> -->
    <p>查看当前路由权限：{{$route.meta}}</p>
    <p>配置前：</p>
    <el-button type="warning">查看</el-button>
    <el-button type="warning">删除</el-button>
    <el-button type="warning">新增</el-button>
    <el-button type="warning">编辑</el-button>
    <el-button type="warning">其他</el-button>
    <p>配置后：(v-hasPermission="permission.view")</p>
    <el-button type="warning" v-hasPermission="permission.view">查看</el-button>
    <el-button type="warning" v-hasPermission="permission.delete">删除</el-button>
    <el-button type="warning" v-hasPermission="permission.add">新增</el-button>
    <el-button type="warning" v-hasPermission="permission.edit">编辑</el-button>
    <el-button type="warning" v-hasPermission="permission.other">其他</el-button>
    <el-input v-model="msg" type="input"></el-input>
    <!-- <template>
          <el-transfer
            v-model="value3"
            filterable
            :left-default-checked="[2, 3]"
            :right-default-checked="[1]"
            :render-content="renderFunc"
            :titles="['Source', 'Target']"
            :button-texts="['到左边', '到右边']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            @input = "handleInput"
            @change="handleChange"
            :data="data">
            <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
            <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
          </el-transfer>
    </template>-->
    <el-transfer v-model="value2" :data="data2" @input="handleInput" @change="handleChange"></el-transfer>
  </div>
</template>
<script>
export default {
  name: 'Auth',
  data () {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      msg: '',
      data: generateData(),
      value3: [1],
      renderFunc (h, option) {
        return <span>{option.key} - {option.label}</span>
      },
      value2: [],
      data2: [
        {
          key: 1,
          label: 'item11111'
        },
        {
          key: 2,
          label: 'item22222'
        },
        {
          key: 3,
          label: 'item333333'
        },
        {
          key: 4,
          label: 'item4444444'
        }
      ]
    }
  },
  created () {
  },
  methods: {
    handleChange (value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
      console.log(this.value2)
    },
    handleInput (value) {
      console.log(value)
    }
  }
}
</script>
<style lang="scss" scoped>
.auth {
  height: 800px !important;
  padding: 30px !important;
  line-height: 50px;
  background: #fff;
}
</style>
