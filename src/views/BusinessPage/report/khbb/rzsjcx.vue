<template>
  <div>
    <div>
      <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter" :placeholder="'请输入工号/姓名/导师/岗位'" :filterShow="filterShow"></filterComponent>
    </div>
    <div>
      <div text-right class="mg-12">
        <el-button type="primary" size="mini" @click="exportTable">导出</el-button>
      </div>
      <el-table :data="dataList" style="width: 100%" border :max-height="tableHeight">
        <el-table-column prop="bh" label="工号" width="100"></el-table-column>
        <el-table-column prop="xm" label="姓名" width="100"></el-table-column>
        <el-table-column prop="gczd" label="区域" width="120"></el-table-column>
        <el-table-column prop="gw" label="岗位" width="120"></el-table-column>
        <el-table-column prop="zgfx" label="主攻方向" width="120"></el-table-column>
        <el-table-column prop="ds" label="导师" width="100"></el-table-column>
        <el-table-column prop="rzsj" label="入职日期" width="120"></el-table-column>
        <el-table-column prop="zzsj" label="转正日期" width="120"></el-table-column>
        <!-- <el-table-column prop="zzts" label="转正天数" width="100"></el-table-column> -->
        <!-- <el-table-column prop="dxqk" label="带训情况" width="120"></el-table-column> -->
        <!-- <el-table-column prop="cjpxqk" label="参加培训情况" width="100"></el-table-column> -->
        <el-table-column prop="tgrzqk" label="通过认证情况" min-width="120"></el-table-column>
        <el-table-column prop="sm" label="距离转正要求" min-width="120"></el-table-column>
        <el-table-column prop="bz" label="备注" min-width="120"></el-table-column>
      </el-table>
      <div text-right>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import tableComponents from "@/components/reportTable/tableComponents.vue";
import filterComponent from "@/components/reportTable/filterComponent.vue";

export default {
  data() {
    return {
      dataList: [],
      archiveShow: false,
      tableHeight: window.innerHeight - 270,
      filterList: ["keyword", "qygc"],
      filterData: {
        keyword: "",
        gczd: "",
      },
      currentPage: 1,
      pageSize: 20,
      filterShow: true,
      total: 0
    };
  },
  methods: {
    exportTable() {
      window.open(
        window.baseurl +
          "training/exportXrzz.do?qygc=" +
          this.filterData.gczd +
          "&keyword=" +
          this.filterData.keyword
      );
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.pageXrzz();
    },
    handleSizeChange(data) {
      this.currentPage = 1;
      this.pageSize = data;
      this.pageXrzz();
    },
    handleChangeFilter(data) {
      this.filterData = data;
      this.currentPage = 1;
      this.pageXrzz();
    },

    // 任职等级分页列表
    pageXrzz() {
      this.$get(this.API.pageXrzz, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        qygc: this.filterData.gczd,
        keyword: this.filterData.keyword
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows) {
            this.dataList = [];
          } else {
            this.dataList = res.data.rows;
          }
          this.total = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    }
  },
  mounted() {
    this.pageXrzz();
  },
  activated() {},
  watch: {},
  components: {
    filterComponent,
    tableComponents
  }
};
</script>
<style scope>
.query-condition > div {
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  font-size: 13px;
}
.query-list {
  width: 95%;
}
.query-list span:hover {
  cursor: pointer;
}
.query-list span {
  display: inline-block;
  padding: 0px 5px;
  color: #637d8a;
  border-radius: 3px;
  margin: 5px 10px 0 0;
}
.bg-active {
  background: #1997d7;
  color: #fff !important;
}
</style>
