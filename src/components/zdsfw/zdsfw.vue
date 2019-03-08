<template>
  <div class="myitem-zdsfw">
    <tableLayout class="zdsfw-content" flex-column>
      <section slot="top" style="border-bottom:1px solid #EBEEF5" col=1>
        <zdsfwFilter :placeholder="'学校名称/项目名称/项目编号/合同编号'" :xmbh="this.xmbh" @handleChangeFilter="handleChangeFilter"></zdsfwFilter>
      </section>
      <section slot="bottom" col=2>
        <section>
          <div flex spacebetween class="mb-12">
            <div>
              <!-- <el-button v-if="isJzuser == '0'" :disabled="!multipleSelection.length" type="primary" size="mini" @click="handleClick('tbfw')">提报服务</el-button> -->
              <el-button v-if="xmData.jfzrrxm == username" :disabled="!multipleSelection.length" type="primary" size="mini" @click="handleClick('qrfw')">确认服务</el-button>
              <el-button v-if="xmData.jfzrrxm == username" :disabled="!multipleSelection.length" type="danger" size="mini" @click="handleClick('bhfw')">驳回服务</el-button>
              <el-button v-if="groupTag.includes('ZDSFWGLY')" type="primary" size="mini" @click="handleClick('xzjh')">新增自定义服务计划</el-button>
              <el-button v-if="groupTag.includes('ZDSFWGLY')" :disabled="!multipleSelection.length" type="danger" size="mini" @click="handleClick('scjh')">删除服务计划</el-button>
              <el-button v-if="groupTag.includes('ZDSFWGLY')" :disabled="!multipleSelection.length" type="primary" size="mini" @click="handleClick('xgzrr')">批量修改责任人</el-button>
              <el-button v-if="groupTag.includes('ZDSFWGLY')" type="primary" size="mini" @click="handleClickScOrfb('sc')">生成</el-button>
              <el-button v-if="groupTag.includes('ZDSFWGLY')" type="primary" size="mini" @click="handleClickScOrfb('fb')">发布</el-button>
            </div>
            <div>
              <el-button type="primary" size="mini" @click="handleClick('export')">导出</el-button>
            </div>
          </div>
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="55"></el-table-column>
            <el-table-column fixed="left" label="操作" width="210">
              <template slot-scope="scope">
                <!-- v-if="scope.row.zt == '1' && (xmData.jfzrrxm == username||groupTag.includes('ZDSFWGLY'))" -->
                <el-button v-if="scope.row.zt != '1'  && isJzuser == '0' && username == scope.row.zrrxm" type="text" size="mini" @click="handleClick('tbfw',scope.row)">提报</el-button>
                <el-button v-if="scope.row.zt == '1' && (isJzuser == '1'||groupTag.includes('ZDSFWGLY'))" type="text" size="mini" @click="handleClick('qrfw',scope.row)">确认</el-button>
                <el-button v-if="scope.row.zt == '1' && (isJzuser == '1'||groupTag.includes('ZDSFWGLY'))" type="text" size="mini" @click="handleClick('bhfw',scope.row)">驳回</el-button>
                <el-button v-if="groupTag.includes('ZDSFWGLY')" type="text" size="mini" @click="handleClick('edit',scope.row)">编辑</el-button>
                <el-button v-if="scope.row.sffb == '0' && groupTag.includes('ZDSFWGLY')" type="text" size="mini" @click="handleClick('scjh',scope.row)" style="color:#f00">删除</el-button>
                <el-button type="text" size="mini" @click="handleCheckDetail(scope.row)">详情</el-button>
              </template>
            </el-table-column>

            <el-table-column prop="yh" label="学校名称" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="htbh" label="合同编号" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" min-width="280" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cpmc" label="产品" min-width="240" show-overflow-tooltip></el-table-column>
            <el-table-column prop="fwnr" label="服务内容" min-width="160" show-overflow-tooltip></el-table-column>
            <el-table-column label="风险等级" width="150">
              <template slot-scope="scope">
                <template slot-scope="scope">
                  <a href="javaScript:;;" v-if="scope.row.fxdj != '-'" @click="handleCheck(scope.row)">
                    <el-tag size="mini" :class="{'zdsfw-fxdj-s1':scope.row.fxdj==1,'zdsfw-fxdj-s2':scope.row.fxdj==2,'zdsfw-fxdj-s3':scope.row.fxdj==3}" >{{scope.row.fxdj==1?'S1':scope.row.fxdj==2?'S2':'S3'}}</el-tag>&nbsp;
                  </a>
                  <span v-if="scope.row.fxdj == '-'">{{scope.row.fxdj}}</span>
                  <span style="font-size:12px">{{scope.row.fxsfcl==0?'(未处理)':scope.row.fxsfcl==1?'(已处理)':scope.row.fxsfcl}}</span>
              </template>
              </template>
            </el-table-column>
            <el-table-column label="服务状态" width="100">
              <template slot-scope="scope">
                <el-tag size="mini" :type="scope.row.zt=='0'?'primary':scope.row.zt=='1'?'success':'danger'">{{scope.row.zt=='0'?'计划中':scope.row.zt==1?'已完成':scope.row.zt==3?'已驳回':'关闭'}}</el-tag>
              </template>
            </el-table-column>  
            <el-table-column prop="jhksrq" label="计划开始日期" width="140"></el-table-column>
            <el-table-column prop="jhjsrq" label="计划结束日期" width="140"></el-table-column>
            <el-table-column prop="sjjsrq" label="实际结束日期" width="140"></el-table-column>
            <el-table-column prop="sfgq" label="是否过期" width="100">
              <template slot-scope="scope">
                <el-tag size="mini" :type="scope.row.sfgq=='0'?'primary':'danger'">{{scope.row.sfgq=='0'?'未过期':'过期'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="zrrxm" label="责任人" width="80"></el-table-column>
            <!-- <el-table-column prop="ztztmc" label="项目状态" min-width="100" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="xmlb" label="项目类别" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sfzt" label="合同性质" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sfgx" label="是否购销" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dkl" label="到款率" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tbrxm" label="提报人" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tbsj" label="提报时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="qrrxm" label="确认人" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="qrsj" label="确认时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="pf" label="评分" width="80"></el-table-column>
          </el-table>
        </section>
        <div text-right style="margin-top:2px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </section>
    </tableLayout>

    <tbfwDialog :show.sync='tbfwShow' @handleCommitTB="handleCommitTB" :wids="wids" :isMultiple="isMultiple" :rowData="rowData"></tbfwDialog>
    <editDialog :show.sync='editShow' :data="rowsData" @handleEdit="handleEdit" :plxgZrr="plxgZrr" :xmbh="xmbh"></editDialog>
    <qrbhfwDialog :show.sync='qrbhfwShow' :title="title" @handleCommitQR="handleCommitQR"></qrbhfwDialog>
    <fwjhDialog :show.sync='fwjhShow' :xmbh="xmbh" @handleCommitFWJH="handleCommitFWJH"></fwjhDialog>
    <sc-dialog :show.sync='scShow' :xmData="xmData" @handleScSuccess="handleScSuccess"></sc-dialog>
    <fxdjDialog :show.sync='fxdjShow' :rowData="rowData" @handleSave="handleSave"></fxdjDialog>
  </div>
</template>

<script>
import tableLayout from "@/components/layout/tableLayout.vue";
import { getProjectCatalog } from "@/api/xmfz.js";
import tbfwDialog from "@/components/dialog/zdsfw/tbfw-dialog.vue";
import editDialog from "@/components/dialog/zdsfw/edit-dialog.vue";
import qrbhfwDialog from "@/components/dialog/zdsfw/qrbhfw-dialog.vue";
import fwjhDialog from "@/components/dialog/zdsfw/fwjh-dialog.vue";
import zdsfwFilter from "@/components/zdsfw/zdsfwFilter.vue";
import scDialog from "@/components/dialog/zdsfw/sc-dailog.vue";
import fxdjDialog from "@/components/dialog/zdsfw/fxdjcommit.vue";

import { getLastMonthDay } from "@/utils/util.js";
import { getProject } from "@/api/xmkb.js";
import { getLoginUser } from "@/api/system.js";
export default {
  data() {
    return {
      tbfwShow: false,
      editShow: false,
      qrbhfwShow: false,
      fwjhShow: false,
      fxdjShow:false, //风险等级处理
      scShow: false,
      title: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      multipleSelection: [],
      widsArr: [],
      wids: "",
      cpList: [],
      cpobj: {},
      rowsData: {},
      groupTag: "",
      username: "",
      isJzuser: "",
      xmData: {},
      filterData: {
        keyword: "",
        fwnr: "",
        cpbh: "",
        cpmc: "",
        fwzt: "",
        lb: "",
        xmzt: "",
        jhksrq: "",
        jhjsrq: "",
        // date: [
        //   this.getFirstDay(),
        //   getLastMonthDay(
        //     new Date().getFullYear(),
        //     new Date().getMonth() + 1 < 10
        //       ? "0" + (new Date().getMonth() + 1)
        //       : new Date().getMonth() + 1
        //   )
        // ],
        sfgq: "",
        fxdj:''
      },
      xmbh: this.nxmbh,
      plxgZrr: false,
      rowData:{},
      isMultiple:false
    };
  },
  methods: {
    // 点击风险等级列
    handleCheck(data){
      this.fxdjDialog = !this.fxdjDialog
    },  
    // 风险等级列保存
    handleSave(data){
      this.$post(this.API.submitActiveServiceRisk,{
        wid:this.rowData.wid,
        cljg:data.cljg,
        sfcl:data.sfcl,
        fjData:data.fileList
      }).then(res=>{
        if(res.state == 'success'){
           this.$message({message: "保存成功~",type: 'success'});
           this.fxdjShow = false;
           this.pageActiveService();
        }else{
           this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"});
        }
      })
    },

    handleChangeFilter(data) {
      this.filterData = data;
      this.currentPage = 1;
      this.pageActiveService();
    },
    //提报
    handleCommitTB(data) {
      this.$post(this.API.submitActiveService, {
        wids: this.wids,
        sm: data.sm,
        fjData: data.fileList
      }).then(res => {
        if (res.state == "success") {
          this.$message({message: '提报成功~',type: 'success'});
          this.tbfwShow = false;
          this.pageActiveService();
        } else {
          this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"});
        }
      });
    },
    handleCommitQR(data) {
      //驳回,确认
      let obj = {
        wids: this.wids,
        sm: data.sm
      };
      if (this.title == "确认服务") {
        obj["pf"] = !data.pf ? "" : data.pf;
      }
      this.$post(
        this.title == "确认服务"
          ? this.API.confirmActiveService
          : this.API.rejectActiveService,
        obj
      ).then(res => {
        if (res.state == "success") {
          this.$alert(
            this.title == "确认服务" ? "确认成功" : "驳回成功",
            "提示",
            {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.qrbhfwShow = false;
                this.pageActiveService();
              }
            }
          );
        } else {
          this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"});
        }
      });
    },
    //服务计划确认
    handleCommitFWJH(data) {
      data.xmbh = this.xmbh;
      data.xmmc = this.xmData.xmmc;
      this.$post(this.API.generateActiveService, data).then(res => {
        if (res.state == "success") {
          this.$message({message: '确认成功~',type: 'success'});
          this.fwjhShow = false;
          this.currentPage = 1;
          this.pageActiveService();
        }
      });
    },

    // 编辑（批量修改责任人）
    handleEdit(data) {
      if (this.plxgZrr) {
        this.$post(this.API.updateZrr, {
          zrrbh: data.zrrbh,
          zrrxm: data.zrrxm,
          wids: this.wids
        }).then(res => {
          if (res.state == "success") {
            this.$message({message: '保存成功~',type: 'success'});
            this.editShow = false;
            this.pageActiveService();
          }
        });
      } else {
        data.wid = this.rowsData.wid;
        this.$post(this.API.saveActiveService, data).then(res => {
          if (res.state == "success") {
             this.$message({message: '保存成功~',type: 'success'});
             this.editShow = false;
             this.pageActiveService();
          }
        });
      }
    },
    //复选
    handleSelectionChange(val) {
      this.widsArr = [];
      this.multipleSelection = val;
      if(val.length == 1){
        this.isMultiple = true;
      }else{
        this.isMultiple = false; 
      }
      val.forEach(ele => {
        this.widsArr.push(ele.wid);
      });
    },

    handleClick(data, params) {
      this.wids = !params ? this.widsArr.join(",") : params.wid;
      let tbArr = [];
      switch (data) {
        case "tbfw":
          this.rowData  = !params ? this.multipleSelection[0] : params;
          if(params){
            this.isMultiple = true;
          }
          this.multipleSelection.forEach(ele => {
            if (ele.zt == "1") {
              tbArr.push(ele.zt);
            }
          });
          if (tbArr.length) {
            this.$alert('状态为 "已完成" 的服务不能再次提报！', "提示", {
              confirmButtonText: "确定",
              type: "warning"
            });
            return;
          }
          this.tbfwShow = true;
          break;
        case "qrfw":
          this.qrbhfwShow = true;
          this.title = "确认服务";
          break;
        case "bhfw":
          this.multipleSelection.forEach(ele => {
            if (ele.zt != "1") {
              tbArr.push(ele.zt);
            }
          });
          if (tbArr.length) {
            this.$alert('非 "已完成" 状态的服务不能驳回！', "提示", {
              confirmButtonText: "确定",
              type: "warning"
            });
            return;
          }
          this.title = "驳回服务";
          this.qrbhfwShow = true;
          break;
        case "xzjh":
          this.fwjhShow = true;
          break;
        case "scjh":
          this.multipleSelection.forEach(ele => {
            if (ele.zt != "0") {
              tbArr.push(ele.zt);
            }
          });
          if (tbArr.length) {
            this.$alert("非计划中服务不能删除！", "提示", {
              confirmButtonText: "确定",
              type: "warning"
            });
            return;
          }
          this.$confirm("您确定要删除服务计划么?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$post(this.API.deleteActiveService, {
                wids: this.wids
              }).then(res => {
                if (res.state == "success") {
                  this.$message({message: '删除成功~',type: 'success'});
                  this.pageActiveService();
                }
              });
            })
            .catch(() => {});
          break;
        case "export":
          window.open(
            window.baseurl +
              "activeservice/exportActiveService.do?xmbh=" +
              this.xmbh +
              "&cpbh=" +
              this.filterData.cpbh +
              "&cpmc=" +
              this.filterData.cpmc +
              "&fwnr=" +
              this.filterData.fwnr +
              "&zt=" +
              this.filterData.fwzt +
              "&xmzt=" +
              this.filterData.xmzt +
              "&jhksrq=" +
              this.filterData.jhksrq +
              "&jhjsrq=" +
              this.filterData.jhjsrq +
              "&sfgq=" +
              this.filterData.sfgq +
              "&keyword=" +
              this.filterData.keyword +
              "&lb=" +
              this.filterData.lb,
              "&fxdj=" +
              this.filterData.fxdj
          );
          break;
        case "edit": //编辑
          this.editShow = true;
          this.plxgZrr = false;
          this.rowsData = params;
          break;
        case "xgzrr": //修改责任人
          this.editShow = true;
          this.plxgZrr = true;
          break;
        default:
          break;
      }
    },
    // 生成
    handleScSuccess(data) {
      this.$post(this.API.generateActiveService, {
        xmbh: this.xmbh,
        fwksrq: data.fwksrq,
        fwqx: data.fwqx
      }).then(res => {
        if (res.state == "success") {
          this.$message({message: '服务生成成功~',type: 'success'});
          this.scShow = !this.scShow;
          this.pageActiveService();
        }
      });
    },
    handleClickScOrfb(data) {
      if (data == "sc") {
        this.scShow = !this.scShow;
        return;
      }
      this.$confirm(
        data == "sc" ? "您确定要生成服务吗?" : "您确定要发布服务吗?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$post(
            data == "sc"
              ? this.API.generateActiveService
              : this.API.publishActiveService,
            {
              xmbh: this.xmbh
            }
          ).then(res => {
            if (res.state == "success") {
              this.$message({message:data == "sc" ? "服务生成成功" : "发布成功",type: 'success'});
              this.pageActiveService();
            }
          });
        })
        .catch(() => {});
    },
    handleSizeChange(data) {
      this.pageSize = data;
      this.currentPage = 1;
      this.pageActiveService();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.pageActiveService();
    },
    handleCheckDetail(data) {
      let { href } = this.$router.resolve({
        name: "ZdsfwDetail",
        query: {
          wid: data.wid
        }
      });
      window.open(href, "_blank");
    },

    // 获取服务内容
    listFwnrByCp() {
      this.$get(this.API.listFwnrByCp, {
        cpbh: this.cpbh,
        cpmc: this.cpmc
      }).then(res => {
        if (res.state == "success") {
          if (!res.data) {
            this.fwnrList = [];
          } else {
            this.fwnrList = res.data;
          }
        }
      });
    },
    pageActiveService() {
      this.$get(this.API.pageActiveService, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        xmbh: this.xmbh,
        cpbh: this.filterData.cpbh,
        cpmc: this.filterData.cpmc,
        fwnr: this.filterData.fwnr,
        zt: this.filterData.fwzt,
        lb: this.filterData.lb,
        xmzt: this.filterData.xmzt,
        jhksrq: this.filterData.jhksrq,
        jhjsrq: this.filterData.jhjsrq,
        sfgq: this.filterData.sfgq,
        fxdj:this.filterData.fxdj,
        keyword: this.filterData.keyword
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows) {
            this.tableData = [];
          } else {
            this.tableData = res.data.rows;
          }
          this.total = res.data.records;
        }
      });
    },
    getFirstDay() {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      return year + "-" + month + "-" + "01";
    }
  },
  mounted() {
    // if (window.location.hash.includes("h=1")) {
    //   sessionStorage.setItem("Detailpannel", window.location.hash);
    // } else {
    //   sessionStorage.removeItem("Detailpannel");
    // }
    if (!sessionStorage.userInfo) {
      getLoginUser().then(res => {
        if (res.status == 200) {
          if (res.data.state == "success") {
            this.groupTag = res.data.data.userGroupTag;
            this.username = res.data.data.nickName;
            this.isJzuser = res.data.data.unitType;
          } else {
            this.$alert(data.msg + "获取用户失败,请联系管理员 ", "提示", {
              confirmButtonText: "确定",
              type: error,
              callback: action => {
                window.location.href =
                  window.baseurl +
                  "sys/logout.do?from=" +
                  encodeURIComponent("http://careful.wisedu.com/#/");
              }
            });
          }
        }
      });
    } else {
      this.groupTag = JSON.parse(sessionStorage.userInfo).userGroupTag;
      this.username = sessionStorage.username;
      this.isJzuser = sessionStorage.isJZuser;
    }
    if (this.groupTag.includes("ZDSFWGLY")) {
      this.filterData.date = [];
    }
    getProject({ xmbh: this.xmbh }).then(({ data }) => {
      if (data.state == "success") {
        this.xmData = data.data;
      }
    });
    this.pageActiveService();
  },
  watch: {},
  props: {
    nxmbh: {
      type: String,
      default: ""
    },
    xmmc: {
      type: String,
      default: ""
    }
  },
  components: {
    tableLayout,
    tbfwDialog,
    editDialog,
    qrbhfwDialog,
    fwjhDialog,
    zdsfwFilter,
    scDialog,
    fxdjDialog
  }
};
</script>

<style lang="scss" scoped>
.myitem-zdsfw {
  padding: 10px 20px;
}
.pannel-cpmc:hover {
  text-decoration: underline !important;
}
.zdsfw-content {
  padding: 10px;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  overflow-y: auto;
}
</style>
