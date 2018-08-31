<template>
  <div class="height100 top5app">
    <div class="items" flex v-for="(item,index) in items">
      <div class="item-index" flex center :style="{background: bgcolor[index]}">{{index+1}}</div>
      <div class="item-box">
        <h4>{{item.appTitle}}</h4>
        <span class="introText">访问量:{{item.totalAmount}}</span><br>
        <span class="bar" :style="{background: bgcolor[index],width:'100%'}"></span>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      bgcolor:["#FF4944","#FF6847","#FF7B48","#FF924B","#FFA54D"],
      // items:[{
      //   name:"我的学位申请应用",
      //   value:30
      // },{
      //   name:"我的成绩",
      //   value:20
      // },{
      //   name:"我的培养计划",
      //   value:15
      // },{
      //   name:"我的学籍",
      //   value:10
      // },{
      //   name:"学位申请管理应用",
      //   value:4
      // }]
    }
  },
  props:{
    items:{
      type:Array,
      default:function(){
        return [];
      }
    }
  },
  mounted() {
    
  },
  methods: {},
  components: {},
}

</script>
<style lang="scss" scope>
.top5app {
      width: 100%;
  .items {
    height: 80px;
    border: 1px solid #EBEEF5;
    border-radius: 8px;
    margin-top: 10px;
    .item-index {
      flex: 50px 0 0;
      font-size: 20px;
      color:#fff;
      font-weight: bold;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
    .item-box {
      flex: 1 0 0;
      padding:8px;
      h4{
        padding-bottom:2px;
        font-size: 14px;
        font-weight: bold;
      }
      span.bar{
        margin-top: 8px;
        display:inline-block;
        border-radius: 20px;
        height:12px;
      }
    }
  }
}

</style>
