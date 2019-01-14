<template>
  <div class="pannelPadding-10">
    <div class="pannelPaddingBg-10">
      <tableLayout>
        <section slot="top">
          <el-input placeholder="请输入产品版本号" size="mini" @change="handleSearchEnter" style="width:300px"></el-input>
          <el-button type="primary" size="mini" @click="handleSearchEnter">查询</el-button>
        </section>
        <section slot="bottom" style="margin-top:30px">
          <el-button type="primary" size="mini" @click="handleXjjh">新建计划</el-button>
          <!-- <el-button type="primary" size="mini" @click="handlePLNrjh">批量纳入计划</el-button> -->
          <div style="margin:10px 0">
            <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column fixed="left" label="操作" width="220">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button type="text" size="mini" style="color:red !important" @click="handleDelect(scope.row)">删除</el-button>
                  <el-button v-if="scope.row.sfnr =='0'" type="text" size="mini" @click="handleNrjhOrTcjh(scope.row,'nrjh')">纳入计划</el-button>
                  <el-button v-if="scope.row.sfnr =='1' && scope.row.wtwid != questionData.wid" type="text" size="mini" style="color:red !important" @click="handleNrjhOrTcjh(scope.row,'tcjh')">剔除计划</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="cpmc" label="产品" min-width="180"></el-table-column>
              <el-table-column prop="wtfx" label="问题分析" min-width="200" show-overflow-tooltip></el-table-column>
              <el-table-column prop="jira" label="关联JIRA" min-width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="xybjh" label="下一步计划" min-width="200" show-overflow-tooltip></el-table-column>
              <el-table-column prop="jhwcsj" label="计划完成日期" width="150"></el-table-column>
              <el-table-column prop="zrrxm" label="责任人" width="110"></el-table-column>
              <el-table-column prop="jjbbh" label="解决版本号" width="110"></el-table-column>
              <el-table-column prop="fbsj" label="发版日期" width="150"></el-table-column>
              <el-table-column prop="cjsj" label="创建日期" width="155"></el-table-column>
              <el-table-column prop="cjrxm" label="创建人" width="110"></el-table-column>
              <el-table-column label="纳入计划问题数" width="130">
                <template slot-scope="scope">
                  <a href="javaScript:;;" @click="handleCehckwts(scope.row.wid)">{{scope.row.jhwtzs}}</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </section>
      </tableLayout>
      <div text-right>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <xjjh-dialog :show.sync="xjjhShow" :isEdit="isEdit" :questionData="wtData" @handleSavesuccess="handleSavesuccess"></xjjh-dialog>
    <cpfb-dialog :show.sync="cpfbShow"></cpfb-dialog>
  </div>
</template>

<script>
import tableLayout from "@/components/layout/tableLayout.vue";
import xjjhDialog from "@/components/dialog/wtfp/newPlan-cp.vue";
import cpfbDialog from "@/components/dialog/wtfp/cpfb-dialog.vue";
export default {
  data() {
    return {
      xjjhShow: false,
      cpfbShow: false,
      isEdit: false,
      tableData: [
        {
          cpmc: "产品",
          wtfx: "王小虎",
          xybjh: "上海市普陀区金沙江路 1518 弄",
          jhwcrq: "2018-08-08",
          zrrxm: "张三",
          jjbbh: "V1.0.3",
          fbrq: "2018-08-08",
          cjrq: "2018-08-08 12:00:00",
          cjrxm: "李四",
          nrjhwts: 11
        },
        {
          cpmc: "产品",
          wtfx: "王小虎",
          xybjh: "上海市普陀区金沙江路 1518 弄",
          jhwcrq: "2018-08-08",
          zrrxm: "张三",
          jjbbh: "V1.0.3",
          fbrq: "2018-08-08",
          cjrq: "2018-08-08 12:00:00",
          cjrxm: "李四",
          nrjhwts: 11
        }
      ],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      keyword: "",
      wtData: this.questionData
    };
  },
  props: {
    questionData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.pageProductPlan();
  },
  watch: {
    show(n, o) {
      if (n) {
        this.wtwid = this.questionData.wid;
        this.pageProductPlan();
      }
    }
  },
  methods: {
    // 跳转
    handleCehckwts(data) {
      let routeData = this.$router.resolve({
        path: "/report-list/questionlist.html",
        query: {
          jhwid: data,
          jhlx: "1"
        }
      });
      window.open(routeData.href, "_blank");
    },

    handleNrjhOrTcjh(params, param) {
      this.$confirm(
        param == "nrjh"
          ? "是否将此问题纳入计划?"
          : "确定要剔除 " + params.wtbt + " 问题的改进计划吗?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$post(
            param == "nrjh" ? this.API.addInPlan : this.API.removeFromPlan,
            {
              lx: 1,
              wtwid: this.questionData.wid,
              wid: params.wid
            }
          ).then(res => {
            if (res.state == "success") {
              this.$alert(param == "nrjh" ? "纳入成功" : "剔除成功", "提示", {
                confirmButtonText: "确定",
                type: "success"
              });
              this.pageProductPlan();
            } else {
              this.$alert(res.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    },
    // 编辑
    handleEdit(data) {
      this.isEdit = true;
      this.wtData = data;
      this.wtData.wtwid = this.questionData.wid;
      this.xjjhShow = !this.xjjhShow;
    },
    // 删除
    handleDelect(params) {
      this.$confirm("是否确定将此计划删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$post(this.API.deleteProductPlan, {
            wid: params.wid
          }).then(res => {
            if (res.state == "success") {
              this.$alert("删除成功", "提示", {
                confirmButtonText: "确定",
                type: "success"
              });
              this.pageProductPlan();
            } else {
              this.$alert(res.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    },
    // 新建成功
    handleSavesuccess() {
      this.pageProductPlan();
    },
    handleSizeChange(data) {
      this.pageSize = data;
      this.currentPage = 1;
      this.pageProductPlan();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.pageProductPlan();
    },
    handleSearchEnter() {
      this.currentPage = 1;
      this.pageProductPlan();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 新建计划
    handleXjjh() {
      this.isEdit = false;
      this.wtData = this.questionData;
      this.xjjhShow = !this.xjjhShow;
    },
    // 批量纳入计划
    handlePLNrjh() {
      this.$confirm("是否将此问题纳入计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    },
    // 发布
    handleRelease() {
      this.cpfbShow = !this.cpfbShow;
    },

    // 获取产品列表
    pageProductPlan() {
      this.$get(this.API.pageProductPlan, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        cpbh: this.questionData.cpbh,
        keyword: this.keyword,
        wtwid: this.questionData.wid
      })
        .then(res => {
          if (res.state == "success") {
            if (!!res.data.rows) {
              this.tableData = res.data.rows;
            } else {
              this.tableData = [];
            }
            this.total = res.data.records;
          } else {
            this.$alert(res.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        })
        .catch(error => {});
    }
  },
  components: { tableLayout, xjjhDialog, cpfbDialog }
};
</script>

<style scoped>
</style>
