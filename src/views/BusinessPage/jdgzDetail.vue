<template>
  <div class="pd-10">
    <div class="dialog-jd">
      <h4 v-if="this.$route.query.lcbqr">进度确认 — {{this.$route.query.sfqr==0?'待确认里程碑详情':'已确认里程碑详情'}}</h4>
      <h4 v-else>{{this.$route.query.personType == 1?'实施 — ':'用户 — '}} {{this.$route.query.filterType==1?'催办': this.$route.query.filterType==2?'已超期': this.$route.query.filterType==7?'待确认任务数': this.$route.query.filterType==8?'已确认任务数': this.$route.query.filterType==0?'总数': this.$route.query.filterType==5?'个人任务总数':'未完成个人任务总数'}}
      </h4>
      <el-table :data="tableData" border style="width: 100%" :min-height="500" :max-height="tableHeight" v-if="!this.$route.query.lcbqr" key="ssyh-table">
        <el-table-column prop="xmbh" label="项目编号" width="140"></el-table-column>
        <el-table-column prop="xmmc" label="项目名称" min-width="340" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cpmc_display" label="产品名称" width="240" show-overflow-tooltip></el-table-column>
        <el-table-column prop="xmnr" label="项目内容" width="240" show-overflow-tooltip></el-table-column>
        <el-table-column prop="lcbms_display" label="里程碑" width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="rwmc_display" label="任务名称" width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="zt_display" label="状态" width="100"></el-table-column>
        <el-table-column prop="cjrxm" label="创建人" width="90"></el-table-column>
        <el-table-column prop="cjsj" label="创建人" width="160"></el-table-column>
        <el-table-column prop="ssrxm" label="责任人" width="90"></el-table-column>
      </el-table>

      <div v-if="this.$route.query.lcbqr == '1'">
        <div text-right class="mg-12">
          <el-button type="primary" size="mini" v-if="this.$route.query.sfqr == '0' &&　lcbShow" @click="handleLcbqr">里程碑确认</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" :min-height="500" :max-height="tableHeight" key="jdqr-table" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" 　v-if="this.$route.query.sfqr == '0' &&　lcbShow"></el-table-column>
          <el-table-column prop="xmbh" label="项目编号" width="140"></el-table-column>
          <el-table-column prop="xmmc" label="项目名称" min-width="300" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cpmc_display" label="产品名称" width="240" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lcbms_display" label="里程碑" min-width="300" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zt_display" label="状态" width="100"></el-table-column>
          <el-table-column prop="qrrxm" label="确认人" width="90"></el-table-column>
          <el-table-column prop="qrsj" label="确认时间" width="160"></el-table-column>
          <el-table-column label="是否确认" width="100">
            <template slot-scope="scope">
              <el-tag size="mini" :type="scope.row.sfqr == '1' ? 'success' : 'primary'" disable-transitions>
                {{scope.row.sfqr=='0'?'未确认':scope.row.sfqr==1?'已确认':'未知'}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <div text-right class="mg-12">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 35, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProject } from "@/api/xmkb.js";
import { confirmMilestone } from "@/api/task.js";
export default {
  data() {
    return {
      visible: this.show,
      tableHeight: window.innerHeight - 200,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tableData: [],
      selectMuiltple: [],
      lcbShow: false
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.$route.query.lcbqr) {
      this.pageProjectPanelMilestoneDetail();
      this.getProject();
    } else {
      this.pageHomePageTaskDetail();
    }
  },
  methods: {
    handleSelectionChange(val) {
      val.forEach(ele => {
        this.selectMuiltple.push(ele.lcbbh);
      });
    },
    handleLcbqr() {
      this.$confirm("您确定要确认任务完成吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          confirmMilestone({
            lcbbh: this.selectMuiltple.join(",")
          }).then(({ data }) => {
            if (data.state == "success") {
              this.$alert("确认成功", "提示", {confirmButtonText: "确定",
                callback: action => {
                 this.pageProjectPanelMilestoneDetail();
                }
              });
            }
          });
        })
        .catch(() => {});
    },
    handleSizeChange(data) {
      this.currentPage = 1;
      this.pageSize = data;
      if (this.$route.query.lcbqr) {
        this.pageProjectPanelMilestoneDetail();
      } else {
        this.pageHomePageTaskDetail();
      }
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      if (this.$route.query.lcbqr) {
        this.pageProjectPanelMilestoneDetail();
      } else {
        this.pageHomePageTaskDetail();
      }
    },
    pageProjectPanelMilestoneDetail() {
      this.$get(this.API.pageProjectPanelMilestoneDetail, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        xmbh: this.$route.query.xmbh,
        sfqr: this.$route.query.sfqr
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
    pageHomePageTaskDetail() {
      this.$get(this.API.pageHomePageTaskDetail, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        xmbh: this.$route.query.xmbh,
        isAll: this.$route.query.isAll,
        personType: this.$route.query.personType,
        filterType: this.$route.query.filterType
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

    getProject() {
      getProject({
        xmbh: this.$route.query.xmbh
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data.jfzrrxm == sessionStorage.username) {
            this.lcbShow = true;
          } else {
            this.lcbShow = false;
          }
        }
      });
    }
  },

  watch: {
    show(n, o) {
      this.visible = this.show;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.dialog-jd {
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  h4 {
    margin: 10px 0 !important;
    font-weight: 700;
  }
}
</style>
