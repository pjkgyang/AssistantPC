<template>
  <div class="view-pannel1 height100" flex-column>
    <div flex-1 flex-column>
      <div class="pannel1-top" col=6 flex>
        <card col=5>
          <div class="card-head" slot="head">
            <h3 class="pull-left">{{isAll?'项目问题跟踪':'我的问题跟踪'}}</h3>
            <span class="pull-right card-head__more" @click="chexkTaskQuestionDetail">查看问题明细></span>
          </div>
          <pannel-wtgz slot="body" :wtgz="xmtj"></pannel-wtgz>
        </card>
        <card col=5>
          <div class="card-head" slot="head">
            <h3 class="pull-left">{{isAll?'项目进度跟踪':'我的进度跟踪'}}</h3>
            <span class="pull-right card-head__more" @click="chexkTaskProcessDetail">查看进度明细></span>
          </div>
           <pannel-jdgz slot="body" :xmtj="xmtj" :xmbh="xmbh" :isAll="isAll"></pannel-jdgz>
        </card>
      </div>
      <div class="pannel1-mid" col=4 flex>
        <card col=3>
          <div class="card-head" slot="head">
            <h3 class="pull-left">项目配置库</h3>
            <span class="pull-right card-head__more" @click="chexkTaskConfigDetail">查看配置明细></span>
          </div>
          <div class="card-body card-body__xmpzk" slot="body" flex>
            <div class="horizenl-card__items horizenl-card__xmpzk" v-for="item in xmpzkItems">
              <div class="pull-left introText xmpzk-card">{{item.wjjmc}}</div>
              <div class="pull-right nums">{{item.wjzs}}</div>
            </div>
            <div v-if="!xmpzkItems || xmpzkItems.length == 0" style="text-align:center;width:100%;padding-top:50px">
              <img src="static/img/none.png" alt="">
              <p class="empty_content">无配置库信息</p>
            </div>
          </div>
        </card>

        <card col=3 v-if="syqkLis && syqkLis.length != 0">
          <div class="card-head" slot="head">
            <h3>使用情况</h3></div>
          <div class="card-body card-body__syqk height100" slot="body" flex-column>
          <div col=1 colcenter >
            <ul class="syqk" >
              <li :class="{active:syqkIndex===index}" v-for="(item,index) in syqkLis" @click="selectSyqk(index)">{{item.YWYMC}}</li>
            </ul>
          </div>
            <div flex style="flex-wrap:wrap;" col=4>
              <div  class="vertical-items vertical-items__syqk"  flex-column v-for="(item,index) in syqkItems" >
              <span col=6 center class="introText fs-16">{{item.name}}</span>
              <span col=6 center class="nums">{{item.value}}</span>
            </div>
            </div>
          </div>
        </card>
          <div col=3 style="margin-left:36px;" v-if="!syqkLis || syqkLis.length == 0"></div>
      </div>
      <!-- <div class="pannel1-bottom" col=3 flex>
        <card col=3>
          <div class="card-head" slot="head">
            <h3 class="pull-left">项目成本</h3>
            <span class="pull-right card-head__more">查看工程服务（投标，分包，结算）</span></div>
            <pannel-xmcb slot="body" :xmcb="xmtj"></pannel-xmcb>
        </card>
        <card col=3 style="visibility: hidden;"></card>
      </div> -->
    </div>
  </div>
</template>
<script type="text/javascript">
import Card from '@/components/overviewComponents/card.vue'
import CircleBar from '@/components/overviewComponents/circle.vue'
import PannelJdgz from '@/components/overviewComponents/pannel-jdgz.vue'
import PannelWtgz from '@/components/overviewComponents/pannel-wtgz.vue'
import PannelXmcb from '@/components/overviewComponents/pannel-xmcb.vue'
import { getMonthLcb,getXmTj ,getDwTj,getYwy,getXmTjRT} from '@/api/home.js'
import { EventBus } from "../../utils/util.js"; //事件总

export default {
  data() {
    return {
      dialogVisible:false,
      syqkLis:[],
      syqkIndex:0,
      schoolNames: "",
      xmpzkItems:[{
        name:'会议纪要',
        value:10,
      },{
        name:'会议纪要',
        value:10,
      },{
        name:'会议纪要',
        value:10,
      },{
        name:'会议纪要',
        value:10,
      },{
        name:'会议纪要',
        value:10,
      },{
        name:'会议纪要',
        value:10,
      },{
        name:'会议纪要',
        value:10,
      },{
        name:'会议纪要',
        value:10,
      }],
      syqkItems:[{
        name:'应用总量',
        value:10,
      },{
        name:'访问总量',
        value:10,
      },{
        name:'用户总量',
        value:10,
      },{
        name:'本月访问量',
        value:10,
      },{
        name:'本月用户量',
        value:10,
      }],
      schoolNamesOptions: [],
      xmtj:{},
      ywxdm:"",
    }
  },
  props:{
     xmbh:{
       type:String,
       default:''
     },
     label:{
       type:String,
       default:'overview'
     },
     isAll:{
       type:Boolean,
       default:true
     }
  },
  mounted(){
      this.getXmTjInfo();
     EventBus.$on("handleCommitSuccess", param => {
         this.getXmTjInfo();
    });
  },
  computed:{
     isAllxm(){
       return this.isAll
     }
  },
  methods: {
    chexkTaskQuestionDetail(){
      this.$emit('checkSkipDetail','question')
    },
    chexkTaskProcessDetail(){
      this.$emit('checkSkipDetail','process')
    },
    chexkTaskConfigDetail(){
      this.$emit('checkSkipDetail','files')
    },
    selectSyqk(index){
      this.syqkIndex=index
      this.ywxdm = this.syqkLis[index].YWYDM
      this.getDwTj(this.ywxdm);
    },
   
   //  获取（使用情况）
    getDwTj(ywxdm){
      getDwTj({
        xmbh:this.xmbh,
        ywxdm:ywxdm
      }).then(({data})=>{
          if(data.state == 'success'){
            this.syqkItems[0].value = data.data.yyzs
            this.syqkItems[1].value = data.data.fwzs
            this.syqkItems[2].value = data.data.yhzs
            this.syqkItems[3].value = data.data.byfwzs
            this.syqkItems[4].value = data.data.byyhzs
          }
      })
    },
    chooseItem(){
      this.dialogVisible = !this.dialogVisible
    },
    handleEdit(data){
          this.xmbh = data.xmbh,
          this.xmmc = data.xmmc
          this.dialogVisible = false;
    },
    getXmTjInfo(){
          getXmTjRT({
                  xmbh:this.xmbh,
                  isAll:this.isAll
                }).then(({data})=>{
                  if(data.state == 'success'){
                    this.xmtj = data.data
                    this.xmpzkItems = data.data.pzkList
                    if(this.xmpzkItems  && this.xmpzkItems.length ){
                      this.xmpzkItems.forEach((ele,i,arr)=>{
                        this.xmpzkItems[i].wjjmc = this.xmpzkItems[i].wjjmc.substring(2);
                      })
                    }else{
                      this.xmpzkItems = []
                    }
                  }else{
                    
                  }
                })
                // 获取业务线
                getYwy({
                  xmbh:this.xmbh
                }).then(({data})=>{
                  if(data.state == 'success'){
                    if(data.data){
                      this.syqkLis = data.data
                      this.getDwTj(this.syqkLis[0].YWYDM);
                    }else{
                      this.syqkLis = []
                    }
                  }
            })
      }
  },
  watch:{
    xmbh(){
      this.getXmTjInfo();
    },
    isAllxm(){
      //切换整体 和 我的
      this.getXmTjInfo(); 
    }
  },
  components: {
    Card,
    CircleBar,
    PannelJdgz,
    PannelWtgz,
    PannelXmcb,
  },
}

</script>
<style lang="scss" scoped>
.view-pannel1 {
    // min-height: 1130px;
    min-height: 845px;
    font-size: 12px; 
}

.card-head__more {
  color: #1989FA;
  position: relative;
  top: 8px;
  cursor: pointer;
}

.select-group {
  float: left;
  padding: 8px 30px 8px 5px;
}

.select-group__title {
  font-size: 14px;
  font-weight: bold;
  margin-right: 12px;
}

.total-select {
  flex: 48px 0 0;
}

.vertical-items__syqk {
  width: 27%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 5%;
  margin-top: 2%;
  background: #F8FAFB;
  flex-wrap: wrap
}

.card-body__xmpzk,
.card-body__syqk {
  flex-wrap: wrap
}
.card-body__xmpzk .nums{
    color: #464C5B;font-size:20px;font-weight: bold;
}
.card-body__syqk .nums{
    font-size: 25px;font-weight: bold;color: #409EFF;
}
.card-body__syqk ul.syqk{
  margin-right: 10px;
  overflow: hidden;
}
.card-body__syqk ul.syqk li{
   float:left;
   width:100px;
   font-size: 14px;
   cursor:pointer;
   border-right: 1px solid #DCDFE6;
   text-align: center;
   list-style: none;
}
.card-body__syqk ul.syqk li:last-child{
  border-right:none;
}
.card-body__syqk ul.syqk li.active{
  color:#1989FA;
}
.horizenl-card__xmpzk {
  width: 30%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 5%;
  margin-top: 2%;
  background: #F8FAFB;
}

.xmpzk-card {
  background: url('../../../static/img/file.png') 0 center no-repeat;
  background-size: 20px;
  font-size: 14px;
  text-indent:26px;
}

.el-table tr th {
  background-color: #F8FAFB!important;
}

.el-table td,
.el-table th {
  padding: 4px 0!important;
}

.card-head h3 {
  font-size: 1.5em;
  font-weight: 700;
  color: #464C5B;
  letter-spacing: 0;
  text-align: left;
  line-height: 30px;
}

.right-split {
  position: relative;
}

.right-split:after {
  content: '';
  position: absolute;
  right: -8px;
  top: 0;
  width: 1px;
  height: 100%;
  background: #EBEEF5;
}
.horizenl-card__items {
  padding: 0 6px;
  background: #F8FAFB !important;
  margin-left: 10px;
  line-height: 2.5;
}

.money {
  color: #F67A7A;
  font-weight: bold;
}

</style>

