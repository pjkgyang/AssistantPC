<template>
  <div>
    <el-dialog
      title="选择需求"
      width="1000px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="dialog-xqqr">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="bt" label="标题" min-width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleChooseDemand(scope.row)"
              >{{scope.row.bt}}</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="xqbh" label="需求编号" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tcrxm" label="发布人" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tcsj" label="发布时间" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tcls" label="提出人" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cpmc" label="产品" width="150"></el-table-column>
        </el-table>
        <el-pagination
          v-if="!!tableData.length"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="records"
        ></el-pagination>

        <section class="pj-btn-group">
          <el-button size="small" @click="visible = false">取消</el-button>
        </section>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show,
      tableData: [],
      currentPage: 1,
      pageSize: 15,
      records: 0
    };
  },
  methods: {
    handleChooseDemand(data) {
      this.$emit("handleChooseDemand", data);
      this.visible = false;
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.queryPageDemands();
    },
    queryPageDemands() {
      this.$get(this.API.queryPageDemands, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        xqxglx: "",
        xqlx: "",
        qygc: "",
        cpbh: "",
        xmbh: this.xmbh,
        keyword: ""
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data.rows) {
            this.tableData = res.data.rows;
          } else {
            this.tableData = [];
          }
          this.records = res.data.records;
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    xmbh: {
      type: String,
      default: ""
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!!n) {
        this.queryPageDemands();
      } else {
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.dialog-xqqr {
  padding: 8px 10px;
}

.dialog-xqqr section:nth-of-type(2) {
  margin: 10px 0;
}

.pj-title {
  font-weight: 700;
  width: 14%;
}

.pj-content {
  width: 86%;
}

.pj-btn-group {
  text-align: right;
  padding: 10px 0;
}
</style>
