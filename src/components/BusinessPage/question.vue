<template>
  <div class="project-question">
    <div class="project-question-query">
      <div>
        <span class="query-title">
          <span :class="{'isshown-query':true,'el-icon-arrow-down':!queryLJshow,'el-icon-arrow-up':queryLJshow}" @click="handleQueryShow"></span>&nbsp;高级查询</span>
        <el-input v-model="keyword" style="width:493px;" size="small" placeholder="请输入问题提出人姓名/工号/手机号/标题/项目编号/项目名称/学校名称" @change="searchQuestion"></el-input>&#x3000;
        <el-button type="primary" size="mini" @click="handlequeryQuestion">查询</el-button>
      </div>
      <div class="query-condition" v-if="queryLJshow">
        <div>
          <p class="query-title">提问时间:</p>
          <p class="query-list">
            <el-date-picker @change="changeStarDay" v-model="starDay" size="mini" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd"></el-date-picker> &#x3000; 至 &#x3000;
            <el-date-picker @change="changeEndDay" v-model="endDay" size="mini" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd"></el-date-picker>
          </p>
        </div>
        <div>
          <p class="query-title">问题分类:</p>
          <p class="query-list" @click="handleZXR">
            <span data-type="" :class="{'bg-active':wtfl == ''}">全部</span>
            <span v-for="(zxr,index) in zzrList" :data-type="zxr.label" :key="index" :class="{'bg-active':wtfl == zxr.label}">{{zxr.mc}}</span>
          </p>
        </div>
        <div>
          <p class="query-title">查询状态:</p>
          <p class="query-list" @click="handleCXZT">
            <span data-type="" :class="{'bg-active':cxzt == ''}">全部</span>
            <span data-type="0" :class="{'bg-active':cxzt == '0'}">处理中</span>
            <span data-type="1" :class="{'bg-active':cxzt == '1'}">已关闭</span>
          </p>
        </div>
        <div>
          <p class="query-title">申请关闭:</p>
          <p class="query-list" @click="handleSQGB">
            <span data-type="" :class="{'bg-active':sqgb == ''}">全部</span>
            <span data-type="1" :class="{'bg-active':sqgb == '1'}">是</span>
            <span data-type="0" :class="{'bg-active':sqgb == '0'}">否</span>
          </p>
        </div>
        <!-- <div>
               <p class="query-title">是否紧急:</p>
               <p class="query-list" @click="handleSFJJ">
                   <span data-type="" :class="{'bg-active':sfjj == ''}">全部</span>
                   <span data-type="1" :class="{'bg-active':sfjj == '1'}">是</span>
                   <span data-type="0" :class="{'bg-active':sfjj == '0'}">否</span>
                </p>    
           </div> -->
        <div>
          <p class="query-title">是否催办:</p>
          <p class="query-list" @click="handleSFCB">
            <span data-type="" :class="{'bg-active':sfcb == ''}">全部</span>
            <span data-type="1" :class="{'bg-active':sfcb == '1'}">是</span>
            <span data-type="0" :class="{'bg-active':sfcb == '0'}">否</span>
          </p>
        </div>
        <div v-if="showCondition==1||showCondition==2">
          <p class="query-title">产品线:</p>
          <p class="query-list" @click="handleCPX">
            <span data-type="" :class="{'bg-active':cpxbg == ''}">全部</span>
            <span v-for="(cpx,index) in cpline" :data-type="cpx.label" :class="{'bg-active':cpxbg === cpx.label}">{{cpx.mc}}</span>
          </p>
        </div>
        <div v-if="showCondition==1||showCondition==2">
          <p class="query-title">产品:</p>
          <p class="query-list" @click="handleCP">
            <span data-type="" :class="{'bg-active':cpbg == ''}">全部</span>
            <span v-for="(cp,index) in cplist" :data-type="cp.label" :class="{'bg-active':cpbg == cp.label}">{{cp.mc}}</span>
          </p>
        </div>
        <div v-if="showCondition==1||showCondition==2">
          <p class="query-title">问题类别:</p>
          <p class="query-list" @click="handleWTLB">
            <span data-type="" :class="{'bg-active':wtlbbg == ''}">全部</span>
            <span v-for="(wtlbd,index) in wtlb" :data-type="wtlbd.label" :class="{'bg-active':wtlbbg == wtlbd.label}">{{wtlbd.mc}}</span>
          </p>
        </div>
        <!-- <div v-if="showCondition==1||showCondition==2">
              <p class="query-title">是否bug:</p>
              <p class="query-list"  @click="handleSFBUG">
                  <span data-type=""  :class="{'bg-active':sfbug == ''}">全部</span>
                  <span data-type="1" :class="{'bg-active':sfbug == '1'}">是</span>
                  <span data-type="0" :class="{'bg-active':sfbug == '0'}">否</span>
              </p>
           </div> -->
        <div v-if="showCondition==1||showCondition==2">
          <p class="query-title">未响应状态:</p>
          <p class="query-list" @click="handleWXYZT">
            <span data-type="" :class="{'bg-active':wxyztbg == ''}">全部</span>
            <span v-for="(item,index) in wxyztlist" :data-type="item.label" :class="{'bg-active':wxyztbg == item.label}">{{item.mc}}</span>
          </p>
        </div>
        <div v-if="showCondition==1||showCondition==2">
          <p class="query-title">未解决状态:</p>
          <p class="query-list" @click="handleWJJZT">
            <span data-type="" :class="{'bg-active':wjjztbg == ''}">全部</span>
            <span v-for="(item,index) in wjjztlist" :data-type="item.label" :class="{'bg-active':wjjztbg == item.label}">{{item.mc}}</span>
          </p>
        </div>
        <div v-if="isJZuser == 0">
          <p class="query-title">到期查询:</p>
          <p class="query-list" @click="handleCNQX">
            <span data-type="" :class="{'bg-active':cnqx == ''}">全部</span>
            <span v-for="(item,index) in cnqxList" :data-type="item.label" :class="{'bg-active':cnqx == item.label}">{{item.mc}}</span>
          </p>
        </div>
        <div v-if="showCondition==1||showCondition==2">
          <p class="query-title">区域工程:</p>
          <p class="query-list" @click="handleGCZD">
            <span data-type="" :class="{'bg-active':gczd == ''}">全部</span>
            <span v-for="(gcqy,index) in gczdList" :data-type="gcqy.label" :key="index" :class="{'bg-active':gczd == gcqy.label}">{{gcqy.mc}}</span>
          </p>
        </div>
        <div v-if="showCondition==1||showCondition==2">
          <p class="query-title">单位类型:</p>
          <p class="query-list" @click="handleDWLX">
            <span data-type="" :class="{'bg-active':dwlx == ''}">全部</span>
            <span v-for="(dwlxx,index) in dwlxList" :data-type="dwlxx.label" :class="{'bg-active':dwlx == dwlxx.label}">{{dwlxx.mc}}</span>
          </p>
        </div>
      </div>
    </div>
    <div style="background:#fff;margin-top:10px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);border-radius:4px;padding:10px 0;">
      <div style="padding:0 10px">
        <el-button type="danger" @click="handleQuestion" style="font-size:16px;" :disabled="this.xmDetail.ztztmc == '已终止'||(this.xmDetail.gcfwzt == '0' && this.xmDetail.ztztmc=='已过保')">
          {{this.xmDetail.ztztmc == '已终止'?'该项目已经终止,禁止提问':this.xmDetail.gcfwzt == '0'&& this.xmDetail.ztztmc=='已过保'?this.xmDetail.gcfwztsm:'我要提问'}}
        </el-button>
        <el-button :disabled="this.xmDetail.ztztmc == '已终止'" v-if="userGroupTag.includes('ProblemAdmin')||userGroupTag.includes('GCCPZJ')||userGroupTag.includes('QYZ')" size="mini" type="primary" @click="handleExport" style="float:right;margin-top:8px">导出</el-button>
      </div>
      <hr style="border-top:1px solid #eee;margin:8px 0 0 0 !important">
      <questionCard :questionList="questionList" @handleQuestionDetail="handleQuestionDetail" @handleReject="handleReject" @handleClose="handleClose" @editQuestion="editQuestion" @deleteQuestion="deleteQuestion"></questionCard>
      <div style="margin-top:10px;text-align:right" v-if="total > 10">
        <pagination :total="total" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange"></pagination>
      </div>
    </div>

    <twDialog :show.sync="show" :questionTitle="questionTitle" :accreditShow="accreditShow" :questionInfo="qusetionInfo" :chooseableItem="chooseableItem" :itemInfo="itemInfo" @handleTWsuccess="handleTWsuccess"></twDialog>
    <gxrDialog :show.sync="gxrShow" :wtInfo="wtInfo" @closeQuestion="closeQuestion"></gxrDialog>
    <sqgbwtDialog :show.sync="sqgbShow"></sqgbwtDialog>
  </div>
</template>
<script>
import pagination from "@/components/BusinessPage/pagination.vue";
import {
  queryAllQuestions,
  deleteQuestion,
  queryQuestion,
  showQuestionCondition,
  canSubmitQuestion,
  applyDismiss,
  getProject
} from "@/api/xmkb.js";
import { getMenu, getSession } from "@/utils/util.js";
import { isEdit } from "@/api/common.js";
import twDialog from "@/components/dialog/tw-dialog.vue";
import questionCard from "@/components/BusinessPage/questionCard.vue";
import gxrDialog from "@/components/dialog/gxr-dialog.vue";
import sqgbwtDialog from "@/components/dialog/sqgbwt-dialog.vue";
export default {
  data() {
    return {
      questionTitle: "提交问题",
      dialogVisible: false,
      sqgbShow: false,
      gxrShow: false,
      wtInfo: {},
      index: "",
      cnjsrq: "",
      question: {
        wtlb: "",
        sfjj: "",
        wtjb: "",
        cp: "",
        yxfw: "",
        sfbug: "",
        bbh: "",
        title: "",
        nr: "",
        wid: "",
        qwjjrq: "",
        qwjjrqO: "",
        cnjsrq: ""
      },
      queryLJshow: true,
      input: "",
      questionList: [],
      pageSize: 10,
      CurrentPage: 1,
      total: null,
      wxyztlist: [],
      gczdList: [],
      zzrList: [
        { label: "1", mc: "待我解决问题" },
        { label: "0", mc: "我的提问" },
        { label: "3", mc: "我受理过的问题" },
        { label: "2", mc: "我相关的问题" }
      ],
      dwlxList: [
        { label: "1", mc: "学校" },
        { label: "0", mc: "金智" },
        { label: "2", mc: "合作伙伴" }
      ],
      wjjztlist: [],
      cnqxList: [],
      cpline: [],
      cplist: [],
      wtlb: [],
      cnqx: "",
      sfjj: "",
      sfcb: "",
      cpxbg: "",
      cpbg: "",
      wtlbbg: "",
      sfbug: "",
      cxzt: "0",
      sqgb: "",
      wxyztbg: "",
      wjjztbg: "",
      gczd: "",
      wtfl: "",
      dwlx: "",
      qusetionInfo: {},
      wid: "",
      accreditShow: false,
      showCondition: "",
      isJZuser: "",
      SLbtnDisabled: false,
      userid: null,
      pickerBeginDateBefore: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      username: "",
      uploadAction: "https://jsonplaceholder.typicode.com/posts/",
      fileList: [],
      fileData: [],
      filesData: [],
      baseUrl: "",
      chooseableItem: false,
      show: false,
      itemInfo: {
        xmbh: this.xmbh,
        xmmc: this.xmmc
      },
      starDay: "",
      endDay: "",
      keyword: "",
      userGroupTag: "",
      xmDetail: {}
    };
  },
  props: {
    xmbh: {
      type: String,
      default: ""
    },
    xmmc: {
      type: String,
      default: ""
    },
    isAll: {
      type: Boolean,
      default: true
    },
    xmkbInfo: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  mounted() {
    this.username = window.userName;
    this.baseUrl = window.baseurl;
    getProject({
      xmbh: this.xmbh
    }).then(({ data }) => {
      if (data.state == "success") {
        this.xmDetail = data.data;
      } else {
        this.$alert(data.msg, "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
      }
    });
    if (!this.isAll) {
      this.wtfl = 2;
      this.cxzt = "";
    } else {
      this.wtfl = "";
      this.cxzt = "";
    }
    this.isJZuser = sessionStorage.getItem("isJZuser");
    this.userGroupTag = JSON.parse(
      sessionStorage.getItem("userInfo")
    ).userGroupTag;

    showQuestionCondition().then(({ data }) => {
      //提问展示
      this.showCondition = data.data;
      if (data.data == 1 || data.data == 2) {
        if (getSession("UnResponsiveStatus") == null) {
          getMenu("UnResponsiveStatus", this.wxyztlist, ""); //未响应状态
          getMenu("ProblemSolutionState", this.wjjztlist, ""); //未解决状态
          getMenu("cpx", this.cpline, true); //获取产品线
          getMenu("gczd", this.gczdList, true); //获取工程战队
        } else {
          this.wxyztlist = getSession("UnResponsiveStatus");
          this.wjjztlist = getSession("ProblemSolutionState");
          this.cpline = getSession("cpx");
          this.gczdList = getSession("gczd");
        }
      }
    });
    if (getSession("ProblemType") == null) {
      getMenu("ProblemType", this.wtlb, "");
      getMenu("cp", this.cplist, true);
      getMenu("DeadlineStatus", this.cnqxList, ""); //承诺期限
    } else {
      this.wtlb = getSession("ProblemType");
      this.cplist = getSession("cp");
      this.cnqxList = getSession("DeadlineStatus");
    }
    this.queryAllQuestions(1);
  },

  methods: {
    handleReject(params, index, sm) {
      // 驳回
      applyDismiss({
        wid: "",
        zbwid: params.wid,
        sm: sm
      }).then(({ data }) => {
        if (data.state == "success") {
          this.$alert("已成功驳回！", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.questionList[index].sqgbCount = 0;
            }
          });
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    handleClose(params, index) {
      //关闭问题
      this.wtInfo = params;
      this.index = index;
      this.gxrShow = !this.gxrShow;
    },
    closeQuestion() {
      //关闭问题成功
      this.gxrShow = !this.gxrShow;
      this.questionList[this.index].fbzt = 1;
      this.questionList[this.index].sqgbCount = 0;
    },
    handleExport() {
      window.open(
        window.baseurl +
          "question/exportQuestionReport.do?noResponse=" +
          this.wxyztbg +
          "&urgent=" +
          this.sfjj +
          "&cp=" +
          this.cpbg +
          "&cpx=" +
          this.cpxbg +
          "&bug=" +
          this.sfbug +
          "&jjzt=" +
          this.wjjztbg +
          "&zt=" +
          this.cxzt +
          "&keyword=" +
          this.keyword +
          "&qyzd=" +
          this.gczd +
          "&wtfl=" +
          this.wtfl +
          "&dwlx=" +
          this.dwlx +
          "&cb=" +
          this.sfcb +
          "&wtlb=" +
          this.wtlbbg +
          "&sqgb=" +
          this.sqgb +
          "&deadline=" +
          this.cnqx +
          "&starDay=" +
          this.starDay +
          "&endDay=" +
          this.endDay +
          "&xmbh=" +
          this.xmbh
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
    // 删除文件
    handleRemove(file, fileList) {
      this.fileData = [];
      this.fileList = [];
      this.filesData = [];
    },

    beforeUpload(file) {
      let fd = new FormData();
      fd.append("fileUpload", file);
      fd.append("xmbh", this.xmbh);

      axios
        .post(window.baseurl + "attachment/uploadAttach.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.state == "success") {
            this.fileData.push(res.data.data); //文件 list Arr
          } else {
            this.$alert(res.data.msg, "提示", {
              confirmButtonText: "确定"
            });
          }
        });
      return true;
    },
    handleChange(file, fileList) {
      let r = [];
      this.filesData.push(file);
      for (var i = 0, l = this.filesData.length; i < l; i++) {
        for (var j = i + 1; j < l; j++)
          if (this.filesData[i].name === this.filesData[j].name) j = ++i;
        r.push(this.filesData[i]);
      }
      this.fileList = r;
      this.$refs.upload.submit();
    },

    /************************************************* */

    handleQueryShow() {
      // 高级查询
      this.queryLJshow = !this.queryLJshow;
    },

    handleQuestion() {
      //我要提问
      canSubmitQuestion().then(({ data }) => {
        if (data.state == "success") {
          if (data.data >= 1) {
            this.$alert(
              "您有" +
                data.data +
                "个问题申请关闭，请根据问题处理情况驳回或者关闭，处理之后可以继续提问，谢谢支持",
              " 提示",
              {
                confirmButtonText: "确定",
                type: "warning",
                callback: action => {
                  this.sqgbShow = !this.sqgbShow;
                }
              }
            );
          } else {
            this.accreditShow = false;
            this.questionTitle = "我要提问";
            this.show = true;
          }
        }
      });
    },
    handleQuestionDetail(params) {
      //查看问题详情
      this.wid = params.wid;
      let routeData = this.$router.resolve({
        name: "questionDetail",
        query: { wid: params.wid }
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
              if (!!data.data) {
                this.$alert("删除成功", "提示", {
                  confirmButtonText: "确定",
                  type: "success",
                  callback: action => {
                    this.queryAllQuestions(1);
                  }
                });
              } else {
                this.$alert("删除失败", "提示", {
                  confirmButtonText: "确定",
                  type: "warning"
                });
              }
            } else {
              this.$alert(data.msg, "提示", {
                confirmButtonText: "确定",
                type: "warning"
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
    changeStarDay(val) {
      // 选择开始时间
      this.queryAllQuestions(1);
    },
    changeEndDay(val) {
      // 选择结束时间
      this.queryAllQuestions(1);
    },
    handleSFJJ(e) {
      //是否紧急
      let sfjj = e.target.getAttribute("data-type");
      if (sfjj == null) return;
      this.sfjj = sfjj;
      this.queryAllQuestions(1);
    },
    handleSFCB(e) {
      // 是否催办
      let sfcb = e.target.getAttribute("data-type");
      if (sfcb == null) return;
      this.sfcb = sfcb;
      this.queryAllQuestions(1);
    },
    handleCPX(e) {
      //产品线
      let cpx = e.target.getAttribute("data-type");
      if (cpx == null) return;
      this.cpxbg = cpx;
      this.queryAllQuestions(1);
    },
    handleCP(e) {
      //产品
      let cp = e.target.getAttribute("data-type");
      if (cp == null) return;
      this.cpbg = cp;
      this.queryAllQuestions(1);
    },
    handleWTLB(e) {
      // 问题类别
      let wtlb = e.target.getAttribute("data-type");
      if (wtlb == null) return;
      this.wtlbbg = wtlb;
      this.queryAllQuestions(1);
    },
    handleSFBUG(e) {
      //是否bug
      let sfbug = e.target.getAttribute("data-type");
      if (sfbug == null) return;
      this.sfbug = sfbug;
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
    handleWXYZT(e) {
      //未响应状态
      let wxyzt = e.target.getAttribute("data-type");
      if (wxyzt == null) return;
      this.wxyztbg = wxyzt;
      this.queryAllQuestions(1);
    },
    handleWJJZT(e) {
      let wjjzt = e.target.getAttribute("data-type");
      if (wjjzt == null) return;
      this.wjjztbg = wjjzt;
      this.queryAllQuestions(1);
    },
    handleCNQX(e) {
      let cnqx = e.target.getAttribute("data-type");
      if (cnqx == null) return;
      this.cnqx = cnqx;
      this.queryAllQuestions(1);
    },
    handleGCZD(e) {
      let gczd = e.target.getAttribute("data-type");
      if (gczd == null) return;
      this.gczd = gczd;
      this.queryAllQuestions(1);
    },
    handleDWLX(e) {
      // 单位类型
      let dwlx = e.target.getAttribute("data-type");
      if (dwlx == null) return;
      this.dwlx = dwlx;
      this.queryAllQuestions(1);
    },
    handleZXR(e) {
      let zxr = e.target.getAttribute("data-type");
      if (zxr == null) return;
      this.wtfl = zxr;
      this.queryAllQuestions(1);
    },

    // 获取所有问题
    queryAllQuestions(curPage) {
      queryAllQuestions({
        curPage: curPage,
        pageSize: this.pageSize,
        xmbh: this.xmbh,
        urgent: this.sfjj,
        cp: this.cpbg,
        cpx: this.cpxbg,
        bug: this.sfbug,
        noResponse: this.wxyztbg,
        jjzt: this.wjjztbg,
        zt: this.cxzt,
        keyword: this.input || "",
        qyzd: this.gczd,
        wtfl: this.wtfl,
        dwlx: this.dwlx,
        cb: this.sfcb,
        wtlb: this.wtlbbg,
        sqgb: this.sqgb,
        deadline: this.cnqx,
        starDay: this.starDay,
        endDay: this.endDay
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
  activated() {},
  components: { pagination, twDialog, questionCard, gxrDialog, sqgbwtDialog }
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
.questionOperate {
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
}
.questionOperate > span:hover {
  text-decoration: underline #888;
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
