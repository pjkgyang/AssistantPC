<template>
  <div>
    <layout :title="'周报总览'">
      <header slot="header">
        <section style="padding:10px 0" v-if="isJzyh == 0">
          <div class="month-plan-explain">
            <p>1.完工计划统计的毛收入完工量，验收计划统计的是合同额；</p>
            <p>2.每周一5时系统会自动封存上周计划，封存后的计划作为考核依据，不能编辑，只能查看和批注；</p>
          </div>
        </section>
        <section flex spacebetween>
          <div>
            <span>
              <el-date-picker
                style="width:138px"
                :picker-options="pickerBeginDateBefore"
                @change="handleChooseMonth"
                v-model="monthValue"
                size="small"
                type="month"
                placeholder="选择月"
                value-format="yyyy-MM"
                format="yyyy年MM月"
                :clearable="false"
              ></el-date-picker>
            </span>
            <span>
              <el-select
                v-model="weekValue"
                size="small"
                placeholder="请选择"
                @change="handleChooseWeek"
                style="width:100px"
              >
                <el-option
                  v-for="item in weeksNum"
                  :key="item"
                  :label="'第' + (item == 1 ? '一' : item == 2 ? '二' : item == 3 ? '三' : item == 4 ? '四' : '五') + '周'"
                  :value="item"
                ></el-option>
              </el-select>
            </span>
            <span>
              <el-input
                placeholder="请输入内容"
                v-model="weekDay"
                :disabled="true"
                size="small"
                style="width:200px"
              ></el-input>
            </span>
            <span v-if="groupTag.indexOf('JYGL') != -1">
              <span class="filter-weight">区域:&nbsp;</span>
              <el-select
                v-model="qyValue"
                size="small"
                placeholder="请选择"
                @change="handleChooseArea"
                style="width:130px"
              >
                <el-option
                  v-for="(item, i) in gczdList"
                  :key="i"
                  :label="item.mc"
                  :value="item.label"
                ></el-option>
              </el-select>
            </span>
            <span v-if="isJzyh != 1">
              <span class="filter-weight">人员:&nbsp;</span>
              <el-select
                v-model="ryValue"
                size="small"
                placeholder="请选择"
                @change="handleChoosePreson"
                style="width:100px"
              >
                <el-option label="全部" value></el-option>
                <el-option
                  v-for="(item, i) in options"
                  :key="i"
                  :label="item.text"
                  :value="item.id"
                ></el-option>
              </el-select>
            </span>
            <span>
              <span class="filter-weight">项目:&nbsp;</span>
              <el-select
                class="report-chooseitem"
                style="width:200px"
                v-model="itemValue"
                clearable
                filterable
                remote
                :remote-method="remoteMethod"
                @change="changeProject"
                placeholder="请选择/搜索项目/项目编号"
                size="small"
              >
                <el-option
                  v-for="item in itemList"
                  :key="item.value"
                  :label="'[' + item.xmbh + '] ' + item.xmmc"
                  :value="item.xmmc"
                ></el-option>
              </el-select>
            </span>
            <span>
              <span class="filter-weight">考核总结：</span>
              <span>
                <el-checkbox
                  v-model="sfkhzj"
                  true-label="1"
                  false-label="0"
                  @change="handleCheckSfzj"
                >是</el-checkbox>
              </span>
            </span>
          </div>
          <!-- 2018-9-25 修改 !isBlocked &&-->
          <div class="pull-right">
            <el-button size="small" type="primary" @click="handleExport">导出</el-button>
            <el-button
              v-if="isZd && isJzyh != 1"
              size="small"
              type="danger"
              @click="handleClickAddzb"
            >制订项目周报</el-button>
          </div>
        </section>
      </header>
      <article slot="content">
        <div>
          <div flex>
            <h4 class="filter-weight">{{ textTitle }}</h4>&#x3000;
            <span
              v-if="textTitle == '本周工作计划'"
            >创建时间：{{ !maxminDate.mincjsj ? '无' : maxminDate.mincjsj }}</span>
            <span
              v-if="textTitle == '本周工作总结'"
            >总结时间：{{ !maxminDate.maxzjsj ? '无' : maxminDate.maxzjsj }}</span>
          </div>
          <hr class="weekly-hr" />
        </div>
        <tableLayout :title="'里程碑工作'">
          <div slot="bottom">
            <section class="month-plan-condition mg-12">
              <el-button
                :disabled="!multipleSelection.length"
                size="mini"
                @click="handlePzofBatch"
              >批量批注</el-button>
            </section>
            <WeekLcbTable
              @handleClickPz="handleLcbPz"
              @handleClickEdit="handleLcbEdit"
              @handleClickCheck="handleLcbCheck"
              @handleCurrentChange="handleLcbCurrentChange"
              :currentPage="currentWorkPage"
              :bjWordShow="false"
              :wordShow="wordShow"
              @handleSizeChange="handleSizeLcbChange"
              @handleSelectionChange="handleSelectLcb"
              :gznrShow="false"
              :pageSize="LcbPageSize"
              :records="LcbRecords"
              :tableData="LcbList"
              :isEdit="false"
              :isSelect="true"
            ></WeekLcbTable>
          </div>
        </tableLayout>
        <tableLayout :title="'进度任务'">
          <div slot="bottom">
            <section class="month-plan-condition mg-12">
              <el-button
                :disabled="!multipleSelectJd.length"
                size="mini"
                @click="handleJdPzofBatch"
              >批量批注</el-button>
            </section>
            <processTable
              :tableData="processList"
              @handleClickPz="handleProcessPz"
              @handleClickEdit="handleProcessEdit"
              @handleClickCheck="handleProcessCheck"
              @handleCurrentChange="handleJdCurrentChange"
              @handleSizeChange="handleSizeJdChange"
              @handleSelectionChange="handleSelectJd"
              :isSelect="true"
              :pageSize="pageSize"
              :records="JdRecords"
              :currentPage="currentProcessPage"
              :isPz="true"
              :deleteShow="false"
              :bjWordShow="true"
              :isEdit="false"
              :wordShow="wordShow"
            ></processTable>
          </div>
        </tableLayout>
        <tableLayout :title="'问题处理'">
          <div slot="bottom">
            <section class="month-plan-condition mg-12">
              <el-button
                :disabled="!multipleSelectWt.length"
                size="mini"
                @click="handlePzofBatchWt"
              >批量批注</el-button>
            </section>
            <MonthWeekQuestionTable
              :tableData="questionList"
              @handleClickEdit="handleQuestionEdit"
              @handleCurrentChange="handleQuestionPageChange"
              @handleClickPz="handleQuestionPz"
              @handleClickCheck="handleQuestionCheck"
              :bjWordShow="true"
              :othShow="othShow"
              @handleSizeChange="handleSizeWtChange"
              @handleSelectionChange="handleSelectWt"
              :pageSize="WtPageSize"
              :records="WtRecords"
              :currentPage="currentQuestionPage"
              :isSelect="true"
              :isEdit="false"
              :tjjd="true"
            ></MonthWeekQuestionTable>
          </div>
        </tableLayout>
      </article>
    </layout>
    <div class="week-report-oprater" v-if="false">
      <el-button type="primary" size="small" @click="handleReaded">已阅</el-button>
    </div>
    <pzDialog
      :tableData="pzList"
      :pzlbShow="pzlsShow"
      :show.sync="pzShow"
      @handleClickSure="handleClickSure"
    ></pzDialog>
    <bjDialog
      :data="bjInfo"
      :isShow="false"
      :show.sync="editShow"
      @handleClickSure="handleClickEditSure"
    ></bjDialog>
    <jdDialog :taskInfo="taskInfo" :show.sync="jdShow" @handleSubmit="handleProcessSubmit"></jdDialog>
    <detailDialog
      :show.sync="detailShow"
      :title="detailTitle"
      :detailType="detailType"
      :filedsShow="wordShow"
    ></detailDialog>

    <zdzjhDialog :show.sync="jhzdShow" :title="'制订项目周报'">
      <div slot="content">
        <weekReportFill @handleFormulate="handleFormulate" :dateObj="dateObj"></weekReportFill>
      </div>
    </zdzjhDialog>
  </div>
</template>

<script>
import layout from "@/components/layout/MonthWeekLayout.vue";
import WeekLcbTable from "@/components/BusinessPage/MonthWeekTable.vue";
import MonthWeekQuestionTable from "@/components/BusinessPage/MonthWeekQuestionTable.vue";
import processTable from "@/components/weekReport/processTable.vue";
import tableLayout from "@/components/layout/tableLayout.vue";
import pzDialog from "@/components/dialog/pz-dialog.vue";
import bjDialog from "@/components/dialog/bj-dialog.vue";
import jdDialog from "@/components/dialog/jd-dialog.vue";
import detailDialog from "@/components/dialog/detail-dialog.vue";
import zdzjhDialog from "@/components/dialog/zdjh-dialog.vue";

import lcbztSelect from "@/components/monthReport/lcbzt-select.vue";
import weekReportFill from "@/views/BusinessPage/weekMonthReport/weekReport-write.vue";
import { getProjects } from "@/api/xmkb.js";
import {
  EventBus,
  getMenu,
  getSession,
  getWeeks,
  getLastMonth,
  GetNextDate,
  getNowFormatDate,
  weekNumInMonth,
  GetDateStr,
  getNextMonth,
  getLastMonthDay
} from "@/utils/util.js";
import {
  pageWeekWork,
  pageWeekQuestion,
  pageWeeklyReport,
  listComments,
  addComment,
  saveWeekWork,
  refreshWeekWork,
  isWeekPlanBlocked,
  batchUpdateWeekQuestion,
  batchUpdateWeekWork,
  listWeekPlanPerson
} from "@/api/weekMonthReport.js";

const wzdContent =
  "<h5 style='font-weight:700'>本周计划尚未制定，<span style='color:#f00'>请制定本周计划。</span></h5>";
const wfcContent =
  "<h5 style='font-weight:700'>本周计划已制订，尚未封存，<span style='color:#f00'>请填写未完成原因和后续措施。</span></h5>";
const yfcContent =
  "<h5 style='font-weight:700'>本周计划 <span style='color:#f00'>已制定，已封存。</span></h5>";
export default {
  data() {
    return {
      textTitle: "本周工作计划",
      itemList: [], //项目列表
      itemValue: "",
      groupTag: "",
      keyword: "",
      wtKeyword: "",
      lcbztList: [],
      pickerBeginDateBefore: {
        // disabledDate(time) {
        //       return time.getTime() > Date.now();
        //   }
      },
      wtztList: [
        {
          value: "0",
          label: "处理中"
        },
        {
          value: "2",
          label: "已申请关闭"
        }
      ],
      ycztList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "超期"
        },
        {
          value: "1",
          label: "未超期"
        }
      ],
      ycztValue: "",
      wtztValue: [],
      monthValue: "",
      sfkhzj: "1", //是否考核总结
      options: [],
      gczdList: [],
      LcbList: [], //里程碑列表
      questionList: [], // 问题列表
      processList: [], // 进度列表
      pzList: [], // 批注列表
      bjInfo: {}, // 编辑信息
      taskInfo: {}, //进度信息
      qyValue: "福建区域工程",
      ryValue: "",
      weekValue: 1,
      weekDay: "",
      pzShow: false,
      editShow: false,
      jdShow: false,
      pzlsShow: false, // 批注列表 是否显示
      isLcb: false, // 是否为里程碑批注
      detailShow: false,
      jhzdShow: false,
      wordShow: true,
      othShow: true,
      detailTitle: "",
      pageSize: 10,
      LcbPageSize: 10,
      WtPageSize: 10,
      LcbRecords: 0,
      JdRecords: 0,
      WtRecords: 0,
      weeksNum: "",
      weekStartDate: "",
      weekEndDate: "",
      year: "",
      month: "",
      Wid: "",
      wtWid: "",
      planType: "",
      currentWorkPage: 1,
      currentProcessPage: 1,
      currentQuestionPage: 1,
      index: "",
      lcbbh: "",
      jdData: {},
      multipleSelection: [],
      multipleSelectJd: [],
      multipleSelectWt: [],
      isBlocked: false,
      userId: "",
      curWeek: "",
      detailType: {},
      NewYear: "",
      NewMonth: "",
      isJzyh: "", //是否为金智用户,
      dateObj: {},
      shownn: true,
      lastMonth: "",
      isZd: true,

      maxminDate: {} //周报返回创建时间以及总结时间
    };
  },
  props: {},
  beforeMount() {},

  mounted() {
    //获取工程战队
    if (getSession("gczd") == null) {
      getMenu("gczd", this.gczdList, true);
    } else {
      this.gczdList = getSession("gczd");
    }
    this.groupTag = JSON.parse(sessionStorage.getItem("userInfo")).userGroupTag;
    if (this.groupTag.indexOf("JYGL") != -1) {
      this.qyValue = "福建区域工程";
    } else {
      this.qyValue = "";
    }
    this.isJzyh = sessionStorage.isJZuser;
    this.userId = JSON.parse(sessionStorage.userInfo).uid;
    this.NewYear = new Date().getFullYear();
    this.NewMonth = new Date().getMonth();
    this.initializeDate();
    this.dateObj.month = this.monthValue;
    this.dateObj.weekValue = this.weekValue;
    this.dateObj.weeksNum = this.weeksNum;
  },
  activated() {
    this.listWeekPlanPerson();
  },
  computed: {},
  methods: {
    // 是否考核总结
    handleCheckSfzj(val) {
      this.sfkhzj = val;
      this.listWeekPlanPerson();
    },
    // 选择项目
    changeProject(val) {
      this.getWeekReportData(1);
    },
    remoteMethod(val) {
      //远程搜索
      this.itemValue = val;
      this.getProjects();
    },
    handleFormulate() {
      this.jhzdShow = false;
      this.pageWeekWork(1, this.monthValue, this.weekValue); // 周工作
      this.pageWeekQuestion(1, this.monthValue, this.weekValue); // 周问题
      this.pageWeeklyReport(1, this.monthValue, this.weekValue); // 周进度
      this.currentWorkPage = 1;
      this.currentProcessPage = 1;
      this.currentQuestionPage = 1;
    },
    // 选择月
    handleChooseMonth(val) {
      let chooseDate =
        this.NewYear +
        "-" +
        (this.NewMonth + 1 < 10
          ? "0" + (this.NewMonth + 1)
          : this.NewMonth + 1);
      if (
        new Date(this.monthValue).getTime() >= new Date(chooseDate).getTime()
      ) {
        this.textTitle = "本周工作计划";
        this.wordShow = false;
        this.othShow = false;
      } else {
        this.textTitle = "本周工作总结";
        this.wordShow = true;
        this.othShow = true;
      }
      this.monthValue = val;
      this.year = val.split("-")[0];
      this.month = val.split("-")[1] - 1;
      this.weekValue = 1;
      this.weeksNum = getWeeks(this.year, this.month + 1); //周数
      this.weekDay = this.getMonthWeeks(val.split("-")[0], val.split("-")[1]);
      let startDate = this.weekDay.split("至")[0];
      if (
        new Date(startDate).getTime() > new Date(getNowFormatDate()).getTime()
      ) {
        this.isZd = false;
      } else {
        this.isZd = true;
      }
      this.dateObj.month = this.monthValue;
      this.dateObj.weekValue = this.weekValue;
      this.dateObj.weeksNum = this.weeksNum;
      this.listWeekPlanPerson();
      this.isWeekPlanBlocked(this.monthValue, this.weekValue);
      this.mapWeekReportDate();
    },
    // 选择周
    handleChooseWeek(val) {
      let chooseDate =
        this.NewYear +
        "-" +
        (this.NewMonth + 1 < 10
          ? "0" + (this.NewMonth + 1)
          : this.NewMonth + 1);
      this.weekDay = this.getWeekDate(
        this.year,
        this.monthValue.split("-")[1] - 1,
        val
      );
      let startDate = this.weekDay.split("至")[0];
      this.dateObj.weekValue = val;
      if (
        new Date(startDate).getTime() > new Date(getNowFormatDate()).getTime()
      ) {
        this.isZd = false;
      } else {
        this.isZd = true;
      }
      this.listWeekPlanPerson();
      this.isWeekPlanBlocked(this.monthValue, this.weekValue);
      if (
        new Date(this.monthValue).getTime() > new Date(chooseDate).getTime()
      ) {
        this.textTitle = "本周工作计划";
        this.wordShow = false;
        this.othShow = false;
      } else if (
        new Date(this.monthValue).getTime() < new Date(chooseDate).getTime()
      ) {
        this.textTitle = "本周工作总结";
        this.wordShow = true;
        this.othShow = true;
      } else {
        if (this.weekValue >= this.curWeek) {
          this.textTitle = "本周工作计划";
          this.wordShow = false;
          this.othShow = false;
        } else {
          this.textTitle = "本周工作总结";
          this.wordShow = true;
          this.othShow = true;
        }
      }
      this.mapWeekReportDate();
    },
    handleChooseArea(val) {
      // 选择区域
      // this.getWeekReportData(1);
      this.listWeekPlanPerson();
      this.mapWeekReportDate();
    },
    handleChoosePreson(val) {
      // 选择人员
      this.getWeekReportData(1);
      this.mapWeekReportDate();
    },
    handleLcbCurrentChange(data) {
      // (里程碑) 分页
      this.pageWeekWork(data, this.monthValue, this.weekValue);
      this.currentWorkPage = data;
    },
    handleSizeLcbChange(data) {
      // (里程碑) 每页条数
      this.LcbPageSize = data;
      this.pageWeekWork(1, this.monthValue, this.weekValue);
      this.currentWorkPage = 1;
    },
    handleSelectLcb(val) {
      // (里程碑) 复选
      this.multipleSelection = val;
    },
    handlePzofBatch() {
      // 批注批量（里程碑）
      this.Wid = "";
      this.planType = 3;
      this.pzlsShow = false;
      this.isLcb = true;
      this.pzShow = true;
    },
    handleEditofBatch() {
      // 编辑批量（里程碑）
      this.Wid = "";
      this.isLcb = true;
      this.editShow = true;
    },
    handleLcbPz(data) {
      //(里程碑)  批注
      this.planType = 3;
      this.Wid = data.zgzWid;
      this.pzShow = true;
      this.pzlsShow = true;
      this.getListComments(data.zgzWid);
    },
    handleLcbEdit(data, index) {
      //(里程碑) 编辑
      this.index = index;
      this.planType = 3;
      this.Wid = data.zgzWid;
      this.lcbbh = data.lcbbh;
      this.bjInfo.wwcyy = data.wwcyy;
      this.bjInfo.hxcs = data.hxcs;
      this.editShow = true;
    },
    handleLcbCheck(data) {
      //(里程碑) 查看
      this.detailTitle = "里程碑工作详情";
      this.detailType.type = "zbzlLcb";
      this.detailType.wid = data.zgzWid;
      this.detailType.planType = 3;
      this.detailShow = true;
    },

    // **********************************  进度
    handleSizeJdChange(data) {
      // 每页条数
      this.pageSize = data;
      this.pageWeeklyReport(1, this.monthValue, this.weekValue); // 周进度
      this.currentProcessPage = 1;
    },
    handleSelectJd(val) {
      this.multipleSelectJd = val;
    },
    handleJdCurrentChange(data) {
      //进度（分页）
      this.pageWeeklyReport(data, this.monthValue, this.weekValue); // 周进度
      this.currentProcessPage = data;
    },
    handleProcessPz(data) {
      // (进度) 批注
      this.Wid = data.wid;
      this.planType = 5;
      this.pzlsShow = true;
      this.pzShow = true;
      this.getListComments(data.wid);
    },
    handleProcessEdit(data) {
      // 进度 编辑
      this.taskInfo = data;
      this.Wid = data.wid;
      this.jdShow = true;
    },
    handleJdPzofBatch() {
      this.Wid = "";
      this.planType = 5;
      this.pzlsShow = false;
      this.isLcb = false;
      this.pzShow = true;
    },
    handleProcessCheck(data) {
      // (进度) 查看
      this.detailTitle = "进度任务详情";
      this.detailType.type = "zbzlJd";
      this.detailType.planType = 5;
      this.detailType.wid = data.wid;
      this.detailShow = true;
    },
    handleProcessSubmit(data) {
      this.jdData = data;
      this.saveWeeklyReport();
    },
    // **************************  问题

    handleSizeWtChange(data) {
      // 问题 每页条数
      this.WtPageSize = data;
      this.pageWeekQuestion(1, this.monthValue, this.weekValue);
      this.currentQuestionPage = 1;
    },
    handleSelectWt(val) {
      // (里程碑) 复选
      this.multipleSelectWt = val;
    },
    handlePzofBatchWt() {
      // 批注批量（问题）
      this.Wid = "";
      this.isLcb = false;
      this.pzlsShow = false;
      this.planType = 4;
      this.pzShow = true;
    },
    handleEditofBatchWt() {
      // 编辑批量（问题）
      this.Wid = "";
      this.isLcb = false;
      this.editShow = true;
    },
    handleQuestionPageChange(data) {
      // 问题 分页
      this.currentQuestionPage = data;
      this.pageWeekQuestion(data, this.monthValue, this.weekValue); // 周问题
    },

    handleQuestionPz(data) {
      //(问题) 批注
      this.planType = 4;
      this.Wid = data.zwtWid;
      this.pzShow = true;
      this.pzlsShow = true;
      this.getListComments(data.zwtWid);
    },
    handleQuestionEdit(data, index) {
      //(问题) 编辑
      this.index = index;
      this.planType = 4;
      this.Wid = data.zwtWid;
      this.wtWid = data.wtwid;
      this.bjInfo.wwcyy = data.wwcyy;
      this.bjInfo.hxcs = data.hxcs;
      this.editShow = true;
    },
    handleQuestionCheck(data) {
      //(问题) 查看
      this.detailTitle = "问题处理详情";
      this.detailType.type = "zbzlWt";
      this.detailType.planType = 4;
      this.detailType.wid = data.zwtWid;
      this.detailShow = true;
    },

    handleClickSure(param) {
      // 批注（确定）
      if (this.planType == 3) {
        this.addComment(
          param,
          this.Wid ? this.Wid : this.multipleSelection.join(","),
          this.Wid ? false : true
        ); //批量批注 里程碑
      } else if (this.planType == 4) {
        this.addComment(
          param,
          this.Wid ? this.Wid : this.multipleSelectWt.join(","),
          this.Wid ? false : true
        ); //批量批注 问题
      } else {
        this.addComment(
          param,
          this.Wid ? this.Wid : this.multipleSelectJd.join(","),
          this.Wid ? false : true
        ); //批量批注 进度
      }
    },

    handleClickEditSure(data) {
      // 编辑（确定）
      if (this.isLcb) {
        batchUpdateWeekWork({
          // 批量编辑周工作（里程碑）
          zgzwids: this.Wid ? this.Wid : this.multipleSelectWt.join(","),
          wwcyy: data.wwcyy,
          hxcs: data.hxcs
        }).then(({ data }) => {
          if (data.state == "success") {
            this.$alert("保存成功！", "提示", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.pzShow = false;
                this.pageWeekWork(
                  this.currentWorkPage,
                  this.monthValue,
                  this.weekValue
                );
              }
            });
          }
        });
      } else {
        batchUpdateWeekQuestion({
          // 批量编辑周问题
          zwtwids: this.Wid ? this.Wid : this.multipleSelectWt.join(","),
          wwcyy: data.wwcyy,
          hxcs: data.hxcs
        }).then(({ data }) => {
          if (data.state == "success") {
            this.$alert("保存成功！", "提示", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.editShow = false;
                this.pageWeekQuestion(
                  this.currentQuestionPage,
                  this.monthValue,
                  this.weekValue
                );
              }
            });
          }
        });
      }
    },
    // 导出
    handleExport() {
      window.open(
        window.baseurl +
          "plan/exportWeekPlan.do?qygc=" +
          this.qyValue +
          "&month=" +
          this.monthValue +
          "&zxh=" +
          this.weekValue +
          "&yhbh=" +
          this.ryValue
      );
    },
    // 新增项目周报
    handleClickAddzb() {
      this.jhzdShow = true;
      EventBus.$emit("handleClickAddzb", this.dateObj);
    },

    handleClick(tab, event) {
      // 本周 下周
      this.getWeekReportData(1);
    },

    getWeekDate(year, month, val) {
      // 获取周具体日期
      this.weekStartDate = GetNextDate(
        getLastMonth(year, month),
        (val - 1) * 7
      );
      this.weekEndDate = GetNextDate(this.weekStartDate, 6);
      return this.weekStartDate + " 至 " + this.weekEndDate;
    },
    getMonthWeeks(year, month) {
      //第一周日期
      // this.weeksNum =  getWeeks(year,month); //周数
      this.weekStartDate = getLastMonth(this.year, this.month);
      this.weekEndDate = GetNextDate(getLastMonth(this.year, this.month), 6);
      return this.weekStartDate + " 至 " + this.weekEndDate;
    },

    // 初始化日期（计算）
    initializeDate() {
      this.year = new Date().getFullYear();
      this.month = new Date().getMonth();
      let lastWeek = getWeeks(this.year, this.month); //获取上月周数
      let week = getWeeks(this.year, this.month + 1); //获取本月周数
      let lastDay = getLastMonthDay(this.year, this.month + 1); //获取本月最后一天
      let nextYear = getNextMonth(GetDateStr(0)).split("-")[0]; //下月年份
      let nextMonth = Number(getNextMonth(GetDateStr(0)).split("-")[1]); //下月月份

      let nextWeek = getWeeks(nextYear, nextMonth); //获取下月周数

      let weekStartDate = GetNextDate(
        getLastMonth(this.year, this.month),
        (week - 1) * 7
      ); //当月最后一周日期（开始日期）
      let weekEndDate = GetNextDate(weekStartDate, 6); //当月最后一周日期（结束日期）

      let weekFirstStartDate = GetNextDate(
        getLastMonth(this.year, this.month),
        0
      ); //当月第一周日期（开始日期）
      let weekFirstEndDate = GetNextDate(weekFirstStartDate, 6); //当月第一周日期（结束日期）

      let lastMonthStartDate = GetNextDate(
        getLastMonth(this.year, this.month - 1),
        (lastWeek - 1) * 7
      ); //上月最后一周日期（开始日期）
      let lastMonthEndDate = GetNextDate(lastMonthStartDate, 6); //上月最后一周日期（结束日期）

      let nextStartDate = GetNextDate(weekStartDate, 7); //下月第一周日期（开始日期）
      let nextEndDate = GetNextDate(weekEndDate, 7); //下月第一周日期（结束日期）

      if (
        new Date(lastDay).getTime() >= new Date(GetDateStr(0)).getTime() &&
        new Date(GetDateStr(0)).getTime() > new Date(weekEndDate).getTime()
      ) {
        this.weeksNum = nextWeek; //周数
        this.weekValue = this.curWeek = 1;
        this.weekDay = nextStartDate + " 至 " + nextEndDate;
        this.monthValue = getNextMonth(GetDateStr(0));
      } else if (
        (new Date(GetDateStr(0)).getDay() == 0
          ? 7
          : new Date(GetDateStr(0)).getDay()) <= 4 &&
        new Date(GetDateStr(0)).getTime() <
          new Date(weekFirstEndDate).getTime() &&
        new Date(GetDateStr(0)).getTime() >
          new Date(weekFirstStartDate).getTime()
      ) {
        this.weeksNum = week; //周数
        this.weekValue = this.curWeek = 1;
        this.weekDay = weekFirstStartDate + " 至 " + weekFirstEndDate;
        this.monthValue =
          this.year +
          "-" +
          (this.month + 1 < 10 ? "0" + (this.month + 1) : this.month + 1);

        //当天等于上月最后一天
      } else if (
        new Date(GetDateStr(0)).getTime() ==
        new Date(lastMonthEndDate).getTime()
      ) {
        this.weeksNum = this.weekValue = this.curWeek = lastWeek; //上月周数
        this.weekDay = lastMonthStartDate + " 至 " + lastMonthEndDate;
        this.monthValue =
          this.year + "-" + (this.month < 10 ? "0" + this.month : this.month);
      } else {
        this.weeksNum = week; //周数
        this.weekValue = this.curWeek = weekNumInMonth(
          this.year +
            "/" +
            (this.month + 1 < 10 ? "0" + (this.month + 1) : this.month + 1)
        );
        this.weekDay =
          GetNextDate(weekFirstStartDate, (this.weekValue - 1) * 7) +
          " 至 " +
          GetNextDate(
            GetNextDate(weekFirstStartDate, (this.weekValue - 1) * 7),
            6
          );
        this.monthValue =
          this.year +
          "-" +
          (this.month + 1 < 10 ? "0" + (this.month + 1) : this.month + 1);
      }
      this.mapWeekReportDate();
    },

    // 获取批注列表
    getListComments(oid) {
      listComments({
        oid: oid,
        planType: this.planType
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data && data.data.length) {
            this.pzList = data.data;
          } else {
            this.pzList = [];
          }
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },

    //获取周工作计划的列表
    pageWeekWork(curPage, month, zxh) {
      pageWeekWork({
        curPage: curPage,
        pageSize: this.LcbPageSize,
        qygc: this.qyValue,
        month: month,
        zxh: zxh,
        yhbh: this.ryValue,
        zts: this.lcbztList.join(","),
        keyword: this.itemValue
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data.rows.length) {
            this.LcbList = data.data.rows;
          } else {
            this.LcbList = [];
            // if(this.userId == this.ryValue){
            //   this.ToastMessage(wzdContent);
            // }
          }
          this.LcbRecords = data.data.records;
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },

    //获取周问题计划的列表
    pageWeekQuestion(curPage, month, zxh) {
      pageWeekQuestion({
        curPage: curPage,
        pageSize: this.LcbPageSize,
        qygc: this.qyValue,
        month: month,
        zxh: zxh,
        yhbh: this.ryValue,
        wtzt: this.wtztValue,
        yczt: this.ycztValue,
        keyword: this.itemValue
      }).then(({ data }) => {
        if (data.state == "success") {
          this.questionList = data.data.rows;
          this.WtRecords = data.data.records;
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },

    //获取周进度计划的列表
    pageWeeklyReport(curPage, month, zxh) {
      pageWeeklyReport({
        curPage: curPage,
        pageSize: this.pageSize,
        qygc: this.qyValue,
        month: month,
        zxh: zxh,
        yhbh: this.ryValue,
        keyword: this.itemValue
      }).then(({ data }) => {
        if (data.state == "success") {
          this.processList = data.data.rows;
          this.JdRecords = data.data.records;
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 获取周报人员
    listWeekPlanPerson() {
      listWeekPlanPerson({
        month: this.monthValue,
        zxh: this.weekValue,
        qygc: this.qyValue,
        sfkhzj: this.sfkhzj
      }).then(({ data }) => {
        if (data.state == "success") {
          this.options = data.data;
          this.ryValue = "";
          this.getWeekReportData(1);
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },

    //保存进度
    saveWeeklyReport(yf, zxh) {
      saveWeeklyReport({
        wid: this.Wid,
        yhbh: this.yhbh,
        yf: this.monthValue,
        zxh: this.weekValue,
        xmbh: this.jdData.xmbh,
        lcbbh: this.jdData.lcbbh,
        rwbh: this.jdData.rwbh,
        gzms: this.jdData.gzms,
        gs: ""
      }).then(({ data }) => {
        if (data.state == "success") {
          this.pageWeeklyReport(
            this.currentProcessPage,
            this.monthValue,
            this.weekValue
          );
          this.$alert("保存成功！", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
          this.jdShow = false;
        }
      });
    },

    //保存批注
    addComment(comment, oids, isList) {
      addComment({
        comment: comment,
        oids: oids,
        planType: this.planType
      }).then(({ data }) => {
        if (data.state == "success") {
          if (isList) {
            this.getListComments(oids, this.planType);
          }
          this.$alert("添加成功！", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.pzShow = false;
              if (this.planType == 3) {
                this.pageWeekWork(
                  this.currentWorkPage,
                  this.monthValue,
                  this.weekValue
                ); // 周工作计划
              } else if (this.planType == 5) {
                this.pageWeeklyReport(
                  this.currentProcessPage,
                  this.monthValue,
                  this.weekValue
                ); // 周进度计划
              } else {
                this.pageWeekQuestion(
                  this.currentProcessPage,
                  this.monthValue,
                  this.weekValue
                ); // 周问题计划
              }
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
    // 获取周报列表
    getWeekReportData(page) {
      this.pageWeekWork(page, this.monthValue, this.weekValue); // 周工作
      this.pageWeekQuestion(page, this.monthValue, this.weekValue); // 周问题
      this.pageWeeklyReport(page, this.monthValue, this.weekValue); // 周进度
      this.isWeekPlanBlocked(this.monthValue, this.weekValue); // 是否封存
    },

    // 是否封存
    isWeekPlanBlocked(month, zxh) {
      isWeekPlanBlocked({
        month: month,
        zxh: zxh
      }).then(({ data }) => {
        if (data.state == "success") {
          this.isBlocked = data.data.bolck;
          let _this = this;
        }
      });
    },

    // 获取所有项目
    getProjects() {
      getProjects({
        curPage: 1,
        pageSize: 12,
        keyword: this.itemValue,
        xmzt: "1,2,3",
        xmlb: "",
        sfgx: "",
        pl: "",
        isAll: false
      }).then(({ data }) => {
        if (data.state == "success") {
          this.itemList = data.data.rows;
        }
      });
    },
    ToastMessage(content) {
      this.$message.closeAll();
      this.$message({
        dangerouslyUseHTMLString: true,
        showClose: true,
        duration: 10000,
        type: "warning",
        message: content
      });
    },

    // 获取周报返回创建时间以及总结时间
    mapWeekReportDate() {
      this.$get(this.API.mapWeekReportDate, {
        yf: this.monthValue,
        zxh: this.weekValue,
        yhbh: this.ryValue,
        qygc: this.qyValue
      }).then(res => {
        if (!res.data) {
          this.maxminDate = {};
        } else {
          this.maxminDate = res.data;
        }
      });
    }
  },
  components: {
    layout,
    WeekLcbTable,
    MonthWeekQuestionTable,
    tableLayout,
    processTable,
    pzDialog,
    bjDialog,
    jdDialog,
    detailDialog,
    zdzjhDialog,
    lcbztSelect,
    weekReportFill
  }
};
</script>

<style scoped>
.month-plan-fc {
  margin: 10px 0;
}

.month-plan-card {
  width: 220px;
  height: 80px;
  line-height: 80px;
  background: #f8fafb;
  border-radius: 4px;
  padding: 0 15px;
}

.month-plan-card font {
  font-size: 14px;
  color: #9ea7b4;
}

.month-plan-card span {
  font-size: 18px;
  color: #464c5b;
  font-weight: 700;
}

.week-report-oprater {
  text-align: center;
  margin-top: 20px;
  padding: 14px 0;
  box-shadow: 0 -2px 12px 0 rgba(73, 80, 96, 0.08);
  background: #fff;
}
</style>
