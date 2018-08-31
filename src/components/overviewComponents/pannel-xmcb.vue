<template>
  <div class="card-body height100 xmcb" flex-column>
    <div col=1>
      <span class="introText mr-20">分包计划结束时间</span><span class="baseText">{{xmcb.fbzdjsrq}}</span>
      <span class="tag tag-red">已超期</span>
    </div>
    <div class="xmcb-box" flex col=14>
      <div class="xmcb-box__card" col=3 flex-column>
        <div class="xmcb-box__card01" col=1 flex colcenter spacebetween>
          <span class="pull-left introText" style="flex:100px 0 0;font-size: 16px;text-indent: 18px;">分包情况</span>
          <div class="pull-right height100" flex spacearound style="flex: 1 0 0;">
            <div class="vertical-items" flex-column v-for="item in xmcbFBS">
              <span col=6 colcenter class="nums">{{item.value}}元</span>
              <span col=5 text-center class="introText">{{item.name}}</span>
            </div>
          </div>
        </div>
        <div class="xmcb-box__card02" col=1 flex colcenter spacebetween>
          <span class="pull-left introText" style="flex:100px 0 0;font-size: 15px;padding-left: 20px;">执行情况<br><span style="font-size: 12px;">已完成&nbsp;<span style="color:#19BE6B;font-weight: bold;">{{zxywc}}%</span></span>
          </span>
          <div class="pull-right height100" flex spacearound style="flex: 1 0 0;">
            <div class="vertical-items" flex-column v-for="item in xmcbZXQK">
              <span col=6 colcenter class="nums">{{item.value}}元</span>
              <span col=5 text-center class="introText">{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="xmcb-box__list" col=2 flex-column>
        <h4 col=1 flex colcenter>最近结算：</h4>
        <div col=1 v-for="item in xmcbLists">
          <span class="pull-left introText">{{item.name}}</span>
          <span class="pull-right money">{{item.value}}元</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      xmcbLists:[{
        name: '南广学院主数据平台',
        value: '8000'
      },{
        name: '南广学院主数据平台',
        value: '8000'
      },{
        name: '南广学院主数据平台',
        value: '8000'
      }],
      xmcbFBS: [{
        name: '实施',
        value: 100
      }, {
        name: '二开',
        value: 100
      }, {
        name: '可变',
        value: 100
      }],
      xmcbZXQK: [{
        name: '实施',
        value: 100
      }, {
        name: '二开',
        value: 100
      }, {
        name: '可变',
        value: 100
      }],
      fbqkfy:null,
      zxqkfy:null,
      zxywc:null
    }
  },
  props:{
    xmcb:{
       type:Object,
       default:function(){
         return {}
       }
     }
  },
  mounted() {
    this.xmcbFBS[0].value = this.xmcb.sszfy 
    this.xmcbFBS[1].value = this.xmcb.ekzfy 
    this.xmcbFBS[2].value = this.xmcb.kbzfy 

    this.xmcbZXQK[0].value = this.xmcb.ssjszfy 
    this.xmcbZXQK[1].value = this.xmcb.ekjszfy
    this.xmcbZXQK[2].value = this.xmcb.kbjszfy 
    
    this.xmcbFBS.forEach((ele,i,arr)=>{
      this.fbqkfy += parseInt(ele.value)
    })
    this.xmcbZXQK.forEach((ele,i,arr)=>{
      this.zxqkfy += parseInt(ele.value)
    })
   this.zxywc =  ((this.zxqkfy/this.fbqkfy)*100).toFixed(0)
  },
  methods: {},
  components: {},
}

</script>
<style lang="scss">
.xmcb {

  .xmcb-box__list {
    font-size: 14px;
  }

  .xmcb-box__list h4 {
    font-size: 15px;
  }

  .xmcb-box__card01 {
    border-radius: 8px;
    margin: 10px;
    background: rgba(4, 134, 254, 0.1);
  }

  .xmcb-box__card01 .vertical-items .nums {
    font-size: 16px;
    font-weight: bold;
    color: #0486FE;
  }

  .xmcb-box__card02 {
    border-radius: 8px;
    margin: 10px;
    background: rgba(25, 190, 107, 0.1);
  }

  .xmcb-box__card02 .vertical-items .nums {
    font-size: 16px;
    font-weight: bold;
    color: rgb(25, 190, 107);
  }
}

</style>
