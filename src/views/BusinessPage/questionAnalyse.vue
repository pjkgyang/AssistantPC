<template>  
  <div class="project-question">
       <div class="project-question-query">
           <div>
                <span class="query-title"><span :class="{'isshown-query':true,'el-icon-arrow-down':!queryLJshow,'el-icon-arrow-up':queryLJshow}" @click="handleQueryShow"></span>&nbsp;高级查询</span>
                <el-input v-model="keyword" style="width:493px;" size="small" placeholder="请输入问题提出人姓名/工号/手机号/标题/项目编号/项目名称/学校名称" @change="searchQuestion"></el-input>&#x3000;
                <el-button type="primary" size="mini" @click="handlequeryQuestion">查询</el-button>
           </div>
            <div class="query-condition" v-if="queryLJshow">
            <div>
              <p class="query-title">提问时间:</p>
              <p class="query-list" >
                 <el-date-picker @change="changeStarDay" v-model="starDay" size="mini" type="date" placeholder="选择开始日期"  value-format="yyyy-MM-dd"></el-date-picker> &#x3000; 至&#x3000; 
                 <el-date-picker @change="changeEndDay" v-model="endDay" size="mini" type="date" placeholder="选择结束日期"  value-format="yyyy-MM-dd"></el-date-picker>
              </p>
           </div>
           <div>
              <p class="query-title">查询状态:</p>
              <p class="query-list" @click="handleCXZT">
                  <span data-type=""   :class="{'bg-active':cxzt == ''}">全部</span>
                  <span data-type="0" :class="{'bg-active':cxzt == '0'}">处理中</span>
                  <span data-type="1" :class="{'bg-active':cxzt == '1'}">已关闭</span>
              </p>
           </div>
           <div>
              <p class="query-title">申请关闭:</p>
              <p class="query-list" @click="handleSQGB">
                  <span data-type=""   :class="{'bg-active':sqgb == ''}">全部</span>
                  <span data-type="1" :class="{'bg-active':sqgb == '1'}">是</span>
                  <span data-type="0" :class="{'bg-active':sqgb == '0'}">否</span>
              </p>
           </div>
            <div>
              <p class="query-title">问题标签:</p>
              <p class="query-list" @click="handleWTBQ">
                  <span data-type="" :class="{'bg-active':wtbq == ''}">全部</span>
                  <span v-for="(wtbql,index) in wtbqlist" :data-type="wtbql.label" :class="{'bg-active':wtbq === wtbql.label}">{{wtbql.mc}}</span>
                  <span data-type="-1" :class="{'bg-active':wtbq == '-1'}">无</span>
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

            <div>
              <p class="query-title">单位类型:</p>
              <p class="query-list" @click="handleDWLX">
                  <span data-type="" :class="{'bg-active':dwlx == ''}">全部</span>
                  <span v-for="(dwlxx,index) in dwlxList" :data-type="dwlxx.label" :class="{'bg-active':dwlx == dwlxx.label}">{{dwlxx.mc}}</span>
                  </p>
           </div>
       </div>
       </div>
       <div style="background:#fff;margin-top:10px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);border-radius:4px;padding:10px 0;">
          <div style="padding:0 10px;text-align:right">
              <el-button size="mini" type="primary"   @click="handleExport" style="margin-top:8px">导出</el-button>
         </div>
        <hr style="border-top:1px solid #eee;margin:8px 0 0 0 !important">
        <questionCard :questionList="questionList" :isShow="false" @editQuestion="editQuestion" @deleteQuestion="deleteQuestion"
        @handleQuestionDetail="handleQuestionDetail"></questionCard>
        <div style="margin-top:10px;text-align:right" v-if="total > 10">
           <pagination  :total="total" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange"></pagination>
        </div>
      </div>

       <twDialog :show.sync="show" :questionTitle="questionTitle" :accreditShow="accreditShow" :questionInfo="qusetionInfo" @handleTWsuccess="handleTWsuccess"></twDialog>
  </div>
</template>
<script>
import axios from "axios";
import pagination from "@/components/BusinessPage/pagination.vue";
import {
  queryAllQuestions,
  deleteQuestion,
  queryQuestion,
} from "@/api/xmkb.js";
import { isEdit } from '@/api/common.js'
import { getMenu, getSession,EventBus } from "@/utils/util.js";
import twDialog from "@/components/dialog/tw-dialog.vue";
import questionCard from "@/components/BusinessPage/questionCard.vue";
export default {
  data() {
    return {
      questionTitle: "提交问题",
      show: false,
      cnjsrq: "",
      queryLJshow: true,
      keyword:"",
      questionList: [],
      pageSize: 10,
      CurrentPage: 1,
      total: null,
      dwlxList: [
        {
          label: "1",
          mc: "学校"
        },
        {
          label: "0",
          mc: "金智"
        },
        {
          label: "2",
          mc: "合作伙伴"
        }
      ],
      cxzt: "0",
      sqgb:"",
      cpline: [],
      cplist: [],
      wtbqlist:[],
      wtbq:'',
      wtlb: [],
      wtlbbg:"",
      cpxbg: "",
      cpbg: "",
      dwlx: "",
      qusetionInfo: {},
      wid: "",
      xmbh: "",
      xmmc: "",
      accreditShow: false,
      showCondition: "",
      isJZuser: "",
      SLbtnDisabled: false,
      username: null,
      baseUrl: "",
      starDay:"",
      endDay:"",
    };
  },
  props: {},
  mounted() {
    if (window.userName != null) {
      this.username = window.userName;
      sessionStorage.setItem("username", window.userName);
    } else {
      this.username = sessionStorage.getItem("username");
    }
    this.isJZuser = JSON.parse(sessionStorage.getItem("userInfo")).unitType;
    if (!getSession("cpx")||!getSession("ProblemType")||!getSession("cp")||!getSession("WTBQ")) {
            getMenu("cpx", this.cpline, true); //获取产品线
            getMenu("ProblemType", this.wtlb, "");
            getMenu("cp", this.cplist, true);
            getMenu("WTBQ", this.wtbqlist, true);
    } else {
          this.cpline = getSession("cpx");
          this.wtlb = getSession("ProblemType");
          this.cplist = getSession("cp");
          this.wtbqlist = getSession("WTBQ");
     }

  },
  methods: {
      handleExport(){
          this.keyword = !this.keyword?'':this.keyword
          window.open(window.baseurl+'question/exportQuestionReport.do?&cp='+this.cpbg+'&cpx='+this.cpxbg+'&zt='+this.cxzt+'&wtbq='+this.wtbq+'&sqgb='+this.sqgb+
          '&keyword='+this.keyword+'&dwlx='+this.dwlx+'&wtlb='+this.wtlbbg+'&starDay='+this.starDay+'&endDay='+this.endDay+'&isAnalyse=true'+'&xmbh=')
    },
    handleTWsuccess() {
      // 提问 编辑成功
      switch (this.questionTitle) {
        case "我要提问":
          this.queryAllQuestions(1);
          break;
        case "编辑问题":
          this.queryAllQuestions(this.CurrentPage);
          break;
        default:
          break;
      }
    },
    handleQueryShow() {
      // 高级查询
      this.queryLJshow = !this.queryLJshow;
    },

    handleQuestionDetail(params) {
      //查看问题详情
      let routeData = this.$router.resolve({
        name: "questionDetail",
        query: {
          wid: params.wid,
          bq:1
        }
      });
      window.open(routeData.href, "_blank");
    },

    editQuestion(params) {      //编辑
      this.questionTitle = "编辑问题";
      isEdit({
        wid:params.wid
      }).then(({data})=>{
        if(data.state == 'success'){
           if(data.data){
              queryQuestion({             // 获取单个问题
                wid:params.wid
              }).then(({ data }) => {
                if (data.state == "success") {
                  this.qusetionInfo = data.data;
                  this.accreditShow = false;
                  this.show = true;
                } else {
                  this.$alert(data.msg, "提示", {
                    confirmButtonText: "确定",
                    callback: action => {}
                  });
                }
              });
           }else{
              this.$alert('该条问题已有回复，不可编辑', "提示", {
                    confirmButtonText: "确定",
                    callback: action => {}
              });
           }
        }
      })
    },
    deleteQuestion(params) {
      //删除 问题
      this.$confirm("是否删除该条问题?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteQuestion({
            wids:params.wid
          }).then(({ data }) => {
            if (data.state == "success") {
              this.$alert("删除成功", "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  this.queryAllQuestions(1);
                }
              });
            } else {
              this.$alert(data.msg, "提示", {
                confirmButtonText: "确定",
                type: "error",
                callback: action => {}
              });
            }
          });
        })
        .catch(() => {});
    },

    searchQuestion() {
      //查询问题
      this.queryAllQuestions(1);
    },
    handlequeryQuestion() {
      this.queryAllQuestions(1);
    },
    // 分页切换
    handleCurrentChange(data) {
      this.CurrentPage = data;
      this.queryAllQuestions(data);
    },
    changeStarDay(val){  // 选择开始时间
       this.queryAllQuestions(1);
    },
    changeEndDay(val){  // 选择结束时间
       this.queryAllQuestions(1);
    },
     handleCXZT(e) {
      //查询状态
      let cxzt = e.target.getAttribute("data-type");
      if (cxzt == null) return;
      this.cxzt = cxzt;
      this.queryAllQuestions(1);
    },
    handleSQGB(e) {
      //申请关闭
      let sqgb = e.target.getAttribute("data-type");
      if (sqgb == null) return;
      this.sqgb = sqgb;
      this.queryAllQuestions(1);
    },
    handleWTBQ(e){ // 问题标签
      let wtbq = e.target.getAttribute("data-type");
      if (wtbq == null) return;
      this.wtbq = wtbq;
      this.queryAllQuestions(1);
    },
    handleCPX(e) {      //产品线
      let cpx = e.target.getAttribute("data-type");
      if (cpx == null) return;
      this.cpxbg = cpx;
      this.queryAllQuestions(1);
    },
    handleCP(e) {      //产品
      let cp = e.target.getAttribute("data-type");
      if (cp == null) return;
      this.cpbg = cp;
      this.queryAllQuestions(1);
    },
    handleWTLB(e) {      // 问题类别
      let wtlb = e.target.getAttribute("data-type");
      if (wtlb == null) return;
      this.wtlbbg = wtlb;
      this.queryAllQuestions(1);
    },

    handleDWLX(e) {      // 单位类型
      let dwlx = e.target.getAttribute("data-type");
      if (dwlx == null) return;
      this.dwlx = dwlx;
      this.queryAllQuestions(1);
    },


    // 获取所有问题
    queryAllQuestions(curPage) {
      queryAllQuestions({
        curPage: curPage,
        pageSize: this.pageSize,
        xmbh: "",
        cp: this.cpbg,
        cpx: this.cpxbg,
        zt:this.cxzt,
        sqgb: this.sqgb,
        keyword: this.keyword,
        dwlx: this.dwlx,
        wtlb: this.wtlbbg,
        wtbq:this.wtbq,
        starDay:this.starDay,
        endDay:this.endDay,
        isAnalyse:true
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data.rows != null) {
            this.questionList = data.data.rows;
          }
          this.total = data.data.records;
        }
      });
    }
  },
  watch: {},
  activated() {
    this.keyword = this.$route.params.dwmc;
    this.queryAllQuestions(1);
    this.baseUrl = window.baseurl;
  },
  components: { pagination, twDialog ,questionCard }
};
</script>
<style scoped>
.project-question {
  width: 85%;
  margin: 0 auto;
  padding: 10px;
}
.question-type {
  text-align: center;
  width: 100px;
}
.question-type span.el-icon-question {
  font-size: 32px;
  color: #f56c6c;
}
.question-type span.el-icon-success {
  font-size: 30px;
  color: #67c23a;
}
.Question {
  padding: 10px 0;
}
.project-question-query {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px;
  background: #fff;
}
.project-question-query .query-condition > div {
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  font-size: 13px;
}
.project-question-query .query-title {
  font-size: 14px;
  width: 100px;
  white-space: nowrap;
  text-align: left;
  padding: 3px 10px 0;
  font-weight: 700;
}
.project-question-query .query-list {
  width: 95%;
}
.project-question-query .query-list span:hover {
  cursor: pointer;
}
.project-question-query .query-list span {
  display: inline-block;
  padding: 0px 5px;
  color: #637d8a;
  border-radius: 3px;
  margin: 5px 10px 0 0;
}
.isshown-query:hover{
   cursor: pointer;
}
.bg-active {
  background: #1997d7;
  color: #fff !important;
}

</style>
