<template>
  <div class="milestone-manage">
       <section style="border-radius:5px;padding:8px 0;background:#fff;box-shadow:0 0 5px #ccc">     
            <div class="filter">
              <span class="filter-title">高级查询: </span><el-input size="small" style="width:50%" placeholder="请输入项目编号/项目名称/里程碑描述/项目内容/项目经理/责任人"  suffix-icon="el-icon-search" v-model="keyword" @change="searchLcbContent"> </el-input>
              &#x3000;<el-button size="mini" type="primary" @click="handleSearchLcb">查询</el-button>
            </div>
            <!-- <div v-if="groupTag.indexOf('JYGL') != -1" > -->
              <!-- <filterComponent :filterList="filterList" ></filterComponent> -->
               <div class="filter colcenter milestone-filter" >
                    <span class="filter-title">区域工程:</span>
                    <el-select v-model="qygc" placeholder="请选择" size="mini"  @change="handleChangeFilter">
                        <el-option  v-for="item in gczdList"  :key="item.label" :label="item.mc" :value="item.label"> </el-option>
                    </el-select>&#x3000;&#x3000;
                     <span>
                       <span class="filter-weight">是否有项目经理:</span>
                        <el-radio-group v-model="sfxmjl" @change="handleChooseXmjl">
                            <el-radio  label="">全部</el-radio>
                            <el-radio  label="1">是</el-radio>
                            <el-radio  label="0">否</el-radio>
                        </el-radio-group>
                     </span>
                     <span>&#x3000;&#x3000;
                       <span class="filter-weight">是否有责任人:</span>
                       <el-radio-group v-model="sfzrr" @change="handleChooseZrr">
                          <el-radio  label="">全部</el-radio>
                          <el-radio  label="1">是</el-radio>
                          <el-radio  label="0">否</el-radio>
                        </el-radio-group>
                     </span>
                </div>
            <!-- </div> -->
            <div flex class="filter">
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
            <div flex class="filter">
               <span class="filter-title">项目类别:</span>
               <el-checkbox-group v-model="xmlbList" @change="handleXMlb">
                    <el-checkbox label="软件">软件</el-checkbox>
                    <el-checkbox label="集成">集成</el-checkbox>
                    <el-checkbox label="软件服务">软件服务</el-checkbox>
                    <el-checkbox label="集成服务">集成服务</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="filter">
                <span class="filter-title">承诺结束时间</span>
                     <el-date-picker
                        v-model="cnkssj"
                        type="date"
                        size="small"
                        placeholder="开始日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        @change="changeCnStartDate">
                     </el-date-picker>
                     &nbsp;至&nbsp;
                     <el-date-picker
                        v-model="cnjssj"
                        type="date"
                         size="small"
                        placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        @change="changeCnEndDate">
                     </el-date-picker>
            </div>
            <div class="filter">
                <span class="filter-title">实际结束时间</span>
                 <el-date-picker
                        v-model="sjkssj"
                        type="date"
                         size="small"
                        placeholder="开始日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        @change="changeSjStartDate">
                     </el-date-picker>
                      &nbsp;至&nbsp;
                     <el-date-picker
                        v-model="sjjssj"
                        type="date"
                         size="small"
                        placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        @change="changeSjEndDate">
                    </el-date-picker>
            </div>
       </section>
       <section class="milestone_tabel">
           <div style="padding:0 10px 10px;">
                <p style="margin:10px 0 !important;" v-if="ishow">
                   <el-button size="mini" type="success" @click="commitLcb">提报里程碑</el-button>
                   <el-button size="mini" type="primary" @click="exportLcb">导出</el-button>
                   <span style="float:right;margin-top:5px"><span class="filter-weight">合计完工量 : </span><span style="color:#f00;font-size:18px">{{totalWgl<10000?totalWgl:totalWgl<100000000?(totalWgl/10000).toFixed(4):(totalWgl/100000000).toFixed(4)}} 
                   </span>{{totalWgl<10000?'元':totalWgl<100000000?'万元':'亿'}}</span>
                   <p style="color:#aaa;font-size:12px;">说明：整体验收里程碑不允许调整，非整体验收里程碑里程碑调整需要用户确认后才生效</p>
                </p>
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    border
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" :selectable='checkboxInit' v-if="ishow"> 
                    </el-table-column>
                    <el-table-column prop="qygc" min-width="130"  label="区域工程"  show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmbh" min-width="100"  label="项目编号"  show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmmc" min-width="200"  label="项目名称"  show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmnr_display" min-width="260"  label="项目内容"  show-overflow-tooltip></el-table-column>
                    <el-table-column prop="lcbms_display" min-width="260" style="text-align:left" label="里程碑描述" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="nrxmlb" min-width="90"  label="项目类别"  show-overflow-tooltip></el-table-column>
                    <el-table-column sortable label="里程碑状态" width="120" show-overflow-tooltip> 
                         <template slot-scope="scope">
                              <div class="name-wrapper">
                                    <el-tag size="small" title="点击查看操作详情" type='success'v-if="scope.row.zt == '关闭'" @click.native="handleCheckRrecord(scope.row)">{{ scope.row.zt }}</el-tag>
                                    <el-tag size="small" title="点击查看操作详情" type='danger' v-if="scope.row.zt != '关闭'" @click.native="handleCheckRrecord(scope.row)">{{ scope.row.zt }}</el-tag>
                              </div>
                         </template>
                    </el-table-column>
                    <el-table-column prop="wglv" label="完工率(%)" width="100" v-if="ishow"  show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="wglg" label="完工量(元)" width="100" v-if="ishow"> </el-table-column>
                    <el-table-column prop="cnjssj" sortable label="承诺结束时间" width="150"> </el-table-column>
                    <el-table-column prop="sjjssj" sortable label="实际结束时间" width="150"> </el-table-column>
                    <el-table-column prop="dwmc" min-width="200"  label="学校名称"  show-overflow-tooltip></el-table-column>
                    <el-table-column prop="yfzrrxm" min-width="100" label="项目经理"  show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zzrxm"  label="责任人" width="100"> </el-table-column>
                </el-table>
           </div>
           <div style="padding:5px 0;text-align:right">
                <pagination v-if="total > 12" :currentPage="currentPage" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"></pagination>
           </div>     
       </section>

        <el-dialog
            title="提报里程碑"
            :close-on-click-modal="false"
            :visible.sync="milestoneVisible"
            width="600px"
            top="50px">
            <commitMilestone :shown="milestoneVisible" :xmbh="xmbh" @handleCommitMilestone="handleCommitMilestone" :taskLcbbhArr="lcbbhArr"></commitMilestone>
        </el-dialog>
        <lcbjlDialog :show.sync="lcbjlShow" :lcbbh="lcbbh"></lcbjlDialog>  
  </div>
</template>
<script>
import { getMenu, getSession } from "@/utils/util.js";
import {
  queryMilestoneData,
  submitMilestone,
  ModifyMilestoneCommitmentDate,
  getMilestoneSubmitType
} from "@/api/milestone.js";
import pagination from "@/components/BusinessPage/pagination.vue";
import commitMilestone from "@/components/BusinessPage/commitMilestone.vue";
import filterComponent from "@/components/reportTable/filterComponent.vue";
import { returnFloat } from "../../utils/util.js";
import lcbjlDialog from "@/components/dialog/lcbjl-dialog.vue";
export default {
  data() {
    return {
      lcbjlShow: false,
      lcbbh: "",
      gczdList: [],
      checkList: [],
      xmlbList: [],
      keyword: "",
      cnkssj: "",
      cnjssj: "",
      sjkssj: "",
      sjjssj: "",
      qygc: "",
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
      xmbh: "",
      groupTag: "",
      ishow: true,
      sfxmjl: "",
      sfzrr: ""
    };
  },

  methods: {
    handleChooseXmjl() {
      this.queryMilestoneData(1);
      this.currentPage = 1;
    },
    handleChooseZrr() {
      this.queryMilestoneData(1);
      this.currentPage = 1;
    },
    handleCheckRrecord(data) {
      // 查看里程碑操作记录
      this.lcbbh = data.lcbbh;
      this.lcbjlShow = !this.lcbjlShow;
    },
    handleChangeFilter(val) {
      // 区域工程
      this.queryMilestoneData(1);
      this.currentPage = 1;
    },
    handleCommitMilestone() {
      // 提报里程碑
      this.milestoneVisible = false;
      this.queryMilestoneData(this.currentPage);
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
        xmbh: "",
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
              this.xmbh = "";
            }
          }
        });
      }
    },
    exportLcb() {
      this.cnkssj = !this.cnkssj ? "" : this.cnkssj;
      this.cnjssj = !this.cnjssj ? "" : this.cnjssj;
      this.sjkssj = !this.sjkssj ? "" : this.sjkssj;
      this.sjjssj = !this.sjjssj ? "" : this.sjjssj;
      window.open(
        window.baseurl +
          "milestone/exportMilestoneData.do?xmbh=" +
          "&keyword=" +
          this.keyword +
          "&zt=" +
          this.checkList.join(",") +
          "&qygc=" +
          this.qygc +
          "&startCnjssj=" +
          this.cnkssj +
          "&endCnjssj=" +
          this.cnjssj +
          "&startSjjssj=" +
          this.sjkssj +
          "&endSjjssj=" +
          this.sjjssj +
          "&nrxmlb=" +
          this.xmlbList.join(",") +
          "&yxmjl=" +
          this.sfxmjl +
          "&yzrr=" +
          this.sfzrr
      );
    },
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
      this.currentPage = 1;
    },
    handleXMlb(val) {
      //查询项目类别
      this.queryMilestoneData(1);
      this.currentPage = 1;
    },
    changeCnStartDate() {
      //承诺开始时间
      this.queryMilestoneData(1);
      this.currentPage = 1;
    },
    changeCnEndDate() {
      //承诺结束时间
      this.queryMilestoneData(1);
      this.currentPage = 1;
    },
    changeSjStartDate() {
      //实际开始时间
      this.queryMilestoneData(1);
      this.currentPage = 1;
    },
    changeSjEndDate() {
      //实际结束时间
      this.queryMilestoneData(1);
      this.currentPage = 1;
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
        xmbh: "",
        keyword: this.keyword,
        qygc: this.qygc,
        zt: this.checkList.length == 0 ? "" : this.checkList.join(","),
        startCnjssj: !this.cnkssj ? "" : this.cnkssj,
        endCnjssj: !this.cnjssj ? "" : this.cnjssj,
        startSjjssj: !this.sjkssj ? "" : this.sjkssj,
        endSjjssj: !this.sjjssj ? "" : this.sjjssj,
        nrxmlb: this.xmlbList.length == 0 ? "" : this.xmlbList.join(","),
        yxmjl: this.sfxmjl,
        yzrr: this.sfzrr
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
  activated() {
    this.groupTag = JSON.parse(sessionStorage.userInfo).userGroupTag;
    if (getSession("gczd") == null) {
      getMenu("gczd", this.gczdList, true); //获取工程战队))
    } else {
      this.gczdList = getSession("gczd");
    }
    if (this.groupTag.indexOf("JZGCRY") != -1) {
      this.ishow = true;
    } else {
      this.ishow = false;
    }
    this.queryMilestoneData(1);
  },
  components: { pagination, commitMilestone, filterComponent, lcbjlDialog }
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
  margin-right: 10px;
  font-weight: 700;
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
