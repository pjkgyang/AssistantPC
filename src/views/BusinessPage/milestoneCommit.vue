<template>
  <div class="milestone-manage">
    <section style="border-radius:5px;padding:8px 0;background:#fff;box-shadow:0 0 5px #ccc">
      <div class="filter">
        <span class="filter-title">高级查询:</span>
        <el-input size="mini" style="width:40%" placeholder="请输入项目编号/项目名称/里程碑描述/项目内容/项目经理/责任人"   v-model="keyword" @change="searchLcbContent"> </el-input>
        <el-button type="primary" size="mini" @click="handleOpenfilter">{{!filterShow?'打开':'隐藏（清空）'}}高级查询条件<i :class='{"el-icon-arrow-up":!filterShow,"el-icon-arrow-down":filterShow,"el-icon--right":true}'></i></el-button>
        &#x3000;<el-button size="mini" type="primary" @click="handleSearchLcb">查询</el-button>
      </div>
      <transition name="el-zoom-in-top">
        <div style="padding:0 20px;" v-if="filterShow" flex flexwrap>
          <div class="filter filterFlex" >
            <span class="filter-title fs-12">合同编号: </span>
            <el-input size="mini" style="width:calc(100% - 120px)" placeholder="请输合同编号"  v-model="htbhKeyword" @change="searchLcbContent"></el-input>
          </div>
          <div class="filter filterFlex">
            <span class="filter-title fs-12">项目编号: </span>
            <el-input size="mini" style="width:calc(100% - 120px)" placeholder="请输入项目编号"  v-model="xmbhKeyword" @change="searchLcbContent"></el-input>
          </div>
          <div class="filter filterFlex">
            <span class="filter-title fs-12">项目名称: </span>
            <el-input size="mini" style="width:calc(100% - 120px)" placeholder="请输入项目名称"  v-model="xmmcKeyword" @change="searchLcbContent"></el-input>
          </div>
          <div class="filter filterFlex">
            <span class="filter-title fs-12">项目内容: </span>
            <el-input size="mini" style="width:calc(100% - 120px)" placeholder="请输入项目内容"  v-model="xmnrKeyword" @change="searchLcbContent"></el-input>
          </div>
          <div class="filter filterFlex">
            <span class="filter-title fs-12">里程碑描述: </span>
            <el-input size="mini" style="width:calc(100% - 120px)" placeholder="请输入里程碑描述"  v-model="lcbmsKeyword" @change="searchLcbContent"></el-input>
          </div>
          <div class="filter filterFlex">
            <span class="filter-title fs-12">项目经理: </span>
            <el-input size="mini" style="width:calc(100% - 120px)" placeholder="请输入项目经理"  v-model="xmjlKeyword" @change="searchLcbContent"></el-input>
          </div>
          <div class="filter filterFlex">
            <span class="filter-title fs-12">责任人: </span>
            <el-input size="mini" style="width:calc(100% - 120px)" placeholder="请输入责任人"  v-model="zrrKeyword" @change="searchLcbContent"></el-input>
          </div>
        </div>
      </transition>
      <div class="filter colcenter milestone-filter">
        <span class="filter-title">区域工程:</span>
        <el-select v-model="qygc" placeholder="请选择" size="mini" @change="handleChangeFilter">
          <el-option v-for="item in gczdList" :key="item.label" :label="item.mc" :value="item.label"> </el-option>
        </el-select>&#x3000;&#x3000;
        <span>
          <span class="filter-weight">是否有项目经理:</span>
          <el-radio-group v-model="sfxmjl" @change="handleChooseXmjl">
            <el-radio label="">全部</el-radio>
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </span>
        <span>&#x3000;&#x3000;
          <span class="filter-weight">是否有责任人:</span>
          <el-radio-group v-model="sfzrr" @change="handleChooseZrr">
            <el-radio label="">全部</el-radio>
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
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

      <div flex class="filter">
        <span class="filter-title">项目状态:</span>
        <el-checkbox-group v-model="xmztList" @change="handleXMZT">
           <el-checkbox label="1">在建</el-checkbox>
          <el-checkbox label="2">售后</el-checkbox>
          <el-checkbox label="3">过保</el-checkbox>
          <el-checkbox label="4">关闭</el-checkbox>
        </el-checkbox-group>
      </div>
      

      <div flex class="filter milestone-filter">
        <span class="filter-title">合同性质:</span>
        <el-checkbox-group v-model="htxzList" @change="handleHtxz">
          <el-checkbox label="A">A类</el-checkbox>
          <el-checkbox label="B">B类</el-checkbox>
          <el-checkbox label="C">C类</el-checkbox>
        </el-checkbox-group>&#x3000;&#x3000;
        </span>
        <span>
          <span class="filter-weight">是否购销:</span>
          <el-radio-group v-model="sfgx" @change="handleChooseSfgx">
            <el-radio label="">全部</el-radio>
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </span>
      </div>
      <div class="filter">
        <span class="filter-title">承诺结束时间</span>
        <el-date-picker v-model="cnkssj" type="date" size="small" placeholder="开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeCnStartDate">
        </el-date-picker>
        &nbsp;至&nbsp;
        <el-date-picker v-model="cnjssj" type="date" size="small" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeCnEndDate">
        </el-date-picker>
      </div>
      <div class="filter">
        <span class="filter-title">实际结束时间</span>
        <el-date-picker v-model="sjkssj" type="date" size="small" placeholder="开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeSjStartDate">
        </el-date-picker>
        &nbsp;至&nbsp;
        <el-date-picker v-model="sjjssj" type="date" size="small" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeSjEndDate">
        </el-date-picker>
      </div>
    </section>
    <section class="milestone_tabel">
      <div style="padding:0 10px 10px;">
        <p style="margin:10px 0 !important;" v-if="ishow">
          <el-button size="mini" type="success" @click="commitLcb">提报里程碑</el-button>
          <el-button size="mini" type="primary" @click="exportLcb">导出</el-button>
          <span style="float:right;margin-top:5px"><span class="filter-weight">合计完工量 : </span><span style="color:#f00;font-size:18px">{{totalWgl<10000?totalWgl:totalWgl<100000000?(totalWgl/10000).toFixed(4):(totalWgl/100000000).toFixed(4)}} </span>{{totalWgl <10000?'元':totalWgl<100000000?'万元':'亿'}}</span> <p style="color:#aaa;font-size:12px;">说明：整体验收里程碑不允许调整，非整体验收里程碑里程碑调整需要用户确认后才生效
        </p>
        </p>
        <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" :selectable='checkboxInit'>
          </el-table-column>
          
          <el-table-column prop="qygc" min-width="130" label="区域工程" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmbh" min-width="100" label="项目编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmmc" min-width="200" label="项目名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmnr_display" min-width="260" label="项目内容" show-overflow-tooltip></el-table-column>
          <el-table-column min-width="260" label="里程碑描述" show-overflow-tooltip>
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
              <div class="name-wrapper">
                <el-tag size="small" title="点击查看操作详情" type='success' v-if="scope.row.zt == '关闭'" @click.native="handleCheckRrecord(scope.row)">{{ scope.row.zt }}</el-tag>
                <el-tag size="small" title="点击查看操作详情" type='danger' v-if="scope.row.zt != '关闭'" @click.native="handleCheckRrecord(scope.row)">{{ scope.row.zt }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="wglv" label="完工率(%)" width="100" v-if="ishow" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="wglg" label="完工量(元)" width="100" v-if="ishow"> </el-table-column>
          <el-table-column prop="cnjssj" sortable label="承诺结束时间" width="150"> </el-table-column>
          <el-table-column prop="sjjssj" sortable label="实际结束时间" width="150"> </el-table-column>
          <el-table-column prop="dwmc" min-width="200" label="学校名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="yfzrrxm" min-width="100" label="项目经理" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zzrxm" label="责任人" width="100"> </el-table-column>
          <el-table-column prop="htbh" min-width="150" label="合同编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sfzt" min-width="100" label="是否在谈" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sfgx" min-width="100" label="是否购销" show-overflow-tooltip></el-table-column>
          <el-table-column prop="dkl" min-width="100" label="到款率" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div style="padding:5px 0;text-align:right">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 100, 200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </section>

    <el-dialog title="提报里程碑" :close-on-click-modal="false" :visible.sync="milestoneVisible" width="700px" top="50px">
      <commitMilestone :shown="milestoneVisible" :xmbh="xmbh" @handleCommitMilestone="handleCommitMilestone" :taskLcbbhArr="lcbbhArr"
      @handleClose="handleCloseMile" :lcbType="lcbType"></commitMilestone>
      
    </el-dialog>
    <lcbjlDialog :show.sync="lcbjlShow" :lcbbh="lcbbh"></lcbjlDialog>
    <cplistDialog :show.sync="cplistShow" :tableData="cplistData"></cplistDialog>
    <xmbw-dialog :show.sync="xmbwShow" :isEdit="isEdit" :xmbh="xmbh" @handleCommitXmbw="handleCommitXmbw" :lcbData="lcbData"></xmbw-dialog>

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
import cplistDialog from '@/components/dialog/milestone/cplist-dialog.vue'
import xmbwDialog from "@/components/dialog/milestone/xmbw-dialog.vue";

export default {
  data() {
    return {
      lcbjlShow: false,
      cplistShow:false,
      xmbwShow:false,
      lcbbh: "",
      gczdList: [],
      checkList: [],
      xmlbList: [],//项目类别
      xmztList:[],//项目状态
      htxzList: [],//合同性质
      keyword: "",
      cnkssj: "",
      cnjssj: "",
      sjkssj: "",
      sjjssj: "",
      qygc: "",
      total: null,
      pageSize: 20,
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
      sfzrr: "",
      sfgx: "",
      filterShow: false,
      htbhKeyword: "",
      xmbhKeyword: "",
      xmmcKeyword: "",
      xmnrKeyword: "",
      lcbmsKeyword: "",
      xmjlKeyword: "",
      zrrKeyword: "",

      cplistData:[],
      lcbData:{},
      isEdit:false,
      colData:{},
      lcbType:'',
    };
  },

  methods: {
    handleCloseMile(){
      this.milestoneVisible = false;
    },
    // 查看备忘
    handleCheckList(data){
      this.xmbh = data.xmbh;
      this.isEdit = true;
      this.colData = data;
      this.$get(this.API.isCanEditMemoMilestone,{
         lcbbh:data.lcbbh 
       }).then(res=>{
         if(res.state == 'success'){
           this.lcbData = res.data
           if(res.data.canEdit){
             this.xmbwShow = !this.xmbwShow
           }else{
             this.cplistData = !res.data.cps?[]:res.data.cps
             this.cplistShow = !this.cplistShow
           }
         }
       })
    },
    // 项目备忘
    handleCommitXmbw(params,data) {
      if(!data) return;
      if(!this.isEdit){
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
      }else{
       this.$post(this.API.editMemo, {
        lcbbh:this.colData.lcbbh,
        cnwcsj : params.cnwcrq,
        sm:params.sm,
        cps:params.cps     
       }).then(res => { 
         if (res.state == "success") {
            this.$alert("添加成功", "提示", { confirmButtonText: "确定",type: "success"});
            this.xmbwShow = false;
          }else{
            this.$alert(res.msg, "提示", { confirmButtonText: "确定",type: "error"});
          }
        })
      }
    },
    handleOpenfilter() {
      this.filterShow = !this.filterShow;
    },
    handleChooseXmjl() {
      this.currentPage = 1;
      this.queryMilestoneData();
    },
    handleChooseZrr() {
      this.currentPage = 1;
      this.queryMilestoneData();
    },
    // 是否购销
    handleChooseSfgx() {
      this.currentPage = 1;
      this.queryMilestoneData();
    },
      // 查看里程碑操作记录
    handleCheckRrecord(data) {
      this.lcbbh = data.lcbbh;
      this.lcbjlShow = !this.lcbjlShow;
    },
      // 区域工程
    handleChangeFilter(val) {
      this.currentPage = 1;
      this.queryMilestoneData();
    },
      // 提报里程碑
    handleCommitMilestone() {
      this.milestoneVisible = false;
      this.queryMilestoneData();
    },
   // && row.zt != '处理中'
    checkboxInit(row, index) {
      if(this.ishow){
        if (row.zt != "计划中" && row.zt != "处理中" ){
          return false;
        }else{
          return true;
        }
      }else{
         return false;
      }
    },
    //取消
    handleClose() {
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
              this.queryMilestoneData();
            }
          });
        }
      });
    },
    // 提报里程碑
    commitLcb() {
      this.isEdit = false;
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
            this.lcbType = data.data.lcbType
            this.xmbh = data.data.xmbh? data.data.xmbh:''
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
    exportLcb() {
      this.cnkssj = !this.cnkssj ? "" : this.cnkssj;
      this.cnjssj = !this.cnjssj ? "" : this.cnjssj;
      this.sjkssj = !this.sjkssj ? "" : this.sjkssj;
      this.sjjssj = !this.sjjssj ? "" : this.sjjssj;
      window.open(
        window.baseurl +
          "milestone/exportMilestoneData.do?xmbh=" +
          this.xmbhKeyword +
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
          this.sfzrr +
          "&htbh=" +
          this.htbhKeyword +
          "&xmmc=" +
          this.xmmcKeyword +
          "&xmnr=" +
          this.xmnrKeyword +
          "&lcbms=" +
          this.lcbmsKeyword +
          "&xmjl=" +
          this.xmjlKeyword +
          "&zrr=" +
          this.zrrKeyword +
          "&htxz=" +
          this.htxzList.join(",") +
          "&sfgx=" +
          this.sfgx
      );
    },
    //查询里程碑
    handleSearchLcb() {
      this.queryMilestoneData();
    },
    //支持回车
    searchLcbContent() {
      this.queryMilestoneData();
    },
    // 切换分页
    handleCurrentChange(data) {
      this.currentPage = data;
      this.queryMilestoneData();
    },
    handleSizeChange(data) {
      this.currentPage = 1;
      this.pageSize = data;
      this.queryMilestoneData();
    },
    //选择里程碑状态
    handleCheckbox(val) {
      this.currentPage = 1;
      this.queryMilestoneData();
    },
    //查询项目类别
    handleXMlb(val) {
      this.currentPage = 1;
      this.queryMilestoneData();
    },
    handleXMZT(val){
      this.currentPage = 1;
      this.queryMilestoneData();
    },
    handleHtxz(val) {
      this.currentPage = 1;
      this.queryMilestoneData();
    },
    //承诺开始时间
    changeCnStartDate() {
      this.currentPage = 1;
      this.queryMilestoneData();
    },
    //承诺结束时间
    changeCnEndDate() {
      this.currentPage = 1;
      this.queryMilestoneData();
    },
    //实际开始时间
    changeSjStartDate() {
      this.currentPage = 1;
      this.queryMilestoneData();
    },
    //实际结束时间
    changeSjEndDate() {
      this.currentPage = 1;
      this.queryMilestoneData();
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
    queryMilestoneData() {
      queryMilestoneData({
        curPage: this.currentPage,
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
        xmzt:this.xmztList.length == 0 ? "" : this.xmztList.join(","),
        yxmjl: this.sfxmjl,
        yzrr: this.sfzrr,

        htbh: this.htbhKeyword,
        xmmc: this.xmmcKeyword,
        xmnr: this.xmnrKeyword,
        lcbms: this.lcbmsKeyword,
        xmjl: this.xmjlKeyword,
        zrr: this.zrrKeyword,
        xmbh: this.xmbhKeyword,
        htxz: this.htxzList.join(","),
        sfgx: this.sfgx
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
                          : val.zt == "7"
                            ? "待定"
                            : "完成待确认";
          });
          this.tableData3 = milestone;
          this.total = data.data.data.records;
        }
      });
    }
  },
  watch: {
    filterShow(n, o) {
      if (!n) {
        this.htbhKeyword = this.xmbhKeyword = this.xmmcKeyword = this.xmnrKeyword = this.lcbmsKeyword = this.xmjlKeyword = this.zrrKeyword =
        "";
        this.currentPage = 1;
        this.queryMilestoneData();
      }
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
    this.queryMilestoneData();
  },
  components: { pagination, commitMilestone, filterComponent, lcbjlDialog ,cplistDialog ,xmbwDialog}
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
.filterFlex{
  width: 30%;
}
</style>
