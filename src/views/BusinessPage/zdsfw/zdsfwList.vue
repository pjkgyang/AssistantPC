<template>
  <div style="padding:10px 20px">
    <div class="zdsfw-xmlist pannelPaddingBg-10">
      <filterCondition :filterList="filterList" @handleChangeFilter="handleChangeFilter" :placeholder="'学校名称/项目名称/项目编号/合同编号'"></filterCondition>
      <div>
        <zdsfwTable :tableData="tableData" @handleRestar="handleRestar"></zdsfwTable>
      </div>
      <div text-right>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import filterCondition from "@/components/reportTable/filterComponent.vue";
import zdsfwTable from "@/components/zdsfw/zdsfwTable.vue";
export default {
  data() {
    return {
      filterList: ["keyword", "zdsfwzt"],
      tableData: [],
      pageSize: 18,
      currentPage: 1,
      total: 0,
      filterData: {
        keyword: "",
        zdsfwzt: ""
      }
    };
  },
  methods: {

    handleRestar(params,index){
      
      this.$set(this.tableData[index],'flag',params);
    },   

    handleCurrentChange(data) {
      this.currentPage = data;
      this.getList();
    },
    handleSizeChange(data) {
      this.pageSize = data;
      this.currentPage = 1;
      this.getList();
    },
    handleChangeFilter(data) {
      this.filterData = data;
      this.currentPage = 1;
      this.getList();
    },
    getList() {
      this.$get(this.API.pageActiveServiceProject, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        zt: this.filterData.zdsfwzt,
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
    }
  },
  mounted() {
    this.getList();
  },
  components: { filterCondition, zdsfwTable }
};
</script>

<style lang="scss" scoped>
.zdsfw-xmlist {
  .query-list span {
    margin: 0 10px 0 0;
  }
}
</style>

