<template>
  <div class="project-question">
    <div class="project-question-query">
      <div>
        <span class="query-title">
          <span
            :class="{'isshown-query':true,'el-icon-arrow-up':!queryLJshow,'el-icon-arrow-down':queryLJshow}"
            @click="handleQueryShow"
          ></span>&nbsp;高级查询
        </span>
        <el-input
          v-model="keyword"
          style="width:493px;"
          size="small"
          placeholder="请输入问题提出人姓名/工号/手机号/标题/项目编号/项目名称/学校名称"
          @change="searchQuestion"
        ></el-input>&#x3000;
        <el-button type="primary" size="mini" @click="handlequeryQuestion">查询</el-button>
      </div>
      <div class="query-condition" v-if="queryLJshow">
        <div>
          <p class="query-title">提问时间:</p>
          <p>
            <el-date-picker
              v-model="date"
              size="mini"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="handleDatepick"
            ></el-date-picker>
          </p>
        </div>
        <div>
          <p class="query-title">问题分类:</p>
          <p class="query-list" @click="handleZXR">
            <span data-type :class="{'bg-active':wtfl == ''}">全部</span>
            <span
              v-for="(zxr,index) in zzrList"
              :data-type="zxr.label"
              :key="index"
              :class="{'bg-active':wtfl == zxr.label}"
            >{{zxr.mc}}</span>
          </p>
        </div>
        <div>
          <p class="query-title">标签来源:</p>
          <p class="query-list" @click="handleBQLY">
            <span data-type :class="{'bg-active':bqly == ''}">全部</span>
            <span
              v-for="(bqlyl,index) in bqlyList"
              :data-type="bqlyl.label"
              :key="index"
              :class="{'bg-active':bqly == bqlyl.label}"
            >{{bqlyl.mc}}</span>
          </p>
        </div>
        <div>
          <p class="query-title">查询状态:</p>
          <p class="query-list" @click="handleCXZT">
            <span data-type :class="{'bg-active':cxzt == ''}">全部</span>
            <span data-type="0" :class="{'bg-active':cxzt == '0'}">处理中</span>
            <span data-type="1" :class="{'bg-active':cxzt == '1'}">已关闭</span>
          </p>
        </div>
        <div>
          <p class="query-title">申请关闭:</p>
          <p class="query-list" @click="handleSQGB">
            <span data-type :class="{'bg-active':sqgb == ''}">全部</span>
            <span data-type="1" :class="{'bg-active':sqgb == '1'}">是</span>
            <span data-type="0" :class="{'bg-active':sqgb == '0'}">否</span>
          </p>
        </div>

        <div>
          <p class="query-title">问题标签分类:</p>
          <p class="query-list" @click="handleWTFBQ">
            <span data-type :class="{'bg-active':wtfbq == ''}">全部</span>
            <span
              v-for="(wtfbql,index) in wtfbqlist"
              :data-type="wtfbql.label"
              :class="{'bg-active':wtfbq === wtfbql.label}"
            >{{wtfbql.mc}}</span>
          </p>
        </div>
        <div>
          <p class="query-title">改进状态:</p>
          <p class="query-list" @click="handleGJZT">
            <span data-type :class="{'bg-active':gjzt == ''}">全部</span>
            <span
              v-for="(wtgjzt,index) in wtgjztlist"
              :data-type="wtgjzt.label"
              :class="{'bg-active':gjzt === wtgjzt.label}"
            >{{wtgjzt.mc}}</span>
          </p>
        </div>

        <div>
          <p class="query-title">问题标签:</p>
          <p class="query-list" @click="handleWTBQ">
            <span data-type :class="{'bg-active':wtbq == ''}">全部</span>
            <span
              v-for="(wtbql,index) in wtbqlist"
              :data-type="wtbql.label"
              :class="{'bg-active':wtbq === wtbql.label}"
            >{{wtbql.mc}}</span>
            <span data-type="-1" :class="{'bg-active':wtbq == '-1'}">无</span>
          </p>
        </div>
        <div>
          <p class="query-title">产品线:</p>
          <p class="query-list" @click="handleCPX">
            <span data-type :class="{'bg-active':cpxbg == ''}">全部</span>
            <span
              v-for="(cpx,index) in cpline"
              :data-type="cpx.label"
              :class="{'bg-active':cpxbg === cpx.label}"
            >{{cpx.mc}}</span>
          </p>
        </div>
        <div>
          <p class="query-title">产品:</p>
          <p class="query-list" @click="handleCP">
            <span data-type :class="{'bg-active':cpbg == ''}">全部</span>
            <span
              v-for="(cp,index) in cplist"
              :data-type="cp.label"
              :class="{'bg-active':cpbg == cp.label}"
            >{{cp.mc}}</span>
          </p>
        </div>
        <div>
          <p class="query-title">问题类别:</p>
          <p class="query-list" @click="handleWTLB">
            <span data-type :class="{'bg-active':wtlbbg == ''}">全部</span>
            <span
              v-for="(wtlbd,index) in wtlb"
              :data-type="wtlbd.label"
              :class="{'bg-active':wtlbbg == wtlbd.label}"
            >{{wtlbd.mc}}</span>
          </p>
        </div>

        <div>
          <p class="query-title">单位类型:</p>
          <p class="query-list" @click="handleDWLX">
            <span data-type :class="{'bg-active':dwlx == ''}">全部</span>
            <span
              v-for="(dwlxx,index) in dwlxList"
              :data-type="dwlxx.label"
              :class="{'bg-active':dwlx == dwlxx.label}"
            >{{dwlxx.mc}}</span>
          </p>
        </div>
      </div>
    </div>
    <div
      style="background:#fff;margin-top:10px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);border-radius:4px;padding:10px 0;"
    >
      <div style="padding:0 10px;text-align:right">
        <el-button size="mini" type="primary" @click="handleExport" style="margin-top:8px">导出</el-button>
      </div>
      <hr style="border-top:1px solid #eee;margin:8px 0 0 0 !important" />
      <questionCard
        :questionList="questionList"
        :isShow="false"
        @editQuestion="editQuestion"
        @deleteQuestion="deleteQuestion"
        @handleQuestionDetail="handleQuestionDetail"
        :wtbqShow="true"
        :bjscShow="false"
        @handleImprovementPlan="handleImprovementPlan"
        :gjjhShow="gjjhShow"
        :wtfbq="wtfbq"
      ></questionCard>
      <div style="margin-top:10px;text-align:right" v-if="total > 10">
        <pagination
          :currentPage="CurrentPage"
          :total="total"
          :pageSize="pageSize"
          @handleCurrentChange="handleCurrentChange"
        ></pagination>
      </div>
    </div>

    <twDialog
      :show.sync="show"
      :questionTitle="questionTitle"
      :accreditShow="accreditShow"
      :questionInfo="qusetionInfo"
      @handleTWsuccess="handleTWsuccess"
    ></twDialog>

    <el-dialog title="改进计划" :visible.sync="dialogTableVisible" :width="'80vw'">
      <gjjhcpl
        v-if="wtfbq =='W05' || this.wtfbqO == 'W05'"
        :questionData="quesData"
        :show.sync="dialogTableVisible"
      ></gjjhcpl>
      <gjjhssl
        v-if="wtfbq =='W03' || this.wtfbqO == 'W03'"
        :questionData="quesData"
        :show.sync="dialogTableVisible"
      ></gjjhssl>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import pagination from "@/components/BusinessPage/pagination.vue";
import {
  queryAllQuestions,
  deleteQuestion,
  queryQuestion
} from "@/api/xmkb.js";
import { isEdit } from "@/api/common.js";
import { getMenu, getSession, EventBus } from "@/utils/util.js";
import twDialog from "@/components/dialog/tw-dialog.vue";
import questionCard from "@/components/BusinessPage/questionCard.vue";
import gjjhcpl from "@/components/wtfp/gjjhcpl";
import gjjhssl from "@/components/wtfp/gjjhssl";
export default {
  data() {
    return {
      dialogTableVisible: false,
      gjjhShow: true, //改进计划显示
      quesData: {},
      questionTitle: "提交问题",
      show: false,
      cnjsrq: "",
      queryLJshow: true,
      keyword: "",
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
      zzrList: [
        { label: "1", mc: "待我解决问题" },
        { label: "0", mc: "我的提问" },
        { label: "3", mc: "我受理过的问题" },
        { label: "2", mc: "我相关的问题" }
      ],
      bqlyList: [
        { label: "1", mc: "我的标签" },
        { label: "2", mc: "其他人的标签" },
        { label: "3", mc: "无标签" }
      ],
      wtfbqlist: [],
      wtgjztlist: [],
      wtfbq: "", //问题父标签
      wtfbqO: "", //问题父标签
      gjzt: "",
      bqly: "",
      wtfl: "",
      cxzt: "",
      sqgb: "",
      cpline: [],
      cplist: [],
      wtbqlist: [],
      wtbq: "",
      wtlb: [],
      wtlbbg: "",
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
      starDay: "",
      endDay: "",
      date: []
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

    if (!getSession("cpx")) {
      getMenu("cpx", this.cpline, true); //获取产品线
    } else {
      this.cpline = getSession("cpx");
    }
    if (!getSession("ProblemType")) {
      getMenu("ProblemType", this.wtlb, "");
    } else {
      this.wtlb = getSession("ProblemType");
    }
    if (!getSession("cp")) {
      getMenu("cp", this.cplist, true); //获取产品线
    } else {
      this.cplist = getSession("cp");
    }

    if (!getSession("WTBQ")) {
      getMenu("WTBQ", this.wtbqlist, true);
    } else {
      this.wtbqlist = getSession("WTBQ");
    }
    if (!getSession("wtfbq")) {
      getMenu("wtfbq", this.wtfbqlist, true);
    } else {
      this.wtfbqlist = getSession("wtfbq");
    }

    if (!getSession("WtGjjhZt")) {
      getMenu("WtGjjhZt", this.wtgjztlist, "");
    } else {
      this.wtgjztlist = getSession("WtGjjhZt");
    }
  },
  methods: {
    handleImprovementPlan(data) {
      // console.log(data);
      this.quesData = data;
      let dataArr = data.fbqdm.split(",");
      let w03i = "",
        w05i = "";
      if (data.fbqdm.includes("W05") && !data.fbqdm.includes("W03")) {
        this.wtfbqO = "W05";
      } else if (data.fbqdm.includes("W03") && !data.fbqdm.includes("W05")) {
        this.wtfbqO = "W03";
      } else if (data.fbqdm.includes("W03") && data.fbqdm.includes("W05")) {
        dataArr.forEach((ele, i, arr) => {
          if (ele == "W03") {
            w03i = i;
          }
          if (ele == "W05") {
            w05i = i;
          }
        });
        if (w03i > w05i) {
          this.wtfbqO = "W03";
        } else if (w03i < w05i) {
          this.wtfbqO = "W05";
        }
      }
      this.dialogTableVisible = !this.dialogTableVisible;
    },
    handleExport() {
      this.keyword = !this.keyword ? "" : this.keyword;
      window.open(
        window.baseurl +
          "question/exportQuestionReport.do?&cp=" +
          this.cpbg +
          "&cpx=" +
          this.cpxbg +
          "&zt=" +
          this.cxzt +
          "&wtfbq=" +
          this.wtfbq +
          "&wtgjzt=" +
          this.gjzt +
          "&wtbq=" +
          this.wtbq +
          "&sqgb=" +
          this.sqgb +
          "&keyword=" +
          this.keyword +
          "&dwlx=" +
          this.dwlx +
          "&wtlb=" +
          this.wtlbbg +
          "&starDay=" +
          this.starDay +
          "&endDay=" +
          this.endDay +
          "&isAnalyse=true" +
          "&xmbh=" +
          "&wtfl=" +
          this.wtfl +
          "&bqly=" +
          this.bqly
      );
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
          bq: 1
        }
      });
      window.open(routeData.href, "_blank");
    },

    editQuestion(params) {
      //编辑
      this.questionTitle = "编辑问题";
      isEdit({
        wid: params.wid
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data) {
            queryQuestion({
              // 获取单个问题
              wid: params.wid
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
          } else {
            this.$alert("该条问题已有回复，不可编辑", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        }
      });
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
            wids: params.wid
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
      this.CurrentPage = 1;
      this.queryAllQuestions(1);
    },
    handlequeryQuestion() {
      this.CurrentPage = 1;
      this.queryAllQuestions(1);
    },
    // 分页切换
    handleCurrentChange(data) {
      this.CurrentPage = data;
      this.queryAllQuestions(data);
    },
    // 时间选择
    handleDatepick() {
      if (this.date.length) {
        this.starDay = !this.date[0] ? "" : this.date[0];
        this.endDay = !this.date[1] ? "" : this.date[1];
      } else {
        this.starDay = this.endDay = "";
      }
      this.queryAllQuestions(1);
    },
    // changeStarDay(val) {
    //   // 选择开始时间
    //   this.CurrentPage = 1;
    //   this.queryAllQuestions(1);
    // },
    // changeEndDay(val) {
    //   // 选择结束时间
    //   this.CurrentPage = 1;
    //   this.queryAllQuestions(1);
    // },
    handleCXZT(e) {
      //查询状态
      let cxzt = e.target.getAttribute("data-type");
      if (cxzt == null) return;
      this.cxzt = cxzt;
      this.CurrentPage = 1;
      this.queryAllQuestions(1);
    },
    // 问题分类
    handleZXR(e) {
      let zxr = e.target.getAttribute("data-type");
      if (zxr == null) return;
      this.wtfl = zxr;
      this.CurrentPage = 1;
      this.queryAllQuestions(1);
    },
    // 标签来源
    handleBQLY(e) {
      let bqly = e.target.getAttribute("data-type");
      if (bqly == null) return;
      this.bqly = bqly;
      this.CurrentPage = 1;
      this.queryAllQuestions(1);
    },
    handleSQGB(e) {
      //申请关闭
      let sqgb = e.target.getAttribute("data-type");
      if (sqgb == null) return;
      this.sqgb = sqgb;
      this.CurrentPage = 1;
      this.queryAllQuestions(1);
    },
    //问题标签分类
    handleWTFBQ(e) {
      let wtfbq = e.target.getAttribute("data-type");
      if (wtfbq == null) return;
      this.wtfbq = wtfbq;
      // if(wtfbq == 'W03' || wtfbq == 'W05'){
      //   this.gjjhShow = true;
      // }else{
      //    this.gjjhShow = false;
      // }
      this.CurrentPage = 1;
      this.queryAllQuestions(1);
    },
    // 改进状态
    handleGJZT(e) {
      let gjzt = e.target.getAttribute("data-type");
      if (gjzt == null) return;
      this.gjzt = gjzt;
      this.CurrentPage = 1;
      this.queryAllQuestions(1);
    },
    handleWTBQ(e) {
      // 问题标签
      let wtbq = e.target.getAttribute("data-type");
      if (wtbq == null) return;
      this.wtbq = wtbq;
      this.CurrentPage = 1;
      this.queryAllQuestions(1);
    },
    handleCPX(e) {
      //产品线
      let cpx = e.target.getAttribute("data-type");
      if (cpx == null) return;
      this.cpxbg = cpx;
      this.CurrentPage = 1;
      this.queryAllQuestions(1);
    },
    handleCP(e) {
      //产品
      let cp = e.target.getAttribute("data-type");
      if (cp == null) return;
      this.cpbg = cp;
      this.CurrentPage = 1;
      this.queryAllQuestions(1);
    },
    handleWTLB(e) {
      // 问题类别
      let wtlb = e.target.getAttribute("data-type");
      if (wtlb == null) return;
      this.wtlbbg = wtlb;
      this.CurrentPage = 1;
      this.queryAllQuestions(1);
    },

    handleDWLX(e) {
      // 单位类型
      let dwlx = e.target.getAttribute("data-type");
      if (dwlx == null) return;
      this.dwlx = dwlx;
      this.CurrentPage = 1;
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
        zt: this.cxzt,
        sqgb: this.sqgb,
        keyword: this.keyword,
        dwlx: this.dwlx,
        wtlb: this.wtlbbg,
        wtbq: this.wtbq,
        starDay: this.starDay,
        endDay: this.endDay,
        isAnalyse: true,
        wtfl: this.wtfl,
        bqly: this.bqly,
        wtfbq: this.wtfbq,
        wtgjzt: this.gjzt
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
  components: { pagination, twDialog, questionCard, gjjhcpl, gjjhssl }
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
.isshown-query:hover {
  cursor: pointer;
}
.bg-active {
  background: #1997d7;
  color: #fff !important;
}
</style>
