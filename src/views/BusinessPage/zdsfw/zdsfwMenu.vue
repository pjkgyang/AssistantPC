<template>
  <div class="myitem-zdsfw">
    <tableLayout class="zdsfw-content" flex-column>
      <section slot="top" style="border-bottom:1px solid #EBEEF5" col=1>
        <zdsfwFilter :placeholder="'学校名称/项目名称/项目编号/合同编号'" @handleChangeFilter="handleChangeFilter"></zdsfwFilter>
      </section>
      <section slot="bottom" col=2>
        <section>
          <div flex spacebetween class="mb-12">
            <div>
              <!-- <el-button v-if="isJzuser == '0'" :disabled="!multipleSelection.length" type="primary" size="mini" @click="handleClick('tbfw')">提报服务</el-button> -->
              <el-button v-if="isJzuser == '1'":disabled="!multipleSelection.length" type="primary" size="mini" @click="handleClick('qrfw')">确认服务</el-button>
              <el-button v-if="isJzuser == '1'" :disabled="!multipleSelection.length" type="danger" size="mini" @click="handleClick('bhfw')">驳回服务</el-button>
            </div>
            <div>
              <el-button type="primary" size="mini" @click="handleClick('export')">导出</el-button>
            </div>
          </div>
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border
            @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="55"></el-table-column>
            <el-table-column fixed="left" label="操作" width="150">
              <template slot-scope="scope">
                <!-- 关闭 2，完成待确认 1  -->
                <el-button v-if="scope.row.zt != '1' && scope.row.zt != '2' && isJzuser == '0' && username == scope.row.zrrxm && scope.row.flag == '1'"
                  type="text" size="mini" @click="handleClick('tbfw',scope.row)">提报</el-button>
                <el-button v-if="scope.row.zt == '1' && isJzuser == '1'" type="text" size="mini" @click="handleClick('qrfw',scope.row)">确认</el-button>
                <el-button v-if="scope.row.zt == '1' && (userGroupTag.includes('ZDSFWGLY') || scope.row.jffzrxm == username)"
                  type="text" size="mini" @click="handleClick('bhfw',scope.row)">驳回</el-button>

                <el-button type="text" size="mini" @click="handleCheckDetail(scope.row)">详情</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="yh" label="学校名称" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cpmc" label="产品" min-width="240" show-overflow-tooltip></el-table-column>
            <el-table-column prop="fwnr" label="服务内容" min-width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zrrxm" label="责任人" width="80"></el-table-column>
            <el-table-column label="项目服务状态" width="170">
              <template slot-scope="scope">
                <el-tag size="mini" :type="scope.row.zt=='0'?'primary':scope.row.zt=='1'?'success':'danger'">{{scope.row.zt=='0'?'计划中':scope.row.zt==1?'完成待确认':scope.row.zt==3?'已驳回':'关闭'}}{{scope.row.flag=='0'?'（已暂停）':''}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="jhksrq" label="计划开始日期" width="150"></el-table-column>
            <el-table-column prop="jhjsrq" label="计划结束日期" width="150"></el-table-column>
            <el-table-column prop="tbrxm" label="提报人" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tbsj" label="提报时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sfgq" label="是否过期" width="100">
              <template slot-scope="scope">
                <el-tag size="mini" :type="scope.row.sfgq=='0'?'primary':'danger'">{{scope.row.sfgq=='0'?'未过期':scope.row.sfgq=='1'?'过期':'超期完成'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column v-if="isJzuser == '0'" prop="xjgs" label="巡检工时(小时)" width="120"></el-table-column>
            <el-table-column v-if="isJzuser == '0'" prop="fxgs" label="风险工时(小时)" width="120"></el-table-column>
            <el-table-column v-if="isJzuser == '0'" prop="wtgs" label="问题工时(小时)" width="120"></el-table-column>
            <el-table-column prop="sjjsrq" label="实际结束日期" width="150"></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="htbh" label="合同编号" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" min-width="280" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmlb" label="项目类别" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ztztmc" label="项目整体状态" width="110"></el-table-column>
            <el-table-column prop="sfzt" label="合同性质" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sfgx" label="是否购销" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dkl" label="到款率" min-width="80" show-overflow-tooltip></el-table-column>

            <el-table-column prop="qrrxm" label="确认人" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="qrsj" label="确认时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="pf" label="评分" width="80"></el-table-column>
            

            
            
            <el-table-column label="风险等级(解决情况)" width="150">
              <template slot-scope="scope">
                <a href="javaScript:;;" v-if="scope.row.fxdj != '-'" @click="handleCheck(scope.row)">
                  <el-tag size="mini" :class="{'zdsfw-fxdj-s1':scope.row.fxdj==1,'zdsfw-fxdj-s2':scope.row.fxdj==2,'zdsfw-fxdj-s3':scope.row.fxdj==3}">{{scope.row.fxdj==1?'S1':scope.row.fxdj==2?'S2':'S3'}}</el-tag>&nbsp;
                </a>
                <span v-if="scope.row.fxdj == '-'">{{scope.row.fxdj}}</span>
                <span style="font-size:12px">{{scope.row.fxsfcl==0?'(待处理)':scope.row.fxsfcl==1?'(已处理)':''}}</span>
              </template>
            </el-table-column>
            <el-table-column label="问题总数" width="150">
              <template slot-scope="scope">
                <a href="javaScript:;;" v-if="scope.row.wtzs != '0' && scope.row.wtzs != '-'" @click="handleCheckWt(scope.row)">
                  {{scope.row.wtzs}}
                </a>
                <span v-if="scope.row.wtzs == '-' || scope.row.wtzs == '0' || !scope.row.wtzs">- -</span>
                <span v-if="scope.row.wtzs != '0' && scope.row.wtzs != '-'" style="font-size:12px">({{scope.row.wtsfcl}})</span>
              </template>
            </el-table-column>
            
          </el-table>
        </section>
        <div text-right style="margin-top:2px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </section>
    </tableLayout>

    <tbfwDialog :show.sync='tbfwShow' @handleCommitTB="handleCommitTB" :wids="wids" :isMultiple="isMultiple" :rowData="rowData"></tbfwDialog>
    <qrbhfwDialog :show.sync='qrbhfwShow' :title="title" @handleCommitQR="handleCommitQR"></qrbhfwDialog>
    <fxdjDialog :show.sync='fxdjShow' :rowData="rowData" @handleSave="handleSave"></fxdjDialog>
    <wtDialog :show.sync='wtShow' :rowData="rowData" @handleSave="handleSave"></wtDialog>
  </div>
</template>

<script>
  import zdsfwFilter from "@/components/zdsfw/zdsfwFilter.vue";
  import tableLayout from "@/components/layout/tableLayout.vue";
  import {  getProjectCatalog } from "@/api/xmfz.js";
  import tbfwDialog from "@/components/dialog/zdsfw/tbfw-dialog.vue";
  import qrbhfwDialog from "@/components/dialog/zdsfw/qrbhfw-dialog.vue";
  import fxdjDialog from "@/components/dialog/zdsfw/fxdjcommit.vue";
  import wtDialog from "@/components/dialog/zdsfw/wtcommit.vue";
  import {
    getLastMonthDay
  } from "@/utils/util.js";

  export default {
    data() {
      return {
        wtShow: false,
        tbfwShow: false,
        qrbhfwShow: false,
        fxdjShow: false,
        title: "",
        currentPage: 1,
        pageSize: 15,
        total: 0,
        tableData: [],
        multipleSelection: [],
        widsArr: [],
        wids: "",
        cpobj: {},
        rowsData: "",
        filterData: {
          keyword: "",
          fwnr: "",
          cpbh: "",
          cpmc: "",
          fwzt: "",
          lb: "",
          xmzt: "",
          jhksrqmin: "",
          jhksrqmax: "",
          jhjsrqmin:"",
          jhjsrqmax:"",
          sfgq: "",
          fxdj: "",
          wtzt: "",
          fxzt: "",
          ismine: "1"
        },
        isJzuser: "",
        userGroupTag: "",
        username: "",

        rowData: {},
        isMultiple: false
      };
    },
    methods: {
      // 点击风险等级列
      handleCheck(data) {
        this.rowData = data;
        this.fxdjShow = !this.fxdjShow;
      },
      //添加问题
      handleCheckWt(data) {
        this.rowData = data;
        this.wtShow = !this.wtShow;
      },
      // 风险等级列保存
      handleSave(data) {
        this.$post(this.API.submitActiveServiceRisk, {
          wid: this.rowData.wid,
          cljg: data.cljg,
          sfcl: data.sfcl,
          fjData: data.fileList
        }).then(res => {
          if (res.state == "success") {
            this.$message({
              message: "保存成功~",
              type: "success"
            });
            this.fxdjShow = false;
            this.pageActiveService();
          } else {
            this.$alert(res.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      },
      // 筛选条件
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
          xjgs: data.xjgs,
          fjData: data.fileList,
          sjjsrq:data.sjjsrq
        }).then(res => {
          if (res.state == "success") {
            this.$message({
              message: "提报成功~",
              type: "success"
            });
            this.tbfwShow = false;
            this.pageActiveService();
          } else {
            this.$alert(res.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      },
      //驳回,确认
      handleCommitQR(data) {
        let obj = {
          wids: this.wids,
          sm: data.sm
        };
        if (this.title == "确认服务") {
          obj["pf"] = !data.pf ? "" : data.pf;
        }
        this.$post(
          this.title == "确认服务" ?
          this.API.confirmActiveService :
          this.API.rejectActiveService,
          obj
        ).then(res => {
          if (res.state == "success") {
            this.$message({
              message: this.title == "确认服务~" ? "确认成功~" : "驳回成功~",
              type: "success"
            });
            this.qrbhfwShow = false;
            this.pageActiveService();
          } else {
            this.$alert(res.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      },
      //复选
      handleSelectionChange(val) {
        this.widsArr = [];
        this.multipleSelection = val;
        if (val.length == 1) {
          this.isMultiple = true;
        } else {
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
            this.rowData = !params ? this.multipleSelection[0] : params;
            if (params) {
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
                    this.$message({
                      message: "删除成功~",
                      type: "success"
                    });
                    this.pageActiveService();
                  }
                });
              })
              .catch(() => {});
            break;
          case "export":
                let jhksrqmin = !this.filterData.jhksrqmin?'':this.filterData.jhksrqmin,
                jhksrqmax = !this.filterData.jhksrqmax?'':this.filterData.jhksrqmax,
                jhjsrqmin = !this.filterData.jhjsrqmin?'':this.filterData.jhjsrqmin,
                jhjsrqmax = !this.filterData.jhjsrqmax?'':this.filterData.jhjsrqmax; 
            window.open(
              window.baseurl +
              "activeservice/exportActiveService.do?cpbh=" +
              this.filterData.cpbh +
              "&cpmc=" +
              this.filterData.cpmc +
              "&fwnr=" +
              this.filterData.fwnr +
              "&zt=" +
              this.filterData.fwzt +
              "&xmzt=" +
              this.filterData.xmzt +
              "&jhksrqmin=" +
              jhksrqmin +
              "&jhksrqmax=" +
              jhksrqmax +
              "&jhjsrqmin=" +
              jhjsrqmin +
              "&jhjsrqmax=" +
              jhjsrqmax +
              "&sfgq=" +
              this.filterData.sfgq +
              "&keyword=" +
              this.filterData.keyword +
              "&lb=" +
              this.filterData.lb +
              "&sffb=1" +
              "&fxdj=" +
              this.filterData.fxdj +
              "&wtzt=" +
              this.filterData.wtzt +
              "&fxzt=" +
              this.filterData.fxzt +
              "&ismine=" +
              this.filterData.ismine
            );
            break;
          case "sc": //生成
            this.$confirm("您确定要生成服务吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {})
              .catch(() => {});
            break;
          default:
            break;
        }
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
        let {
          href
        } = this.$router.resolve({
          name: "ZdsfwDetail",
          query: {
            wid: data.wid
          }
        });
        window.open(href, "_blank");
      },
      // 获取产品
      listXmZdsfwCp() {
        this.$get(this.API.listXmZdsfwCp, {
          xmbh: ""
        }).then(res => {
          if (res.state == "success") {
            if (!res.data) {
              this.cpList = [];
            } else {
              this.cpList = res.data;
            }
          }
        });
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
          cpbh: this.filterData.cpbh,
          cpmc: this.filterData.cpmc,
          fwnr: this.filterData.fwnr,
          zt: this.filterData.fwzt,
          lb: this.filterData.lb,
          xmzt: this.filterData.xmzt,
          jhksrqmin: this.filterData.jhksrqmin,
          jhksrqmax: this.filterData.jhksrqmax,
          jhjsrqmin:this.filterData.jhjsrqmin,
          jhjsrqmax: this.filterData.jhjsrqmax,
          sfgq: this.filterData.sfgq,
          keyword: this.filterData.keyword,
          sffb: 1,
          fxdj: this.filterData.fxdj,
          wtzt: this.filterData.wtzt,
          fxzt: this.filterData.fxzt,
          ismine: this.filterData.ismine,
        }).then(res => {
          if (res.state == "success") {
            this.tableData = res.data.rows;
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
      this.listXmZdsfwCp();
      this.pageActiveService();
      this.isJzuser = sessionStorage.isJZuser;
      this.userGroupTag = JSON.parse(sessionStorage.userInfo).userGroupTag;
      this.username = JSON.parse(sessionStorage.userInfo).nickName;
      // uid 人员编号
    },
    props: {},
    components: {
      tableLayout,
      tbfwDialog,
      qrbhfwDialog,
      zdsfwFilter,
      fxdjDialog,
      wtDialog
    }
  };
</script>

<style lang="scss" scoped>
  .myitem-zdsfw {
    // height: calc(100vh - 110px);
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
