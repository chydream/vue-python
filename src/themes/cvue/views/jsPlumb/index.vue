<template>
  <div class="flowJsPlumb"  >
    <div id="diagramContainer">
      <div id="item_left" class="item" style="margin-left:150px;"></div>
      <div id="item_right" class="item" style="margin-left:350px;"></div>
    </div>
  </div>
</template>
<script>
/* eslint-disable*/
import {jsPlumb} from 'jsplumb'
export default {
  name: 'jsPlumb',
  data () {
    return {
      msg: '123',
      flowNodeList: [
        {
          "Id":"1f9e047b-c6b1-4784-a49f-73b91b281034",
          "NodeName":"新增节点",
          "NodeRemark":"新增节点",
          "NodeType":1,
          "FlowId":"840317a2-38ce-4ee1-887e-5739e8bbb35d",
          "ParentIds":"",
          "OpUserIds":",*,",
          "OpDeptIds":",,",
          "OpRoleIds":",,",
          "Top":86,
          "Left":44
        },
        {
          "Id":"cc7423e4-6775-4578-8fb7-342145fea714",
          "NodeName":"新增节点",
          "NodeRemark":"新增节点",
          "NodeType":1,
          "FlowId":"840317a2-38ce-4ee1-887e-5739e8bbb35d",
          "ParentIds":"e50a1499-3303-4e9d-9010-746d86f1c7b9",
          "OpUserIds":",*,",
          "OpDeptIds":",,",
          "OpRoleIds":",,",
          "Top":129,
          "Left":209
        },
        {
          "Id":"e50a1499-3303-4e9d-9010-746d86f1c7b9",
          "NodeName":"新增节点",
          "NodeRemark":"新增节点",
          "NodeType":1,
          "FlowId":"840317a2-38ce-4ee1-887e-5739e8bbb35d",
          "ParentIds":"",
          "OpUserIds":",,",
          "OpDeptIds":",17dd015e620c48a1951fcbb995d9bae0,287a1077ebb0449e81eefd65d823297d,95db4101973f49f88b6d64005b3accff,",
          "OpRoleIds":",,",
          "Top":47,
          "Left":128
        }
      ]
    }
  },
  mounted () {
    jsPlumb.ready(function(){
      jsPlumb.connect({
        source:'item_left',
        target: 'item_right',
        endpoint: 'Dot'
      })
    })
  }
}
</script>
<style>
.flowJsPlumb{
  position: relative;
}
#diagramContainer {
  background-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.15) 10%,
      rgba(0, 0, 0, 0) 10%
    ),
    linear-gradient(rgba(0, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
  background-size: 10px 10px;
  height: 500px;
  background-color: rgb(251, 251, 251);
  /*background-color: #42b983;*/
  position: relative;
  margin-left: 30px;
}

.item {
  position: absolute;
  width: 60px;
  height: 20px;
  background-color: white;
  padding: 5px;
  opacity: 0.7;
  border: 1px solid #346789;
  /*border-radius: 10px;*/
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
