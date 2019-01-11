<template>
 <div style="padding: 10px 20px">
      <div flex class="grrzdj-head" space-around>
            <p>工号</p>
            <p>姓名</p>
            <p>产品线</p>
            <p>等级</p>
            <p>获取时间</p>
      </div>
      <ul class="grrzdj-list" >
          <li v-for="grrzdj in grrzdjList" flex space-around v-if="!!grrzdjList.length">
              <p>{{grrzdj.gh}}</p>
              <p>{{grrzdj.xm}}</p>
              <p>{{grrzdj.cpx}}</p>
              <p>{{grrzdj.rzdj}}</p>
              <p>{{grrzdj.rzrq}}</p>
          </li>
          <div v-if="!grrzdjList.length">
              暂无数据
          </div>
      </ul>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         grrzdjList:[{
             gh:123121,
             xm:'姓名',
             cpx:"cpx654564654",
             rzdj:1,
             rzrq:"2108-08-08"
         }]
     }
   },
   mounted(){
    //  this.getPersonalPositionLevel();  
   },
   methods:{
      // 获取个人任职等级
      getPersonalPositionLevel(){
          this.$get(this.API.listPersonalPositionLevel,{}).then(res=>{
              if(res.state == 'success'){
                  if(!!res.data){
                      this.grrzdjList = res.data;
                  }else{
                      this.grrzdjList = [];
                  }
              }
          })
      } 
   },
   components: {}
 }
</script>

<style lang="scss" scoped>
.grrzdj-head{
    color: #888;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    p{
        width: 20%;
        text-align: center;
    }
}
.grrzdj-list{
    max-height: calc(100vh - 180px);
    overflow-y: auto;
    li{
        border-bottom: 1px solid #ccc;
        padding: 10px 0;
    }
    p{
        width: 20%;
        text-align: center;
    }
    >div{
        margin: 50px 0;
        text-align: center;
    }
}

</style>
