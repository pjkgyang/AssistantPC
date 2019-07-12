<template>
  <div>
    <layout :title="'月度计划总览'">
      <header slot="header">
        <section style="padding:10px 0" v-if="isJzuser == 0">
          <div class="month-plan-explain">
            <p>每月3日24时系统会自动封存上月计划，封存后的计划作为考核依据，不能编辑，只能查看和批注；</p>
            <p>完工计划统计的毛收入完工量，验收计划统计的是合同额；</p>
          </div>
        </section>
        <section flex spacebetween>
          <div>
            <span>
              <el-date-picker @change="changeMonthDate" v-model="monthValue" format="yyyy年MM月" value-format="yyyy-MM" size="small" type="month" placeholder="选择月"></el-date-picker>
            </span>&#x3000;
            <span v-if="groupTag.indexOf('JYGL') != -1">
              <span class="filter-weight">区域:&nbsp;</span>
              <el-select v-model="qyValue" size="small" placeholder="请选择" @change="handleSelectQy">
                <el-option v-for="item in gczdList" :key="item.id" :label="item.text" :value="item.id"></el-option>
              </el-select>
            </span>
            <span>
              <span class="filter-weight">项目:&nbsp;</span>
              <el-select style="width:300px" v-model="itemValue" clearable filterable remote :remote-method="remoteMethod" @change="changeProject" placeholder="请选择/搜索项目名称/项目编号" size="small">
                <el-option v-for="item in itemList" :key="item.xmbh" :label="'['+item.xmbh+'] '+item.xmmc" :value="item.xmmc"></el-option>
              </el-select>
            </span>
          </div>
          <!-- 2018-9-25 修改 !isBlocked &&-->
          <div>
            <el-button type="primary" size="mini" @click="exportMonth">导出</el-button>
            <el-button v-if="otherShow &&  groupTag.indexOf('QYZ') != -1" size="small" type="danger" @click="handleClickYdjh">制订月度计划</el-button>
          </div>
        </section>
      </header>
      <article slot="content" style="position:relative">
        <tableLayout :title="'月度工作'+textTitle">
          <div></div>
          <div slot="bottom">
            <section class="month-plan-condition month-hwys">
              <div flex colcenter>
                <section v-if="isJzuser != 1">
                  <span class="filter-weight">( 合计完工:
                    <span style="color:#f00">{{workTotal.hjwg}}</span>
                  </span>&#x3000;
                  <span class="filter-weight">合计验收:
                    <span style="color:#f00">{{workTotal.hjys}}</span>
                  </span>&#x3000;
                  <span class="filter-weight">合计完工率:
                    <span style="color:#f00">{{workTotal.hjwgl}}</span>
                  </span>&#x3000;
                  <span class="filter-weight">合计验收率:
                    <span style="color:#f00">{{workTotal.hjysl}}</span> )</span>
                </section>&#x3000;
                <span class="colcenter">
                  <span class="filter-weight">计划类别:&nbsp;</span>
                  <el-select style="width:200px" v-model="ztValue" size="mini" placeholder="请选择" @change="handleSelectZt">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </span>&#x3000;
              </div>
            </section>
            <section class="month-plan-condition" flex spacebetween>
              <el-button :disabled="!multipleSelection.length" size="mini" @click="handlePzofBatch">批量批注</el-button>
            </section>
            <MonthTable :tableData="monthWorkList" :otherShow="otherShow && isJzuser != 1" :ispz="true" :isEdit="false" @handleClickPz="handleYdjhPz" @handleClickEdit="handleYdjhEdit" @handleCurrentChange="handleYdjhChange" @handleSizeChange="handleSizeChange" @handleClickCheck="handleYdjhCheck" @handleSelectionChange="handleSelectionChange" :isSelect="true" :pageSize="workPageSize" :records="records" :currentPage="currentPage"></MonthTable>
          </div>
        </tableLayout>
        <tableLayout :title="'月度问题处理'+textTitle">
          <div slot="bottom">
            <div style="margin:12px 0">
              <el-button :disabled="!multipleSelectionWt.length" size="mini" @click="handlePzofBatchWt">批量批注</el-button>
            </div>
            <MonthWeekQuestionTable :tableData="monthQuestionList" @handleClickPz="handleQuestionPz" @handleClickEdit="handleQuestionEdit" @handleClickCheck="handleQuestionCheck" @handleSizeChange="handleSizeWtChange" @handleSelectionChange="handleSelectWtChange" @handleCurrentChange="handleQuestionPageChange" :isSelect="true" :ideleteShow="!isBlocked" :othShow="otherShow" :isEdit="!isBlocked && groupTag.indexOf('JYGL') == -1" :pageSize="questionPageSize" :records="QuestionRecords" :currentPage="questionPage"></MonthWeekQuestionTable>
          </div>
        </tableLayout>
      </article>
    </layout>

    <bjDialog :isShow='isShow' :isCljh="true" :show.sync='bjShow' @handleClickSure="handleClickBjSure"></bjDialog>
    <pzDialog :pzlbShow="pzlsShow" :tableData="pzList" :show.sync='pzShow' @handleClickSure="handleClickPzSure"></pzDialog>
    <detailDialog :show.sync="detailShow" :title="detailTitle" :detailType="detailType"></detailDialog>
    <zdzjhDialog :show.sync='jhzdShow' :title="'月度计划制订'">
      <div slot="content">
        <monthReportFill @handleFormulate="handleFormulate" :jhzdShow="jhzdShow" :dateParam="monthValue"></monthReportFill>
      </div>
    </zdzjhDialog>
  </div>
</template>

<script>
import { getMenu, getSession } from "@/utils/util.js";
import layout from "@/components/layout/MonthWeekLayout.vue";
import MonthTable from "@/components/BusinessPage/MonthWeekTable.vue";
import MonthWeekQuestionTable from "@/components/BusinessPage/MonthWeekQuestionTable.vue";
import tableLayout from "@/components/layout/tableLayout.vue";
import bjDialog from "@/components/dialog/bj-dialog.vue";
import pzDialog from "@/components/dialog/pz-dialog.vue";
import zdzjhDialog from "@/components/dialog/zdjh-dialog.vue";
import monthReportFill from "@/views/BusinessPage/weekMonthReport/monthReport-write.vue";
import detailDialog from "@/components/dialog/detail-dialog.vue";

import { getProjects } from "@/api/xmkb.js";
import lcbztSelect from "@/components/monthReport/lcbzt-select.vue";
import {
  pageMonthWork,
  saveMonthWork,
  pageMonthQuestion,
  getMonthQuestion,
  saveMonthQuestion,
  listComments,
  addComment,
  countMonthWorkWglg,
  refreshMonthWork,
  isMonthPlanBlocked,
  batchUpdateMonthQuestion,
  batchUpdateMonthWork,
  listMonthPlanQygc
} from "@/api/weekMonthReport.js";

const wzdContent =
  "<h5 style='font-weight:700'>本月计划尚未制定，<span style='color:#f00'>请制定本月计划。</span></h5>";
const wfcContent =
  "<h5 style='font-weight:700'>本月计划已制订，尚未封存，<span style='color:#f00'>请填写未完成原因和后续措施。</span></h5>";
const yfcContent =
  "<h5 style='font-weight:700'>本月计划 <span style='color:#f00'>已制定，已封存。</span></h5>";
export default {
  data() {
    return {
      keyword: "",
      Wtkeyword: "",
      isShow: false,
      pzlsShow: true,
      isPlanPz: false,
      isPlanEdit: false,
      jhzdShow: false,
      detailShow: false, //详情弹窗
      detailTitle: "",
      detailType: {},
      breadList: [
        { title: "月度计划总览", url: "/businesspage/monthReport" },
        { title: "", url: "" }
      ],
      monthWorkList: [],
      monthQuestionList: [],
      monthValue: "",
      gczdList: [],
      options: [
        { value: "0", label: "完工计划" },
        { value: "1", label: "验收计划" }
      ],
      wtztList: [
        { value: "", label: "全部" },
        { value: "0", label: "处理中" },
        { value: "2", label: "已申请关闭" },
        { value: "1", label: "已关闭" }
      ],
      ycztList: [
        { value: "", label: "全部" },
        { value: "0", label: "超期" },
        { value: "1", label: "未超期" }
      ],
      ycztValue: "",
      wtztValue: "",
      qyValue: "",
      ztValue: "",
      workPageSize: 10,
      questionPageSize: 10,
      records: 0,
      QuestionRecords: 0,
      questionPage: 1,
      currentPage: 1,
      bjShow: false,
      pzShow: false,
      pzList: [],
      planType: "",
      Wid: "",
      lcbbh: "",
      index: null,
      wtWid: "",
      workTotal: "",
      isBlocked: false,
      lcbztList: [1,2,3,4,6,7,9],
      multipleSelection: [],
      multipleSelectionWt: [],
      groupTag: "",
      isJzuser: "",
      itemList: [],
      itemValue: "", //项目筛选,
      textTitle: "总览",
      otherShow: true
    };
  },
  beforeMount() {},
  mounted() {
    this.isJzuser = sessionStorage.isJZuser;
    this.groupTag = JSON.parse(sessionStorage.getItem("userInfo")).userGroupTag;
    this.monthValue =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1);
    this.listMonthPlanQygc();
    this.countMonthWorkWglg();
    this.isMonthPlanBlocked(this.monthValue);
  },
  activated() {
    this.getMonthWorkList(1); // 月工作计划
    this.getMonthQuestionList(1); // 月问题计划
    this.currentPage = 1;
    this.questionPage = 1;
  },
  methods: {
    exportMonth() {
      window.open(
        window.baseurl +
          "plan/exportMonthPlan.do?qygc=" +
          this.qyValue +
          "&month=" +
          this.monthValue
      );
    },
    changeProject(val) {
      this.getMonthWorkList(1); // 月工作计划
      this.getMonthQuestionList(1); // 月问题计划
    },
    remoteMethod(val) {
      //远程搜索
      this.itemValue = val;
      this.getProjects();
    },
    handleFormulate() {
      // 制订成功
      this.jhzdShow = false;
      this.getMonthWorkList(1); // 月工作计划
      this.getMonthQuestionList(1); // 月问题计划
      this.currentPage = 1;
      this.questionPage = 1;
    },
    handleEnterWtSearch() {
      // 月问题查询
      this.getMonthQuestionList(1); // 月问题计划
      this.questionPage = 1;
    },
    handleEnterSearch() {
      this.getMonthWorkList(1); // 月工作计划
      this.currentPage = 1;
    },
    handleChangeLcbzt(val) {
      // 选择里程碑状态
      this.lcbztList = val;
      this.getMonthWorkList(1); // 月工作计划
      this.currentPage = 1;
    },
    handlePzofBatch() {
      // 批注（批量）计划
      this.Wid = "";
      this.planType = 1;
      this.isPlanPz = true;
      this.pzlsShow = false;
      this.pzShow = true;
    },
    handleEditofBatch() {
      // 编辑（批量）计划
      this.Wid = "";
      this.planType = 1;
      this.isPlanEdit = true;
      this.bjShow = true;
    },
    handlePzofBatchWt() {
      // 批注（批量）问题
      this.Wid = "";
      this.planType = 2;
      this.isPlanPz = false;
      this.pzlsShow = false;
      this.pzShow = true;
    },
    handleEditofBatchWt() {
      // 编辑（批量）问题
      this.Wid = "";
      this.planType = 2;
      this.isPlanEdit = false;
      this.bjShow = true;
    },
    handleClickYdjh() {
      // 指定月度计划
      this.jhzdShow = true;
    },
    changeMonthDate(val) {
      // 月日期
      if (new Date(this.monthValue).getTime() > new Date().getTime()) {
        this.textTitle = "计划";
        this.otherShow = false;
      } else {
        this.textTitle = "总览";
        this.otherShow = true;
      }
      this.listMonthPlanQygc();
      this.isMonthPlanBlocked(val); //是否封存
      this.getMonthWorkList(1);
      this.getMonthQuestionList(1); // 月问题计划
      this.countMonthWorkWglg(); // 合计
      this.currentPage = 1;
      this.questionPage = 1;
    },
    handleSelectQy(val) {
      // 区域
      this.getMonthWorkList(1);
      this.getMonthQuestionList(1); // 月问题计划
      this.countMonthWorkWglg(); // 合计
      this.currentPage = 1;
      this.questionPage = 1;
    },
    handleSelectZt(val) {
      // 状态
      this.getMonthWorkList(1);
      this.countMonthWorkWglg(); // 合计
      this.currentPage = 1;
    },
    handleYdjhChange(data) {
      // 月工作计划 分页
      this.currentPage = data;
      this.getMonthWorkList(data);
    },
    //    ********************

    handleYdjhPz(data) {
      // (计划)批注
      this.pzlsShow = true;
      this.pzShow = true;
      this.planType = 1;
      this.Wid = data.ygzWid;
      this.getListComments(data.ygzWid);
    },
    handleYdjhEdit(data, index) {
      // (计划)编辑
      this.index = index;
      this.planType = 1;
      this.Wid = data.ygzWid;
      this.lcbbh = data.lcbbh;
      this.bjShow = true;
    },
    handleYdjhCheck(data) {
      // (计划)查看
      this.detailTitle = "里程碑工作详情";
      this.detailType.type = "ybzlLcb";
      this.detailType.wid = data.ygzWid;
      this.detailType.planType = 1;
      this.detailShow = true;
    },
    handleSelectionChange(data) {
      // 多选 里程碑状态
      this.multipleSelection = data;
    },
    handleSelectWtChange(data) {
      // 多选 问题
      this.multipleSelectionWt = data;
    },
    handleSizeChange(data) {
      // 每页条数 计划
      this.workPageSize = data;
      this.getMonthWorkList(1);
    },
    handleSizeWtChange(data) {
      // 每页条数 问题
      this.questionPageSize = data;
      this.getMonthQuestionList(1);
      this.questionPage = 1;
    },
    // ************  问题
    handleSelectWtzt() {
      // 问题状态 筛选
      this.getMonthQuestionList(1);
      this.questionPage = 1;
    },
    handleSelectYczt() {
      // 问题状态 筛选
      this.getMonthQuestionList(1);
      this.questionPage = 1;
    },
    handleQuestionPageChange(data) {
      // 分页
      this.questionPage = data;
      this.getMonthQuestionList(data); // 月问题计划
    },
    handleQuestionCheck(data) {
      // ( 问题 )查看
      this.detailTitle = "问题处理详情";
      this.detailType.type = "ybzlWt";
      this.detailType.wid = data.ywtWid;
      this.detailType.planType = 2;
      this.detailShow = true;
    },
    handleQuestionPz(data) {
      // ( 问题 )批注
      this.planType = 2;
      this.Wid = data.ywtWid;
      this.pzShow = true;
      this.pzlsShow = true;
      this.getListComments(data.ywtWid);
    },
    handleQuestionEdit(data, index) {
      // ( 问题 )编辑
      this.index = index;
      this.planType = 2;
      this.Wid = data.ywtWid;
      this.wtWid = data.wtwid;
      this.bjShow = true;
    },

    handleClickBjSure(data) {
      // 编辑(确定)
      if (this.planType == 1 && this.Wid) {
        this.saveMonthWork(data.wwcyy, data.hxcs);
      } else if (this.planType == 2 && this.Wid) {
        this.saveMonthQuestion(data.wwcyy, data.hxcs);
      }
      if (this.isPlanEdit) {
        batchUpdateMonthWork({
          // 批量编辑 工作计划
          ygzwids: this.multipleSelection.join(","),
          wwcyy: data.wwcyy,
          hxcs: data.hxcs
        }).then(({ data }) => {
          if (data.state == "success") {
            this.bjShow = false;
            this.getMonthWorkList(this.currentPage); // 月工作计划
            this.$alert("保存成功！", "提示", {
              confirmButtonText: "确定",
              type: "success"
            });
          }
        });
      } else {
        batchUpdateMonthQuestion({
          // 批量编辑 工作计划
          ywtwids: this.multipleSelectionWt.join(","),
          wwcyy: data.wwcyy,
          hxcs: data.hxcs
        }).then(({ data }) => {
          if (data.state == "success") {
            this.getMonthQuestionList(this.questionPage); // 问题计划
            this.$alert("保存成功！", "提示", {
              confirmButtonText: "确定",
              type: "success"
            });
          }
        });
      }
    },

    handleClickPzSure(data) {
      // 批注(确定)
      if (this.isPlanPz) {
        this.addComment(
          data,
          this.Wid ? this.Wid : this.multipleSelection.join(",")
        );
      } else {
        this.addComment(
          data,
          this.Wid ? this.Wid : this.multipleSelectionWt.join(",")
        );
      }
    },
		
		//获取月工作计划列表
    getMonthWorkList(curPage) {
      pageMonthWork({
        curPage: curPage,
        pageSize: this.workPageSize,
        qygc: this.qyValue,
        month: this.monthValue,
        planType: this.ztValue,
        keyword: this.itemValue,
        zts: this.lcbztList.join(",")
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data.rows.length) {
            this.monthWorkList = data.data.rows;
            this.records = data.data.records;
          } else {
            // if(this.groupTag.indexOf('QYZ') != -1){
            //      this.ToastMessage(wzdContent);
            // }
            this.monthWorkList = [];
            this.records = 0;
          }
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    getMonthQuestionList(curPage) {
      //获取月问题计划列表
      pageMonthQuestion({
        curPage: curPage,
        pageSize: this.questionPageSize,
        qygc: this.qyValue,
        month: this.monthValue,
        wtzt: 0,
        yczt: this.ycztValue,
        keyword: this.itemValue
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data.rows.length && data.data) {
            this.monthQuestionList = data.data.rows;
            this.QuestionRecords = data.data.records;
          } else {
            this.monthQuestionList = [];
            this.QuestionRecords = 0;
          }
        }
      });
    },
    getListComments(oid) {
      // 获取批注列表
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
    addComment(comment, oids) {
      //保存批注
      addComment({
        comment: comment,
        oids: oids,
        planType: this.planType
      }).then(({ data }) => {
        if (data.state == "success") {
          if (this.pzlsShow) {
            this.getListComments(oids, this.planType);
          }
          this.pzShow = false;
          this.$alert("批注成功！", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              if (this.planType == 1) {
                this.getMonthWorkList(this.currentPage); // 月工作计划
              } else if (this.planType == 2) {
                this.getMonthQuestionList(this.questionPage); // 月问题计划
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
    countMonthWorkWglg() {
      // 获取月工作计划合计
      countMonthWorkWglg({
        qygc: this.qyValue,
        month: this.monthValue,
        planType: this.ztValue
      }).then(({ data }) => {
        if (data.state == "success") {
          this.workTotal = data.data;
        }
      });
    },
    saveMonthWork(wwcyy, hxcs) {
      // 保存月工作计划
      saveMonthWork({
        wid: this.Wid,
        qygc: this.qyValue,
        yf: this.monthValue,
        lcbbh: this.lcbbh,
        wwcyy: wwcyy,
        hxcs: hxcs
      }).then(({ data }) => {
        if (data.state == "success") {
          this.bjShow = false;
          this.monthWorkList[this.index].wwcyy = wwcyy;
          this.monthWorkList[this.index].hxcs = hxcs;
          this.$alert("保存成功！", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
        }
      });
    },
    saveMonthQuestion(wwcyy, hxcs) {
      // 保存月问题
      saveMonthQuestion({
        wid: this.Wid,
        qygc: this.qyValue,
        yf: this.monthValue,
        wtWid: this.wtWid,
        wwcyy: wwcyy,
        hxcs: hxcs,
        cljh: ""
      }).then(({ data }) => {
        if (data.state == "success") {
          this.bjShow = false;
          this.monthQuestionList[this.index].wwcyy = wwcyy;
          this.monthQuestionList[this.index].hxcs = hxcs;
          this.$alert("保存成功！", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
        }
      });
    },
    isMonthPlanBlocked(month) {
      // 是否封存
      isMonthPlanBlocked({
        month: month
      }).then(({ data }) => {
        if (data.state == "success") {
          this.isBlocked = data.data;
          let _this = this;
          // setTimeout(function(){
          //     if(_this.groupTag.indexOf('QYZ') != -1 && _this.monthWorkList.length && !data.data){
          //         _this.ToastMessage(wfcContent);
          //     }else if(_this.groupTag.indexOf('QYZ') != -1 && _this.monthWorkList.length  && data.data){
          //         _this.ToastMessage(yfcContent);
          //     }
          // },1000)
        }
      });
    },
    getProjects() {
      // 获取所有项目
      getProjects({
        curPage: 1,
        pageSize: 12,
        keyword: this.itemValue,
        xmzt: "1,2,3",
        xmlb: "",
        sfgx: "",
        pl: "",
        isAll: ""
      }).then(({ data }) => {
        if (data.state == "success") {
          this.itemList = data.data.rows;
        }
      });
    },
    listMonthPlanQygc() {
      this.gczdList = [];
      listMonthPlanQygc({
        month: this.monthValue
      }).then(({ data }) => {
        if (data.state == "success") {
          this.gczdList = data.data;
          this.gczdList.unshift({ id: "", text: "全部" });
          this.qyValue = "";
        }
      });
    },
    ToastMessage(content) {
      this.$message.closeAll();
      this.$message({
        dangerouslyUseHTMLString: true,
        showClose: true,
        duration: 10000,
        message: "警告哦，这是一条警告消息",
        type: "warning",
        message: content
      });
    }
  },
  components: {
    layout,
    MonthTable,
    tableLayout,
    MonthWeekQuestionTable,
    bjDialog,
    pzDialog,
    lcbztSelect,
    zdzjhDialog,
    monthReportFill,
    detailDialog
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
  margin-right: 15px;
  position: relative;
  overflow: hidden;
}

.month-plan-card span {
  font-size: 18px;
  color: #464c5b;
  font-weight: 700;
}
.cornerMark {
  width: 100px;
  height: 35px;
  position: absolute;
  top: 4px;
  right: -47px;
  transform: rotate(45deg);
  line-height: 0;
  text-align: center;
  padding: 26px 22px 0 0;
  font-size: 12px;
}
.cornerMark-wfc {
  background: rgba(25, 190, 107, 0.1);
  color: #19be6b;
}
.cornerMark-yfc {
  background: rgba(255, 101, 94, 0.1);
  color: #ff655e;
}
.month-plan-condition {
  margin: 12px 0;
  justify-content: space-between;
}
.month-plan-condition .filter-weight {
  min-width: 70px;
}
.month-hwys {
  position: absolute;
  top: -17px;
  left: 110px;
}
</style>

