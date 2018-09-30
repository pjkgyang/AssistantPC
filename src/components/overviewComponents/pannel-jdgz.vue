<template>
  <div class="card-body height100 jdgz" flex-column>
    <div col=1>
      <span class="introText mr-20">甲方负责人</span><span class="baseText mr-20">{{xmtj.jfxm == ''?'暂无':xmtj.jfxm}}</span>      
      <span class="introText mr-20">项目经理</span><span class="baseText mr-20">{{xmtj.xmjl == ''?'暂无':xmtj.xmjl}}</span>
      <span class="introText mr-20">项目建设周期</span><span class="baseText">{{xmtj.xmksrq==''?'无':xmtj.xmksrq}} 至 {{xmtj.xmjsrq==''?'无':xmtj.xmjsrq}}</span>
    </div>
    <div class="jdgz-box" flex col=14>
      <div class="jdgz-box__left" col="4">
        <h4>进度</h4>
        <div class="box__left--steps">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="xmtj.p_xmjd" style="width:90%;"></el-progress>
          <!-- <div class="box__left--select">
               <el-select v-model="jdValue" placeholder="请选择" size="small" style="width:90%">
                <el-option  label="总体进度" value="11"></el-option>
              </el-select>
            </div> -->
          <div class="vertical-steps">
            <div :class="{'vertical-step__item':true,'vertical-step__item_now':process.completed}" v-for="(process,index) in xmtj.jdList" :key="index">
              {{process.jdmc}}
            </div>
            <!-- <div class="vertical-step__item">
              安装部署
              <br>
              <span class="tag tag-yellow">已延期</span>
              <br>
            </div>
            <div class="vertical-step__item">
              系统部署及功能确认
            </div>
            <div class="vertical-step__item">
              试运行
            </div> -->
          </div>
        </div>
      </div>
      <div class="jdgz-box__right" col="5" flex-column>
        <div class="box__right--task" >
          <div col=1  flex-column>
            <h4>实施<span class="box__right--task_yhcb">催办<span>{{xmtj.ssrwcbzs}}</span>条</span></h4>
            <div class="right--task__container" flex>
              <div class="right--task__circle">
                <circle-bar col=1 :percent="parseInt(xmtj.p_ssrwwcl)" :r="30" text="完成率"></circle-bar>
              </div>
              <div class="right--task__card" flex-column>
                <div class="vertical-items" flex spacearound col=1>
                  <div class="vertical-items" flex-column>
                    <span col=1 center class="nums">{{xmtj.ssrwcqs}}</span>
                    <span col=1 center class="introText">已超期</span>
                  </div>
                  <div class="vertical-items" flex-column>
                    <span col=1 center class="nums">{{xmtj.ssrwwwcs}}</span>
                    <span col=1 center class="introText">未完成</span>
                  </div>
                  <div class="vertical-items" flex-column>
                    <span col=1 center class="nums">{{xmtj.ssrwcqwcs}}</span>
                    <span col=1 center class="introText">超期完成</span>
                  </div>
                  <div class="vertical-items" flex-column>
                    <span col=1 center class="nums">{{xmtj.ssrwzs}}</span>
                    <span col=1 center class="introText">总数</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div col=1 flex-column class="right--task_">
            <h4>用户<span class="box__right--task_yhcb">催办<span>{{xmtj.yhrwcbzs}}</span>条</span></h4>
            <div class="right--task__container" flex>
              <div class="right--task__circle">
                <circle-bar col=1 :percent="parseInt(xmtj.p_yhrwwcl)" :r="30" text="完成率"></circle-bar>
              </div>
              <div class="right--task__card" flex-column>
                <div class="vertical-items" flex spacearound col=1>
                  <div class="vertical-items" flex-column>
                    <span col=1 center class="nums">{{xmtj.yhrwcqs}}</span>
                    <span col=1 center class="introText">已超期</span>
                  </div>
                  <div class="vertical-items" flex-column>
                    <span col=1 center class="nums">{{xmtj.yhrwwwcs}}</span>
                    <span col=1 center class="introText">未完成</span>
                  </div>
                  <div class="vertical-items" flex-column>
                    <span col=1 center class="nums">{{xmtj.yhrwcqwcs}}</span>
                    <span col=1 center class="introText">超期完成</span>
                  </div>
                   <div class="vertical-items" flex-column>
                    <span col=1 center class="nums">{{xmtj.yhrwzs}}</span>
                    <span col=1 center class="introText">总数</span>
                  </div>
                </div>
                <!-- <div class="horizenl-card" col=1 flex spacearound>
                  <div class="horizenl-card__items" col=1>
                    <div class="pull-left introText">投诉</div>
                    <div class="pull-right"><span style="color: #1989FA;font-weight: bold;">{{xmtj.xmtszs}}</span>&nbsp;条</div>
                  </div>
                  <div class="horizenl-card__items" col=1>
                    <div class="pull-left introText">催办</div>
                    <div class="pull-right"><span style="color: #1989FA;font-weight: bold;">{{xmtj.rwcbzs}}</span>&nbsp;条</div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="box__right--plan" col=2>
          <h4>本月计划</h4>
          <el-table :data="tableData" border style="width: 100%" max-height="160">
            <el-table-column prop="xmnr_display" label="项目内容" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="日期" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.cnjsrq }}</span>
              </template>
            </el-table-column>
            <el-table-column label="里程碑"  prop="lcbms_display" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import CircleBar from '@/components/overviewComponents/circle.vue'
import { getMonthLcb } from '@/api/home.js'
export default {
  data() {
    return {
      tableData: [{
        xmnr:"项目内容",
        cnjsrq: '2016-05-02',
        lcb: "试运行"
      }, {
        xmnr:"项目内容",
        cnjsrq: '2016-05-04',
        lcb: "试运行"
      }, {
        xmnr:"项目内容",
        cnjsrq: '2016-05-01',
        lcb: "试运行"
      }],
      jdValue:""
    }
  },
  props:{
     xmtj:{
       type:Object,
       default:function(){
         return {}
       }
     },
     xmbh:{
        type:String,
        default:''
     },
     isAll:{
        type:Boolean,
        default:true
     }
  },
  computed:{
    isAllxm(){
      return this.isAll
    }
  },
  mounted() {
      //  获取月计划
      this.getMonthLcb();
      if(this.xmtj.p_xmjd != undefined){
        this.xmtj.p_xmjd = JSON.parse(this.xmtj.p_xmjd);
      }
  },
  activated(){

  },
  methods: {
    getMonthLcb(){
      getMonthLcb({
        xmbh:this.xmbh
      }).then(({data})=>{
         if(data.state == 'success'){
           this.tableData = data.data 
         }
      })
    }
  },
  components: {
    CircleBar
  },
  watch:{
     xmbh(){
         this.getMonthLcb();
     },
     isAllxm(n,o){ 
         //切换整体 和 我的
         this.getMonthLcb();
     }
  }
}

</script>
<style lang="scss">
.jdgz {
  .jdgz-box {
    border-top: 1px solid #EBEEF5;
    margin-top: 5px;
  }

  .jdgz-box__left {
    border-right: 1px solid #EBEEF5;
    padding: 10px 10px 8px 10px;
  }

  .jdgz-box__right {
    padding: 10px 10px 8px 10px;
  }

  .jdgz-box__left h4,
  .jdgz-box__right h4 {
    font-size: 15px;
    font-weight: 700;
  }
  .jdgz-box__left h4{
    padding-bottom: 10px;
  }
  .jdgz-box__right h4{
    padding:3px;
  }
  .jdgz-box__right .box__right--task {
    border-bottom: 1px solid #EBEEF5;
  }
  .jdgz-box__right .box__right--task  .box__right--task_yhcb{
     font-size:12px;
     color: #9EA7B4;
     font-weight:400;
     margin:0 10px;
  }
   .box__right--task  .box__right--task_yhcb span{
     margin:0 5px;
     color: #1989FA;
   }
  .right--task__circle {
    flex: 100px 0 0;
    border-right: 1px solid #EBEEF5;
  }
  .right--task__container{
    height: 80px;
  }
  .right--task__card {
    flex: 1 0 0;
  }
  .right--task__card .vertical-items .nums{
    font-size: 18px;
    font-weight: bold;
    color: #464C5B;
  }
  // .box__left--select{
  //   margin: 10px 0;
  //   text-align: left;
  // }

  .vertical-steps {
    padding-left: 30px;
    margin-top: 10px;
  }

  .vertical-step__item {
    min-height: 40px;
    padding-bottom: 5px;
    color: #C0C4CC;
    position: relative;
  }

  .vertical-step__item:before {
    content: '';
    position: absolute;
    left: -24px;
    top: 0;
    width: 1px;
    height: 100%;
    background: #C0C4CC;
  }
  .vertical-step__item:last-of-type:before{
    display: none;
  }
  .vertical-step__item:after {
    content: '';
    position: absolute;
    left: -30px;
    top: 0;
    width: 14px;
    border-radius: 50%;
    height: 14px;
    background: #A8A8A8;
  }
  .vertical-step__item_now{
      color: #409EFF;
      font-weight: 700;
  }
  .vertical-step__item_now:after{
    background: #409EFF !important;
  }
  .horizenl-card__items {
    padding: 0 6px;
    background: #F8FAFB !important;
    margin-left: 10px;
    line-height: 2.5;
  }
}

</style>
