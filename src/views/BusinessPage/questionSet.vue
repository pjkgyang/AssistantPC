<template>  
  <div class="project-question">
       <div class="project-question-query">
           <div>
                 <span :class="{'isshown-query':true,'el-icon-arrow-down':!queryLJshow,'el-icon-arrow-up':queryLJshow}" @click="handleQueryShow"> </span> <span class="query-title">高级查询</span>
                <el-input v-model="keyword" style="width:493px;" size="small" placeholder="请输入问题提出人姓名/工号/手机号/标题/项目编号/项目名称/学校名称" @change="searchQuestion"></el-input>&#x3000;
                <el-button type="primary" size="mini" @click="handlequeryQuestion">查询</el-button>
           </div>
            <div class="query-condition" v-if="queryLJshow">
            <div>
              <p class="query-title">提问时间:</p>
              <p class="query-list" >
                 <el-date-picker @change="changeStarDay" v-model="starDay" size="mini" type="date" placeholder="选择开始日期"  value-format="yyyy-MM-dd"></el-date-picker> &#x3000; 至 &#x3000; 
                 <el-date-picker @change="changeEndDay" v-model="endDay" size="mini" type="date" placeholder="选择结束日期"  value-format="yyyy-MM-dd"></el-date-picker>
              </p>
           </div>
            <div>
              <p class="query-title">产品线:</p>
              <p class="query-list" @click="handleCPX">
                  <span data-type="" :class="{'bg-active':cpxbg == ''}">全部</span>
                  <span v-for="(cpx,index) in cpline" :data-type="cpx.label" :class="{'bg-active':cpxbg === cpx.label}">{{cpx.mc}}</span>
              </p>
           </div>
            <div>
              <p class="query-title">产品:</p>
              <p class="query-list" @click="handleCP">
                  <span data-type="" :class="{'bg-active':cpbg == ''}">全部</span>
                  <span v-for="(cp,index) in cplist" :data-type="cp.label" :class="{'bg-active':cpbg == cp.label}">{{cp.mc}}</span>
                  </p>
           </div>
            <div>
              <p class="query-title">问题类别:</p>
              <p class="query-list" @click="handleWTLB">
                  <span data-type="" :class="{'bg-active':wtlbbg == ''}">全部</span>
                  <span v-for="(wtlbd,index) in wtlb" :data-type="wtlbd.label" :class="{'bg-active':wtlbbg == wtlbd.label}">{{wtlbd.mc}}</span>
                  </p>
           </div>
            <div v-if="isJZuser == 0">
              <p class="query-title">单位类型:</p>
              <p class="query-list" @click="handleDWLX">
                  <span data-type="" :class="{'bg-active':dwlx == ''}">全部</span>
                  <span v-for="(dwlxx,index) in dwlxList" :data-type="dwlxx.label" :class="{'bg-active':dwlx == dwlxx.label}">{{dwlxx.mc}}</span>
                  </p>
           </div>
       </div>
       </div>
       <div style="background:#fff;margin-top:10px;box-shadow:0 0 5px #ccc;border-radius:5px;padding:10px;">
      <ul class="project-question-list">
          <li v-for="(question,index) in questionList">
            <div :class="{'question-type':true}">
                  <span :class="{'el-icon-question':question.fbzt != 1,'el-icon-success':question.fbzt == 1}"></span>
             </div>
              <div class="question-info">
                  <span class="question-info-bt" @click="handleQuestionDetail" :data-wid="question.wid">{{question.bt}}</span><br>
                  <span style="color:#363748;font-size:12px;">{{question.fbrq}}</span>
                  <span class="question-tag-ysqgb" v-if="question.sqgbCount > 0">已申请关闭</span>&#x3000;&#x3000;
                  <p>
                      <span><span class="question-info-front"></span>发布人 : {{question.fbrxm}}</span>
                      <span><span class="question-info-front">所属单位 : </span>{{question.ssbm == null?'无':question.ssbm}}</span>
                      <span><span class="question-info-front">问题类别 : </span>{{question.wtlb==null?'无':question.wtlb}}</span>
                  </p>
                  <p>
                     <span><span class="question-info-front">产品 : </span>{{question.cpbh}}</span>
                     <span><span class="question-info-front">是否紧急 : </span>{{question.jjyf == null?'无':question.jjyf == '1'?'是':'否'}}</span>
                     <span><span class="question-info-front">版本号 : </span>{{question.bbh}}</span>
                  </p>
              </div>
              <div class="question-state">
                  <span style="font-size:14px;color:#f00;" :class="{'ygb-color':question.fbzt == 1,'clz-color':question.fbzt != 1}">{{question.lcMc}}</span><br>
                  <span style="font-size:14px;color:#7ECE64;margin-top:5px;"><span style="font-size:12px;color:#A8A8A8">回复数</span> &#x3000;{{question.replyCount}}</span><br>
                  <span style="font-size:12px;color:#A8A8A8">
                     <span v-if="question.fbzt != 1 && question.cnjsrq">
                         {{new Date().getTime() < new Date(question.cnjsrq).getTime()?Math.round((new Date(question.cnjsrq).getTime() - new Date().getTime())/(1000 * 60 * 60 * 24))+' 天到期':'过期 '+Math.round((new Date().getTime() - new Date(question.cnjsrq).getTime())/(1000 * 60 * 60 * 24))+' 天'}}
                    </span>
                    <span v-if="question.fbzt == 1 && question.cnjsrq">
                          {{(question.sqgbsj?new Date(question.sqgbsj).getTime():question.gbsj?new Date(question.gbsj).getTime():new Date().getTime()) < new Date(question.cnjsrq).getTime()?Math.round((new Date(question.cnjsrq).getTime() - (question.sqgbsj?new Date(question.sqgbsj).getTime():question.gbsj?new Date(question.gbsj).getTime():new Date().getTime()))/(1000 * 60 * 60 * 24))+' 天到期':'过期 '+Math.round(((question.sqgbsj?new Date(question.sqgbsj).getTime():question.gbsj?new Date(question.gbsj).getTime():new Date().getTime()) - new Date(question.cnjsrq).getTime())/(1000 * 60 * 60 * 24))+' 天'}}
                    </span>
                  </span>
              </div>
          </li>
          <div v-if="questionList.length == 0" style="text-align:center;padding-top:50px;">
              <img src="static/img/empty.png" alt="">
              <p>暂无问题</p>
          </div>
      </ul>
      <div style="margin-top:10px;text-align:right" v-if="total > 10">
        <pagination  :total="total" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange"></pagination>
      </div>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
import pagination from '@/components/BusinessPage/pagination.vue'
import { getResponsibleTaskList } from '@/api/common.js'
import { queryAllQuestions,deleteQuestion,queryQuestion,saveQuestion,queryAnswers,queryrReferenceHour,queryContributionPeople,closeQuestion ,
queryBtnAuth ,forwardLabel ,saveAnswer ,saveForward,queryProcess ,changeCommitmentDate ,customerQuestion ,showQuestionCondition,updateCrowdId,
getCrowdId,saveYyzfData,getCrowdRwzt,applyDismiss,getCrowdRwxx,showCbCondition,queryCbRy,saveCb,queryrHfHour,showHjFj,setSolution} from '@/api/xmkb.js'
import { queryUser ,queryZjCpData} from '@/api/personal.js'
import itemChoose from '@/components/BusinessPage/itemChoose.vue'
import zdfzrChoose from '@/components/BusinessPage/zdfzrChoose.vue'
import sqjsForm from '@/components/BusinessPage/sqjsForm.vue'
import {formatTime,getMenu,getSession,getMyDate} from '@/utils/util.js'
export default {
  data(){
      return{
          queryLJshow:true,
          keyword:'',
          questionList:[],
          pageSize:10,
          CurrentPage:1,
          total:null,
          dwlxList:[{
              label:'1',
              mc:'学校'
          },{
              label:'0',
              mc:'金智'
          },{
              label:'2',
              mc:'合作伙伴'
          }],
          cpline:[],
          cplist:[],
          wtlb:[],
          wtlbbg:"",
          sfjj:"",
          sfcb:"",
          cpxbg:"",
          cpbg:"",
          sfbug:"",
          cxzt:"",
          wxyztbg:"",
          wjjztbg:'',
          gczd:'',
          wtfl:'',
          dwlx:'',
          wid:'',
          xmbh:"",
          xmmc:"",
          isJZuser:'',
          username:null,
          wtlbmc:"",
          baseUrl:"",
          starDay:"",
          endDay:""
    }
  },
  props:{
     
  },
  mounted(){
         this.username =  sessionStorage.getItem('username')
         this.isJZuser =  sessionStorage.getItem('isJZuser')

        if(getSession('cpx') == null){
            getMenu('cpx',this.cpline,true);//获取产品线
            getMenu('ProblemType',this.wtlb,'');
            getMenu('cp',this.cplist,true)
        }else{
            this.cpline = getSession('cpx');
            this.wtlb = getSession('ProblemType');
            this.cplist = getSession('cp');
        }  
  },

  methods:{ 
    
     
/************************************************* */


      handleQueryShow(){ // 高级查询
        this.queryLJshow = !this.queryLJshow
      },
        handleQuestionDetail(e){  //查看问题详情
             //查看问题详情
            let wid = e.target.getAttribute("data-wid");
            let routeData = this.$router.resolve({
                name: "questionDetail",
                query: {
                    wid: wid,
                    f:'1'
                }
            });
            window.open(routeData.href, "_blank");
        },


       searchQuestion(){  //查询问题
         this.queryAllQuestions(1);
       },
       handlequeryQuestion(){
         this.queryAllQuestions(1);
       },
       // 分页切换
       handleCurrentChange(data){
         this.CurrentPage = data
         this.queryAllQuestions(data);
       },
        changeStarDay(val){  // 选择开始时间
          this.queryAllQuestions(1);
        },
        changeEndDay(val){  // 选择结束时间
          this.queryAllQuestions(1);
        },
       handleCPX(e){  //产品线
             let cpx = e.target.getAttribute('data-type')
             if(cpx==null) return;
             this.cpxbg = cpx
             this.queryAllQuestions(1);
       },
       handleCP(e){  //产品
            let cp = e.target.getAttribute('data-type')
            if(cp==null) return;
            this.cpbg = cp
            this.queryAllQuestions(1);
       },
       handleWTLB(e){  // 问题类别
            let wtlb = e.target.getAttribute('data-type')
            if(wtlb==null) return;
            this.wtlbbg = wtlb
            this.queryAllQuestions(1);
       },
       handleDWLX(e){   // 单位类型
            let dwlx = e.target.getAttribute('data-type')  
            if(dwlx==null) return;
            this.dwlx = dwlx
            this.queryAllQuestions(1);
       },

  // 获取所有问题
    queryAllQuestions(curPage){
        queryAllQuestions({
            curPage:curPage,
            pageSize:this.pageSize,
            xmbh:this.xmbh || '',
			urgent:this.sfjj,
			cp:this.cpbg,
			cpx:this.cpxbg,
			bug:this.sfbug,
            noResponse:this.wxyztbg,
            jjzt:this.wjjztbg,
			zt:this.cxzt,
            keyword:this.keyword||"",
            qyzd:this.gczd,
            wtfl:this.wtfl,
            dwlx:this.dwlx,
            cb:this.sfcb,
            wtlb:this.wtlbbg,
            isSolution:true,
            starDay:this.starDay,
            endDay:this.endDay
        }).then(({data})=>{
           if(data.state == 'success'){
            if(data.data.rows !=null){
                this.questionList = data.data.rows
            }
            this.total = data.data.records
           }
        })
    },
  },
  watch:{},
  activated(){
     this.keyword = this.$route.params.dwmc
     this.queryAllQuestions(1);
     this.baseUrl = window.baseurl
  },
  components:{pagination,itemChoose,zdfzrChoose,sqjsForm}
}
</script>
<style scoped>

.project-question{
    width: 85%;
    margin: 0 auto;
    padding: 10px;
}
.project-question-list>li{
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px dotted #999;
    padding: 8px 0 5px;
}
.project-question-list>li:hover{
    background: #f5f7fa;
}
.project-question-list>li:hover .questionOperate{
    opacity: 1;
}
.question-type{
    text-align:center;
    width:100px;
}
.questionOperate{
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
}
.questionOperate>span:hover{
    text-decoration: underline #888;
}

.question-type span.el-icon-question{
    font-size:32px;
    color: #F56C6C;
}
.question-type span.el-icon-success{
    font-size:30px;
    color: #67C23A;
}

.project-question-list .question-info{
    width: 80%;
}
.project-question-list .question-info .question-info-front,.question-content .question-info-front{
    color: #A8A8A8;
    font-size:12px;
}
.project-question-list .question-info>p,.question-content>p{
    margin: 3px 0 !important;
    width: 100%;
    white-space: nowrap;
}
.project-question-list .question-info>p>span,.question-content>p>span{
    display: inline-block;
    width: 25%;
    white-space: nowrap;
    font-size: 14px;
    color: #363748;
}
.project-question-list .question-info>p>span:nth-of-type(2),.question-content>p>span:nth-of-type(2){
    width: 40%;
}
.project-question-list .question-info>span{
    font-size: 16px;
    color: #409EFF;
}
.project-question-list .question-info>span.question-info-bt:hover{
    text-decoration: underline;
    cursor: pointer;
}
.project-question-list .question-info>p{
    font-size: 14px;
    color: #888;
}
.Question{
    padding: 10px 0;
}
div.el-form-item{
    margin-bottom:8px !important;
}
.project-question-detail{
    padding: 5px 10px;
}
.project-question-detail li{
    border-bottom:1px solid #F1F1F1;
}
.project-question-detail-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #F1F1F1;
}
.project-question-detail .question-reply{
    display:inline-block;
    width:38px;
    height:26px;
    border-radius:3px;
    text-align:center;
    line-height: 24px;
    background: #3BA7F5;
    color: #fff;
    font-size:14px;
}
.project-question-detail-top .question-content{
    width: 90%;
}
.project-question-detail-top .question-content-SC{
    width: 92%;
    color:#888;
}

.project-question-detail-top .question-content p{
    font-size: 14px;
}
.project-question-detail-bottom>div{
    width: 100%;
    overflow: auto;
    padding: 10px 5px 10px 80px;
}
.project-question-query{
    border-radius: 5px;
    box-shadow: 0 0 5px #ccc;
    padding: 10px;
    background: #fff;    
}
.project-question-query .query-condition>div{
    display: flex;
    align-items: flex-start;
    margin:10px 0;
    font-size: 13px;
}  
.project-question-query .query-title{
    font-size: 14px;
    width: 100px;
    white-space: nowrap;
    text-align:left;
    padding: 3px 10px 0;
    font-weight: 700;
}
.project-question-query .query-list{
    width: 95%;
}
.project-question-query .query-list span:hover{
    cursor: pointer;
}
.project-question-query .query-list span{
    display: inline-block;
    padding: 0px 5px;
    color: #637D8A;
    border-radius: 3px;
    margin:5px 10px 0 0;
}
.isshown-query:hover{
   cursor: pointer;
}

.bg-active{
    background: #1997D7;
    color: #fff !important;
}
.question-state{
    text-align: center;
    width: 13%;
}
.question-state>span:nth-of-type(1){
    padding: 3px 8px;
    border-radius: 2px;
    font-size: 14px;
    display: inline-block;
}
.ygb-color{
    color: #7ECE64  !important;
    background:rgba(126, 206, 100, 0.2);
}
.clz-color{
    color: #F56C6C;
    background:rgba(245, 108, 108, 0.2);
}

.question-evaluate{
  padding: 10px;
}
.question-evaluate>p{
    margin-top:10px !important;
    color: #888;
    font-size:12px;
}
.question-rate{
    margin: 10px 0;
}
.question-rate:after{
    content: "";
    display: block;
    clear: both;
}
.question-rate>p{
    display: flex;
    align-items: center;
    float: left;
}
.question-steps{
    padding: 5px 10px;
    background: #F4F6F9;
}
.question-textarea{
    width:700px;
    margin:0 auto
}
.question-textarea >p{
    width:125px;
    text-align:right;
    padding-right:12px;
    font-weight:700
}
.question-textarea >p::before{
    content: '*';
    color: #f56c6c;
    margin-right: 4px
}

</style>
