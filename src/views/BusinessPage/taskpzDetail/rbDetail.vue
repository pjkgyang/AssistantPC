<template>
    <div>
        <div class="rbpzDetail">
            <div>
                <div>
                    <rbTable :tableData="tableData" @handleCheckpzDetail="handleCheckpzDetail"></rbTable>
                </div>
                <div text-right>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 70, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <pzxqDialog :show.sync="show" :tableData="pzxqData" :rbshow="true"></pzxqDialog>
    </div>
</template>

<script>
import rbTable from "@/components/xmjdTable/rbList.vue";
import pzxqDialog from "@/components/dialog/pzdetail/pzxq-dialog.vue";
export default {
  data() {
    return {
      show: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tableData: [],
      pzxqData: []
    };
  },
  mounted() {
    this.pageProjectPanelWorkLogs();
  },
  methods: {
    handleSizeChange(data) {
      this.pageSize = data;
      this.currentPage = 1;
      this.pageProjectPanelWorkLogs();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.pageProjectPanelWorkLogs();
    },
    handleCheckpzDetail(data) {
      this.getLogCommentsForHomePageDetail(data);
      this.show = !this.show;
    },
    pageProjectPanelWorkLogs() {
      this.$get(this.API.pageProjectPanelWorkLogs, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        xmbh: this.$route.query.xmbh,
        isAll: !this.$route.query.isAll ? "" : this.$route.query.isAll,
        yf: !this.$route.query.yf ? "" : this.$route.query.yf,
        rywid: !this.$route.query.rywid ? "" : this.$route.query.rywid,
        sfbt: !this.$route.query.sfbt ? "" : this.$route.query.sfbt,
        sfglpz: !this.$route.query.sfglpz ? "" : this.$route.query.sfglpz
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows) {
            this.tableData = [];
          } else {
            this.tableData = res.data.rows;
          }
          this.total = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            type: "error",
            confirmButtonText: "确定"
          });
        }
      });
    },
    getLogCommentsForHomePageDetail(wid) {
      this.$get(this.API.getLogCommentsForHomePageDetail, {
        wid: wid,
        isAll: this.$route.query.isAll
      }).then(res => {
        if (res.state == "success") {
          if (!res.data) {
            this.pzxqData = [];
          } else {
            this.pzxqData = res.data;
          }
        } else {
          this.$alert(res.msg, "提示", {
            type: "error",
            confirmButtonText: "确定"
          });
        }
      });
    }
  },
  components: { rbTable, pzxqDialog }
};
</script>

<style lang="scss" scoped>
.rbpzDetail {
  padding: 15px;
  > div {
    background: #fff;
    padding: 10px;
    border-radius: 4px;
  }
}
</style>
