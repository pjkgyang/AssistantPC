<template>
  <div>
    <div>
      <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter" :placeholder="'请输入姓名/工号'" :filterShow="filterShow"></filterComponent>
    </div>
    <div>
        <div text-right class="mg-12">
             <el-button type="primary" size="mini" @click="exportTable">导出</el-button>
        </div>
        <el-table :data="dataList" style="width: 100%" border :max-height="tableHeight">
          <el-table-column prop="gh" label="工号" ></el-table-column>
          <el-table-column prop="xm" label="姓名" ></el-table-column>
          <el-table-column prop="cpx" label="产品"></el-table-column>
          <el-table-column prop="rzdj" label="任职等级"></el-table-column>
          <el-table-column prop="rzrq" label="任职日期"></el-table-column>
        </el-table> 
       <div text-right>
            <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 30, 50, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
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
      tableHeight:window.innerHeight - 350,
      filterList: ["keyword", "cpx", "rzdj"],
      filterData: {
        keyword: "",
        cpx: "",
        rzdj: ""
      },
      currentPage: 1,
      pageSize: 20,
      filterShow: true,
      total:0
    };
  },
  methods: {
    exportTable() {
      window.open(
        window.baseurl +
          "personnel/exportPositionLevel.do?rzdj=" +
          this.filterData.rzdj +
          "&cpx=" +
          this.filterData.cpx +
          "&keyword=" +
          this.filterData.keyword
      );
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.pagePositionLevel();
    },
    handleSizeChange(data){
      this.currentPage = 1;
      this.pageSize = data;
      this.pagePositionLevel();
    },
    handleChangeFilter(data) {
      this.filterData = data;
      this.currentPage = 1;
      this.pagePositionLevel();
    },

    // 任职等级分页列表
    pagePositionLevel() {
      this.$get(this.API.pagePositionLevel, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        rzdj : this.filterData.rzdj ,
        cpx: this.filterData.cpx,
        keyword: this.filterData.keyword
      }).then(res => {
        if (res.state == "success") {
          if(!res.data.rows){
             this.dataList = [];
          }else{
             this.dataList = res.data.rows;
          }
          this.total = res.data.records
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },

  },
  mounted() {
      this.pagePositionLevel();
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
