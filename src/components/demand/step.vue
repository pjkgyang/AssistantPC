<template>
    <div>
        <ul v-if="list.length">
          <!-- :style="{'counter-reset':type=='process'?'step':'step ' + (list.length+1)}" -->
          <!-- 'active-1':process.flag == 1 -->
            <li v-for="(process,index) in list" :key="index"
            :class="{'crowdBefore':!!process.index,'active':process.lx == 0,
            'active-1':process.lx != 0 && process.lczt=='0',
            'active-2':process.lx != 0 && process.lczt=='1',
            'active-3':process.lx != 0 && process.lczt=='2'
            }"
           >
                <div >{{process.mc}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
      return{
          Length:0
      }
  },
  props: {
    type:{
      type:String,
      default:'process'
    },
    list: {
      type: Array,
      default: function() {
        return [{mc:'需求设计',type:1,index:1},{mc:'发布需求',type:2},{mc:'分配开发',type:2},{mc:'需求确认',type:1,index:2}];
      }
    }
  },
  mounted() {
    this.list.forEach(ele=>{
      if(!!ele.index){
        this.Length+=1;
      }
    })
  },
  components: {  }
};
</script>
<style scoped lang="scss">
  ul {
    position: relative;
    margin-bottom: 30px;
    counter-reset: step;
    li {
      list-style-type: none;
      font-size: 0.9rem;
      position: relative;
      padding: 0 0 20px 30px;
      z-index: 2;
      color: #999;
      &::before {
        content:"";
        display: block;
        position: absolute;
        left: 3.8px;
        top: 0;
        // content: counter(step); /*设定计数器内容*/
        // counter-increment: step; /*计数器值递增*/
        width: 12px;
        height: 12px;
        background-color: #999;
        line-height: 12px;
        border-radius: 12px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        margin: 0 auto 8px auto;
        z-index: 3;
      }
      &::after {
        content: "";
        width: 1px;
        height: 100%;
        background-color: #999;
        position: absolute;
        left: 9px;
        top: 12px;
        z-index: 2;
      }
      .crowd{
           span:nth-child(1){
             color: #333;
           }
      }
    }
  }


  li.active{
      color: #169BD5;
      font-weight: 700;
      font-size: 14px;
  }
  ul li.active::before{
    width: 20px;
    height: 20px;
    left: 0px;
    top: -2px;
    line-height: 20px;
    background-color: #169BD5;
  }
  ul li.active-1::before {
    content: '';
    counter-increment:0;
  }

  ul li.active-2{
    color: #f00;
  }
  ul li.active-2::before{
    color: #f00;
    font-weight: 700;
    background-color: #f00;
  }

  ul li.active-3{
    color: #67c23a;
    font-weight: 700;
  }
  ul li.active-3::before{
    color: #67c23a;
    background-color: #67c23a;
  }



  // li.active{
  //     color: #4b0;
  // }
  // ul li.active::before,
  // ul li.active::after {
  //   background-color: #4b0;
  // }

  // li.active-1{
  //   color: rgb(226, 28, 28);
  // }
  // ul li.active-1::before,
  // ul li.active-1::after {
  //   background-color: #f00;
  // }

  // ul li.active::before{
  //     content:'✔';
  // }
  ul li:last-child::after {
    display: none;
  }
</style>
