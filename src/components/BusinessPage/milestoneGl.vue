<template>
  <div class="milestone-manage">
    <section style="border-radius:5px;padding:8px 0;background:#fff;box-shadow:0 0 5px #ccc">
      <div class="filter">
        <span class="filter-title">高级查询: </span>
        <el-input size="mini" style="width:50%" placeholder="请输入项目内容/里程碑描述" suffix-icon="el-icon-search" v-model="keyword" @change="searchLcbContent"> </el-input>
        &#x3000;
        <el-button size="mini" type="primary" @click="handleSearchLcb">查询</el-button>
      </div>
      <div style="display:flex" class="filter">
        <span class="filter-title">里程碑状态:</span>
        <el-checkbox-group v-model="checkList" @change="handleCheckbox">
          <el-checkbox label="1">计划中</el-checkbox>
          <el-checkbox label="2">处理中</el-checkbox>
          <el-checkbox label="3">已完成</el-checkbox>
          <el-checkbox label="4">停滞</el-checkbox>
          <el-checkbox label="5">关闭</el-checkbox>
          <el-checkbox label="6">取消</el-checkbox>
          <el-checkbox label="7">待定</el-checkbox>
          <el-checkbox label="9">完成待确认</el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="display:flex" class="filter">
        <span class="filter-title">项目类别:</span>
        <el-checkbox-group v-model="xmlbList" @change="handleXMlb">
          <el-checkbox label="软件">软件</el-checkbox>
          <el-checkbox label="集成">集成</el-checkbox>
          <el-checkbox label="软件服务">软件服务</el-checkbox>
          <el-checkbox label="集成服务">集成服务</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="filter">
        <span class="filter-title">承诺结束时间:</span>
        <el-date-picker v-model="cnkssj" type="date" size="mini" placeholder="开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeCnStartDate">
        </el-date-picker>
        &nbsp;至&nbsp;
        <el-date-picker v-model="cnjssj" type="date" size="mini" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeCnEndDate">
        </el-date-picker>
      </div>
      <div class="filter">
        <span class="filter-title">实际结束时间:</span>
        <el-date-picker v-model="sjkssj" type="date" size="mini" placeholder="开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeSjStartDate">
        </el-date-picker>
        &nbsp;至&nbsp;
        <el-date-picker v-model="sjjssj" type="date" size="mini" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeSjEndDate">
        </el-date-picker>
      </div>
    </section>
    <section class="milestone_tabel">
      <div style="padding:0 10px 10px;">
        <p style="margin:10px 0 !important;">
          <el-button size="mini" type="success" @click="commitLcb" v-if="ishow">提报里程碑</el-button>
          <el-button size="mini" type="primary" @click="exportLcb" v-if="ishow">导出客户签字项目计划</el-button>
          <el-button size="mini" type="primary" @click="handleChangeZrr" v-if="zrrShow">变更责任人</el-button>
          <el-button size="mini" type="primary" @click="handleAddbw">添加备忘</el-button>
          <span style="float:right;margin-top:5px" v-if="ishow">
            <span class="filter-weight">合计完工量 : </span>
            <span style="color:#f00;font-size:18px">{{totalWgl
              <10000?totalWgl:totalWgl<100000000?(totalWgl/10000).toFixed(4):(totalWgl/100000000).toFixed(4)}} </span>{{totalWgl
                <10000? '元':totalWgl<100000000? '万元': '亿'}}</span>
                  <p style="color:#aaa;font-size:12px;" v-if="ishow">说明：整体里程碑不允许调整计划，里程碑调整需要工程总确认后才生效。</p>
        </p>
        <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column type="selection" max-width="80" :selectable='checkboxInit' v-if="ishow"></el-table-column>
          <el-table-column prop="xmnr_display" min-width="160" label="项目内容" show-overflow-tooltip></el-table-column>
          <el-table-column  min-width="180" style="text-align:left" label="里程碑描述" show-overflow-tooltip>
             <template slot-scope="scope">
              <div class="name-wrapper">
                <a v-if="scope.row.xmnr_display == '项目备忘'" href="javaScript:;;" @click="handleCheckList(scope.row)">{{scope.row.lcbms_display}}</a>
                <span v-else>{{scope.row.lcbms_display}}</span>
              </div>
            </template>
           </el-table-column>
          <el-table-column prop="nrxmlb" min-width="90" label="项目类别" show-overflow-tooltip></el-table-column>
          <el-table-column sortable label="里程碑状态" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="small" title="点击查看操作详情" type='success' v-if="scope.row.zt == '关闭'" @click.native="handleCheckRrecord(scope.row)">{{ scope.row.zt }}</el-tag>
                <el-tag size="small" title="点击查看操作详情" type='danger' v-if="scope.row.zt != '关闭'" @click.native="handleCheckRrecord(scope.row)">{{ scope.row.zt }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="wglv" label="完工率(%)" width="100" show-overflow-tooltip v-if="ishow"> </el-table-column>
          <el-table-column prop="wglg" label="完工量(元)" width="100" v-if="ishow"> </el-table-column>
          <el-table-column prop="cnjssj" sortable label="承诺结束时间" width="150"> </el-table-column>
          <el-table-column prop="sjjssj" sortable label="实际结束时间" width="150"> </el-table-column>
          <el-table-column prop="zzrxm" label="责任人" width="100"> </el-table-column>
        </el-table>
      </div>
      <div style="padding:5px 0;text-align:right">
        <pagination v-if="total > 12" :currentPage="currentPage" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"></pagination>
      </div>
    </section>

    <el-dialog title="调整计划" :visible.sync="planVisible" :close-on-click-modal="false" width="600px">
      <span style="color:#aaa;font-size:12px;padding-left:20px">说明：整体里程碑不允许调整计划，里程碑调整需要工程总确认后才生效。</span>
      <el-form ref="form" :model="form" label-width="120px" style="padding:10px 20px 10px 0">
        <el-form-item label="承诺开始日期">
          <el-date-picker v-model="form.startDate" type="date" size="small" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="承诺结束日期">
          <el-date-picker v-model="form.endDate" type="date" size="small" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" v-model="form.sm" resize="none" :rows="5"></el-input>
        </el-form-item>
        <div style="text-align:right">
          <el-button type="primary" size="small" @click="handleCommit">提交</el-button>
          <el-button type="info" size="small" @click="handleClose">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog title="提报里程碑" :close-on-click-modal="false" :visible.sync="milestoneVisible" width="600px" top="50px">
      <commitMilestone :shown="milestoneVisible" @handleCommitMilestone="handleCommitMilestone" :xmbh="xmbh" :taskLcbbhArr="lcbbhArr"
      @handleClose="handleCloseMile"></commitMilestone>
    </el-dialog>


    <lcbjlDialog :show.sync="lcbjlShow" :lcbbh="lcbbh"></lcbjlDialog>
    <cpListDialog :show.sync="cplistShow" :xmbh="xmbh"></cpListDialog>
    <xmbw-dialog :show.sync="xmbwShow" :xmbh="xmbh" @handleCommitXmbw="handleCommitXmbw"></xmbw-dialog>
    <cplistDialog :show.sync="cpShow" :tableData="cplistData"></cplistDialog>
  </div>
</template>
<script>
import {
  queryMilestoneData,
  submitMilestone,
  ModifyMilestoneCommitmentDate,
  getMilestoneSubmitType
} from "@/api/milestone.js";
import pagination from "@/components/BusinessPage/pagination.vue";
import commitMilestone from "@/components/BusinessPage/commitMilestone.vue";
import { returnFloat } from "../../utils/util.js";
import lcbjlDialog from "@/components/dialog/lcbjl-dialog.vue";
import cpListDialog from "@/components/dialog/cpList-dialog.vue";
import xmbwDialog from "@/components/dialog/milestone/xmbw-dialog.vue";
import cplistDialog from '@/components/dialog/milestone/cplist-dialog.vue'
export default {
  data() {
    return {
      lcbjlShow: false,
      cplistShow: false,
      cpShow:false,
      xmbwShow: false,
      lcbbh: "",
      checkList: [],
      xmlbList: [],
      keyword: "",
      cnkssj: "",
      cnjssj: "",
      sjkssj: "",
      sjjssj: "",
      total: null,
      pageSize: 12,
      currentPage: 1,
      tableData3: [],
      totalWgl: "",
      multipleSelection: [],
      planVisible: false,
      milestoneVisible: false,
      ishownTZJH: true,
      form: {
        startDate: "",
        endDate: "",
        sm: ""
      },
      lcbbhArr: [],
      groupTag: "",
      ishow: true,
      zrrShow: true,

      cplistData:[]
    };
  },
  props: {
    xmbh: {
      type: String,
      default: ""
    },
    xmjl: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleCloseMile(){
      this.milestoneVisible = false;
    },
    handleCheckList(data){
      this.$get(this.API.listMemoProduct,{
        lcbbh:data.lcbbh 
      }).then(res=>{
        if(res.state == 'success'){
          this.cplistData = res.data
        }else{
         this.$alert(res.msg, "提示", {confirmButtonText: "确定",e: "error"}); 
        }
      })
      this.cpShow = !this.cpShow  
    },
    // 查看里程碑操作记录
    handleCheckRrecord(data) {
      this.lcbbh = data.lcbbh;
      this.lcbjlShow = !this.lcbjlShow;
    },
    handleCommitMilestone() {
      this.milestoneVisible = false;
      this.queryMilestoneData(this.currentPage);
    },
    // 项目备忘
    handleCommitXmbw(params,data) {
      if(!data) return;
      this.$post(this.API.addMemo, {
        xmbh: this.xmbh,
        bwcnwcsj: params.cnwcrq,
        sm:params.sm,
        cps:params.cps     
      }).then(res => {
        if (res.state == "success") {
          this.$alert("添加成功", "提示", { confirmButtonText: "确定",type: "success"});
          this.xmbwShow = false;
        } else {
          if (res.errcode == 1) {
            this.$confirm("备忘已存在，是否覆盖?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }) .then(() => {
              this.$post(this.API.addMemo, {
                xmbh: this.xmbh,
                // fj: params.fileList,
                bwcnwcsj: params.cnwcrq,
                sffg:1,
                cps:cps
              }).then(res => {
                  if (res.state == "success") {
                    this.$alert("添加成功", "提示", { confirmButtonText: "确定",type: "success"});
                    this.xmbwShow = false;
                  }else{
                    this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"}); 
                    this.xmbwShow = false;
                  }
                })
              }) .catch(() => {
                this.xmbwShow = false;
              });
          }else{
             this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"}); 
             this.xmbwShow = false;
          }
        }
      });
    },
    checkboxInit(row, index) {
      if (row.zt != "计划中" && row.zt != "处理中")
        // && row.zt != '处理中'
        return 0;
      else return 1;
    },
    handleClose() {
      //取消
      this.planVisible = false;
    },

    handleCommit() {
      //提交
      ModifyMilestoneCommitmentDate({
        xmbh: this.xmbh,
        lcbbh: this.lcbbhArr.join(","),
        startDate: this.form.startDate,
        endDate: this.form.endDate,
        sm: this.form.sm
      }).then(({ data }) => {
        if (data.state == "success") {
          this.planVisible = !this.planVisible;
          this.$alert("修改成功", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.form.sm = "";
              this.queryMilestoneData(1);
            }
          });
        }
      });
    },
    // 提报里程碑
    commitLcb() {
      if (this.multipleSelection.length == 0) {
        this.$alert("请选择里程碑", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      } else {
        getMilestoneSubmitType({
          lcbbh: this.lcbbhArr.join(",")
        }).then(({ data }) => {
          if (data.state == "success") {
            if (data.data.lcbType == -1) {
              this.$alert("不允许同时提交多个项目的整体验收里程碑！", "提示", {
                confirmButtonText: "确定",
                type: "warning"
              });
            } else {
              this.milestoneVisible = !this.milestoneVisible;
            }
          }
        });
      }
    },
    // 变更责任人
    handleChangeZrr() {
      this.cplistShow = !this.cplistShow;
    },
    handleAddbw() {
      this.xmbwShow = !this.xmbwShow;
    },
    exportLcb() {
      this.cnkssj = !this.cnkssj ? "" : this.cnkssj;
      this.cnjssj = !this.cnjssj ? "" : this.cnjssj;
      this.sjkssj = !this.sjkssj ? "" : this.sjkssj;
      this.sjjssj = !this.sjjssj ? "" : this.sjjssj;
      window.open(
        window.baseurl +
          "milestone/exportMilestoneData.do?xmbh=" +
          this.xmbh +
          "&keyword=" +
          this.keyword +
          "&zt=" +
          this.checkList.join(",") +
          "&startCnjssj=" +
          this.cnkssj +
          "&endCnjssj=" +
          this.cnjssj +
          "&startSjjssj=" +
          this.sjkssj +
          "&endSjjssj=" +
          this.sjjssj +
          "&nrxmlb=" +
          this.xmlbList.join(",")
      );
    },
    // 调整计划
    //   adjustmentPlan(){
    //       if(this.multipleSelection.length == 0){
    //           this.$alert('请选择里程碑', '提示', {
    //              confirmButtonText: '确定',
    //              type:'warning',
    //           });
    //         return;
    //       }
    //       this.planVisible = !this.planVisible
    //   },
    handleSearchLcb() {
      //查询里程碑
      this.queryMilestoneData(1);
    },
    searchLcbContent() {
      //支持回车
      this.queryMilestoneData(1);
    },
    handleCurrentChange(data) {
      // 切换分页
      this.queryMilestoneData(data);
      this.currentPage = data;
    },

    handleCheckbox(val) {
      //选择里程碑状态
      this.queryMilestoneData(1);
    },
    handleXMlb(val) {
      //查询项目类别
      this.queryMilestoneData(1);
    },
    changeCnStartDate() {
      //承诺开始时间
      this.queryMilestoneData(1);
    },
    changeCnEndDate() {
      //承诺结束时间
      this.queryMilestoneData(1);
    },
    changeSjStartDate() {
      //实际开始时间
      this.queryMilestoneData(1);
    },
    changeSjEndDate() {
      //实际结束时间
      this.queryMilestoneData(1);
    },
    //   全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.lcbbhArr = [];
      if (this.multipleSelection.length != 0) {
        this.multipleSelection.forEach((ele, i, arr) => {
          if (ele.lcbms.includes("整体验收")) {
            this.ishownTZJH = false;
          } else {
            this.ishownTZJH = true;
          }
          this.lcbbhArr.push(ele.lcbbh);
        });
      } else {
        this.ishownTZJH = true;
      }
    },
    // 获取里程碑信息
    queryMilestoneData(curPage) {
      queryMilestoneData({
        curPage: curPage,
        pageSize: this.pageSize,
        xmbh: this.xmbh,
        keyword: this.keyword,
        zt: this.checkList.length == 0 ? "" : this.checkList.join(","),
        startCnjssj: !this.cnkssj ? "" : this.cnkssj,
        endCnjssj: !this.cnjssj ? "" : this.cnjssj,
        startSjjssj: !this.sjkssj ? "" : this.sjkssj,
        endSjjssj: !this.sjjssj ? "" : this.sjjssj,
        nrxmlb: this.xmlbList.length == 0 ? "" : this.xmlbList.join(",")
      }).then(({ data }) => {
        if (data.state == "success") {
          this.totalWgl = data.data.totalWgl;
          let milestone = data.data.data.rows;
          milestone.forEach((val, index, arr) => {
            arr[index].wglv = returnFloat(val.wglv);
            arr[index].wglg = returnFloat(val.wglg);
            val.zt =
              val.zt == "1"
                ? "计划中"
                : val.zt == "2"
                  ? "处理中"
                  : val.zt == "3"
                    ? "已完成"
                    : val.zt == "4"
                      ? "停滞"
                      : val.zt == "5"
                        ? "关闭"
                        : val.zt == "6"
                          ? "取消"
                          : val.zt == "7" ? "待定" : "完成待确认";
          });
          this.tableData3 = milestone;
          this.total = data.data.data.records;
        }
      });
    }
  },
  mounted() {
    this.groupTag = JSON.parse(sessionStorage.userInfo).userGroupTag;
    if (this.groupTag.indexOf("JZGCRY") != -1) {
      this.ishow = true;
    } else {
      this.ishow = false;
    }
    if (
      this.groupTag.indexOf("JYGL") != -1 ||
      this.groupTag.indexOf("QYZ") != -1 ||
      this.groupTag.indexOf("ZDDZ") != -1 ||
      this.xmjl == sessionStorage.username
    ) {
      this.zrrShow = true;
    } else {
      this.zrrShow = false;
    }
    this.queryMilestoneData(1);
  },
  components: {
    pagination,
    commitMilestone,
    lcbjlDialog,
    cpListDialog,
    xmbwDialog,
    cplistDialog
  }
};
</script>
<style scoped>
.milestone-manage {
  width: 90%;
  margin: 0 auto;
  padding: 8px 0 0 0;
}
.filter {
  margin-bottom: 15px;
}
.filter-title {
  display: inline-block;
  width: 100px;
  text-align: right;
  font-weight: 700;
  margin-right: 10px;
}
.milestone_tabel {
  margin: 10px 0;
  border-radius: 5px;
  padding-top: 3px;
  background: #fff;
  box-shadow: 0 0 5px #ccc;
}
.name-wrapper .el-tag:hover {
  cursor: pointer;
}
</style>
