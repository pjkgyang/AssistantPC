<template>
    <div class="pannelPadding-10">
        <div class="pannelPaddingBg-10">
            <div>
                <el-input style="width:300px;" size="mini" placeholder="请输入工号/部门名称/一级部门名称/姓名/区域战队" @change="handleSearch"></el-input>
                <el-button @click="handleSearch" size="mini" type="primary">查询</el-button>
            </div><br>
            <div>
                <el-table :data="tableData" border style="width: 100%"  :max-height="tableHeight">
                    <el-table-column prop="xm" label="姓名" min-width="50"></el-table-column>
                    <el-table-column prop="bh" label="工号" min-width="50"></el-table-column>
                    <el-table-column prop="ssbm" label="所属部门" width="140"></el-table-column>
                    <el-table-column prop="ssyjbm" label="所属一级部门" width="140"></el-table-column>
                    <el-table-column prop="zt" label="状态" width="80"></el-table-column>
                    <el-table-column prop="rzrq" label="入职日期" width="110"></el-table-column>
                    <el-table-column prop="lzrq" label="离职日期" width="110"></el-table-column>
                    <el-table-column prop="sj" label="手机"  width="110" ></el-table-column>
                    <el-table-column prop="qyzd" label="区域战队"  width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zxmc" label="职系名称"  width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ygmc" label="用工名称"  width="100" ></el-table-column>
                    <el-table-column prop="xlmc" label="学历"  width="140" ></el-table-column>
                    <el-table-column prop="ygmc" label="用工名称"  width="110" ></el-table-column>
                    <el-table-column prop="byyx" label="毕业院校" min-width="180" show-overflow-tooltip></el-table-column>
                </el-table>
                <div text-right>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 70, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight:window.innerHeight - 160,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      total:0,
      keyword: ""
    };
  },
  methods: {
    //   搜索
    handleSearch() {
      this.currentPage = 1;
      this.pageStaff();
    },
    handleSizeChange(data){
        this.pageSize = data;
        this.currentPage = 1;
        this.pageStaff();
    },
    handleCurrentChange(data){
        this.currentPage = data;
        this.pageStaff();
    },
    pageStaff() {
      this.$get(this.API.pageStaff, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
        nljhwid: this.$route.query.nljhwid,
        type: this.$route.query.type
      }).then(res => {
        if (res.state == "success") {
          if(!res.data.rows){
              this.tableData = []
          }else{
             this.tableData = res.data.rows 
          }
          this.total = res.data.records
        }
      });
    }
  },
  mounted() {
    this.pageStaff();
  },
  components: {}
};
</script>

<style scoped>
</style>
